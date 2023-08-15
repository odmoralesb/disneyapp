import { Identifier, Model, Op } from "sequelize";
import bcryptjs from "bcryptjs";

import { Role, User } from "../models/entities";
import { IUser } from "../models/model.interfaces";

import * as RepositoryRole from "./repository.role";

export const existsEmail = async (email: string) => {
    const u = await User.findOne({
        where: { email }
    });
    return u != null;
};

export const existsUser = async (username: string) => {
    const u = await User.findOne({
        where: { username }
    });
    return u != null;
};

export const existsDoctor = async (username: string) => {
    const role_id = (await RepositoryRole.get({ name: "DOCTOR" }))?.toJSON().id;
    const d = await User.findOne({
        where: { username, role_id }
    });
    return d != null;
};

export const existsUsername = async (username: string) => {
    const u = await User.findOne({
        where: { username }
    });
    return u != null;
};

export const existsSU = (username: string) => {
    const DB_USERNAME = process.env.DB_USERNAME || "";
    return DB_USERNAME === username;
};

export const getSuperUser = async () => {
    const u = await User.findOne({
        where: { is_superuser: true }
    });
    return u;
};

export const getUser = async (id: Identifier) => {
    const u = await User.findByPk(id, { include: { model: Role } });
    return u;
};

export const getUsersBySpecification = async (
    specifications = {},
    page: number,
    size: number,
    term: string = ""
) => {
    let filter = {};

    if (term !== "") {
        filter = {
            [Op.or]: [
                {
                    username: {
                        [Op.like]: `%${term}%`
                    }
                },
                {
                    firstname: {
                        [Op.like]: `%${term}%`
                    }
                },
                {
                    lastname: {
                        [Op.like]: `%${term}%`
                    }
                }
            ]
        };
    }

    const { count } = await User.findAndCountAll({
        where: { ...specifications, ...filter }
    });

    if (page === 0 && size === 0) {
        const rows = await User.findAll({
            where: { ...specifications, ...filter }
        });
        return { totals: count, rows };
    } else {
        const offset = (page - 1) * size;
        const limit = size;

        const rows = await User.findAll({
            where: { ...specifications, ...filter },
            offset,
            limit
        });
        return { totals: count, rows };
    }
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
        where: { username }
    });
    return u;
};

export const getUserByEmail = async (email: string) => {
    const u = await User.findOne({
        where: { email }
    });
    return u;
};
