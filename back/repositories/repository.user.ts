import { Identifier, Model, Op } from "sequelize";
import bcryptjs from "bcryptjs";

import { Role, User } from "../models/entities";
import { IUser } from "../models/model.interfaces";

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

export const existsSU = (username: string) => {
    const DB_USERNAME = process.env.DB_USERNAME || "";
    return DB_USERNAME === username;
};

export const getSuperUser = async () => {
    const u = await User.findOne({
        where: { superusuario: true }
    });
    return u;
};

export const getUser = async (id: Identifier) => {
    const u = await User.findByPk(id, { include: { model: Role, as: "rol" } });
    return u;
};

export const getUserBySpecification = async (specifications = {}) => {
    return await User.findOne({ where: specifications });
};

export const save = async (data: IUser) => {
    if (data.clave) {
        const salt = bcryptjs.genSaltSync();
        data.clave = bcryptjs.hashSync(data.clave, salt);
    }
    const user = await User.create({ ...data }, { isNewRecord: true });
    return user;
};

export const update = async (entity: Model, data: IUser) => {
    if (data.clave) {
        const salt = bcryptjs.genSaltSync();
        data.clave = bcryptjs.hashSync(data.clave, salt);
    }
    const user = await entity.update({ ...data });
    return user;
};

export const remove = async (entity: Model) => {
    const { id } = entity.toJSON();
    const user = await User.findByPk(id);
    await user?.destroy();
    return user;
};

export const resetpass = async (entity: Model, password: string) => {
    const salt = bcryptjs.genSaltSync();
    const passcrypt = bcryptjs.hashSync(password, salt);
    const u = await entity.update({ password: passcrypt });
    return u != null;
};

export const getUserByUsername = async (username: string) => {
    const u = await User.findOne({
        where: { nombreusuario: username }
    });
    return u;
};
