import dotenv from "dotenv";
import { Request } from "express";
import bcryptjs from "bcryptjs";
import jwt, { VerifyErrors } from "jsonwebtoken";

import { IResponse, IUser, IToken } from "../models/model.interfaces";

import * as RepositoryUser from "../repositories/repository.user";

import { generateJWT } from "../helpers/jwt";

export const registerUser = async (req: Request): Promise<IResponse> => {
    try {
        const { body } = req;
        const errors = [...(await validateUser({ ...body }))];
        if (errors.length == 0) {
            const user = await RepositoryUser.save(body);
            return {
                status: 200,
                messages: [],
                payload: { user }
            };
        } else {
            return { status: 409, errors };
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            errors: [
                "Ocurrio un error interno en el servidor. Hable con el administrador"
            ]
        };
    }
};

export const login = async (req: Request): Promise<IResponse> => {
    try {
        dotenv.config();

        const { body } = req;

        const entityUser = await RepositoryUser.getUserByUsername(
            body.username
        );

        if (!!!entityUser) {
            return { status: 409, errors: ["Acceso Denegado"] };
        }

        const u = entityUser.toJSON<IUser>();

        const user = await RepositoryUser.getUser(u.id || 0);

        const validatePassCrypt = bcryptjs.compareSync(
            body.password,
            user.password || ""
        );

        if (!validatePassCrypt) {
            return { status: 409, errors: ["Acceso Denegado"] };
        }

        if (user.is_superuser) {
            user.role.name = "SUPERADMIN";
        }

        const token = await generateJWT({
            id: u.id,
            role: user?.role?.name
        });

        return {
            status: 200,
            payload: { token, user }
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            errors: [
                "Ocurrio un error interno en el servidor. Hable con el administrador"
            ]
        };
    }
};

export const signin = async (req: Request): Promise<IResponse> => {
    try {
        dotenv.config();
        const { body } = req;
        const SECRETORPRIVATEKEY = process.env.SECRETORPRIVATEKEY || "";

        return await new Promise((resolve, reject) => {
            jwt.verify(
                body.token,
                SECRETORPRIVATEKEY,
                (e: VerifyErrors | null, decoded: Object | undefined) => {
                    if (e) {
                        reject(e);
                    } else {
                        resolve(decoded);
                    }
                }
            );
        })
            .then(async (res) => {
                const { id, role } = res as IToken;

                if (role === "ADMIN-DB") {
                    return {
                        status: 200,
                        payload: { token: false, expirated: false }
                    };
                }

                if (!id) {
                    return {
                        status: 500,
                        payload: { token: false, expirated: false },
                        errors: ["Token invalido"]
                    };
                }

                const user = await RepositoryUser.getUser(id);

                if (!user.id) {
                    return {
                        status: 500,
                        payload: { token: false, expirated: false },
                        errors: ["Usuario no encontrado"]
                    };
                }

                return {
                    status: 200,
                    payload: { token: body.token, user }
                };
            })
            .catch((err) => {
                console.log(err.name);
                if (err.name === "TokenExpiredError") {
                    return {
                        status: 200,
                        payload: { token: false, expirated: true },
                        errors: ["Token Expirado"]
                    };
                } else {
                    throw new Error("Token invalido");
                }
            });
    } catch (e) {
        console.log(e);
        const error = e as Error;
        return {
            status: 500,
            payload: { token: false, expirated: false },
            errors: [error.message]
        };
    }
};

// local validations

const validateUser = async (user: IUser): Promise<string[]> => {
    const errors: string[] = [];

    if (await RepositoryUser.existsUser(user.username))
        errors.push(`Este usuario ya esta registrado`);

    return errors;
};
