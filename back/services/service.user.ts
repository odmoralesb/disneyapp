//libraries
import { Request } from "express";
import { Op } from "sequelize";

// models
import { IResponse, IUser } from "../models/model.interfaces";

// repositories
import * as RepositoryUser from "../repositories/repository.user";

// services
import * as ServiceRole from "./service.role";

// helpers

export const registerAdminSU = async (req: Request): Promise<IResponse> => {
    try {
        const { body } = req;

        const errors = [];

        errors.push(...(await validateUserSU({ ...body })));

        const entityUser = await RepositoryUser.getSuperUser();
        const userjs = entityUser?.toJSON();

        if (userjs && userjs.username !== body.username) {
            errors.push(...(await validateUser({ ...body })));
        }

        if (errors.length > 0) {
            return { status: 409, errors };
        }

        let user;

        if (entityUser) {
            user = (await RepositoryUser.update(entityUser, body)).toJSON();
        } else {
            user = (await RepositoryUser.save(body)).toJSON();
        }

        const { id, clave, ...response } = user;

        return {
            status: 200,
            messages: [],
            payload: { user: response }
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

export const getUser = async (
    username: string,
    role_id: number
): Promise<IResponse> => {
    try {
        const entityUser = await RepositoryUser.getUserBySpecification({
            [Op.and]: [
                { nombreusuario: username, rol_id: role_id },
                {
                    [Op.not]: {
                        superusuario: 1
                    }
                }
            ]
        });

        if (entityUser) {
            const { id, clave, rol_id, ...usuario } = entityUser.toJSON();
            return {
                status: 200,
                payload: { usuario }
            };
        } else {
            return { status: 409, errors: ["Usuario no registrado"] };
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

export const updateUser = async (
    username: string,
    req: Request,
    roleid: number = 0
): Promise<IResponse> => {
    try {
        const errors = [];

        const { body } = req;

        const specification =
            roleid === 0 ? { username } : { username, role_id: roleid };

        const entityUser = await RepositoryUser.getUserBySpecification(
            specification
        );

        if (!entityUser) {
            errors.push("Usuario no registrado");
        }

        if (errors.length > 0) {
            return { status: 409, errors };
        }

        if (username !== body.username) {
            errors.push(...(await validateUser({ ...body })));
        }

        if (errors.length > 0) {
            return { status: 409, errors };
        }

        const { id, password, role_id, ...user } =
            entityUser &&
            (await RepositoryUser.update(entityUser, body)).toJSON();

        return {
            status: 200,
            messages: [],
            payload: { user }
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

export const updateDoctorAdmin = async (req: Request): Promise<IResponse> => {
    try {
        const errors = [];

        const { body } = req;

        const roleDoctorId = await ServiceRole.getRole("DOCTOR");

        const specification = {
            username: body.username,
            role_id: roleDoctorId
        };

        const entityUser = await RepositoryUser.getUserBySpecification(
            specification
        );

        if (!entityUser) {
            errors.push("Doctor no registrado");
        }

        if (errors.length > 0) {
            return { status: 409, errors };
        }

        const { id, password, role_id, ...user } =
            entityUser &&
            (await RepositoryUser.update(entityUser, body)).toJSON();

        return {
            status: 200,
            payload: { user }
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

export const deleteUser = async (
    username: string,
    roleid: number = 0
): Promise<IResponse> => {
    try {
        const errors = [];

        const specification =
            roleid === 0 ? { username } : { username, role_id: roleid };

        const entityUser = await RepositoryUser.getUserBySpecification(
            specification
        );

        if (!entityUser) {
            errors.push("Usuario no registrado");
        }

        if (errors.length > 0) {
            return { status: 409, errors };
        }

        const { id, password, role_id, ...user } =
            entityUser && (await RepositoryUser.remove(entityUser))?.toJSON();

        return {
            status: 200,
            payload: { user }
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

// local validations

const validateUserSU = async (user: IUser): Promise<string[]> => {
    const errors: string[] = [];

    if (RepositoryUser.existsSU(user.nombreusuario))
        errors.push(`No se puede usar este nombre de usuario`);

    return errors;
};

const validateUser = async (user: IUser): Promise<string[]> => {
    const errors: string[] = [];

    if (await RepositoryUser.existsUser(user.nombreusuario))
        errors.push(`Este usuario ya esta registrado`);

    return errors;
};
