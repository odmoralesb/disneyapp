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
            const usuario = (await RepositoryUser.save(body)).toJSON();

            const { id, clave, ...response } = usuario;

            return {
                status: 200,
                messages: [],
                payload: { usuario: response }
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
            body.nombreusuario
        );

        if (!!!entityUser) {
            return { status: 409, errors: ["Acceso Denegado"] };
        }

        const u = entityUser.toJSON<IUser>();

        const { id, clave, createdAt, updatedAt, rol_id, ...usuario } = (
            await RepositoryUser.getUser(u.id || 0)
        )?.toJSON();

        const validatePassCrypt = bcryptjs.compareSync(body.clave, clave);

        if (!validatePassCrypt) {
            return { status: 409, errors: ["Acceso Denegado"] };
        }

        if (usuario.superusuario) {
            usuario.rol.nombre = "SUPERADMIN";
        }

        const token = await generateJWT({
            id: u.id,
            rol: usuario?.rol?.nombre
        });

        return {
            status: 200,
            payload: { token, usuario }
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
                const { id, rol } = res as IToken;

                if (rol === "ADMIN-DB") {
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

                const entityUser = await RepositoryUser.getUser(id);

                if (!entityUser) {
                    return {
                        status: 500,
                        payload: { token: false, expirated: false },
                        errors: ["Token invalido"]
                    };
                }

                const { clave, createdAt, updatedAt, rol_id, ...user } =
                    entityUser.toJSON<IUser>();

                delete user.id;

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

    if (await RepositoryUser.existsUser(user.nombreusuario))
        errors.push(`Este usuario ya esta registrado`);

    return errors;
};
