import { Identifier, Model, Op } from "sequelize";
import bcryptjs from "bcryptjs";

import { Role, User } from "../models/entities";

import {
    Adapter as AdapterUser,
    IUserModelResponse
} from "./../models/entities/entity.user";

import { IUser } from "../models/model.interfaces";

export const getUser = async (id: Identifier) => {
    const u = (
        await User.findByPk(id, { include: { model: Role, as: "rol" } })
    )?.toJSON<IUserModelResponse>();
    return {
        id: u?.id,
        username: u?.nombreusuario,
        firstname: u?.nombres,
        lastname: u?.apellidos,
        is_superuser: u?.superusuario,
        password: u?.clave,
        role: {
            name: u?.rol.nombre
        }
    };
};

export const save = async (data: IUser) => {
    if (data.password) {
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(data.password, salt);
    }
    const user = (
        await User.create({ ...AdapterUser(data) }, { isNewRecord: true })
    ).toJSON<IUserModelResponse>();
    return {
        id: user.id,
        username: user.nombreusuario,
        firstname: user.nombres,
        lastname: user.apellidos
    };
};

export const existsUser = async (username: string) => {
    const u = await User.findOne({
        where: { nombreusuario: username }
    });
    return u != null;
};

export const existsUsername = async (username: string) => {
    const u = await User.findOne({
        where: { nombreusuario: username }
    });
    return u != null;
};

export const getUserByUsername = async (username: string) => {
    const u = await User.findOne({
        where: { nombreusuario: username }
    });
    return u;
};
