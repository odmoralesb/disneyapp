import { DataTypes } from "sequelize";
import db from "../../db/connection";
import { IRole } from "../model.interfaces";

const Role = db.define(
    "role",
    {
        id: {
            type: DataTypes.NUMBER,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        descripcion: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: "roles",
        timestamps: false
    }
);

export interface IRoleModelResponse {
    nombre: string;
    descripcion: string;
}

export const Adapter = (data: IRole): IRoleModelResponse => ({
    nombre: data.name,
    descripcion: data.description
});

export default Role;
