import { DataTypes } from "sequelize";
import db from "../../db/connection";
import Role, { IRoleModelResponse } from "./entity.role";
import { IUser } from "../model.interfaces";

const User = db.define(
    "user",
    {
        id: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreusuario: {
            type: DataTypes.STRING
        },
        clave: {
            type: DataTypes.STRING
        },
        nombres: {
            type: DataTypes.STRING
        },
        apellidos: {
            type: DataTypes.STRING
        },
        superusuario: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        rol_id: {
            type: DataTypes.NUMBER,
            defaultValue: 2
        }
    },
    {
        tableName: "usuarios"
    }
);

export interface IUserModelResponse {
    id: number;
    nombreusuario: string;
    nombres: string;
    apellidos: string;
    superusuario: boolean;
    rol_id: number;
    rol: IRoleModelResponse;
    clave: string;
}

export const Adapter = (data: IUser): IUserModelResponse => ({
    id: data.id,
    nombreusuario: data.username,
    nombres: data.firstname,
    apellidos: data.lastname,
    superusuario: data.is_superuser,
    rol_id: data.role_id,
    clave: data.password,
    rol: {
        nombre: data.role?.name,
        descripcion: data.role?.description
    }
});

User.belongsTo(Role, {
    as: "rol",
    foreignKey: "rol_id"
});

export default User;
