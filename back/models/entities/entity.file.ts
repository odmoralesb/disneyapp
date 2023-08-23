import { DataTypes } from "sequelize";
import db from "../../db/connection";
import { IFile } from "../model.interfaces";

const File = db.define(
    "file",
    {
        id: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true
        },
        ruta: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: "archivos",
        timestamps: false
    }
);

export interface IFileModelResponse {
    id?: number;
    ruta: string;
}

export const Adapter = (data: IFile): IFileModelResponse => ({
    id: data.id,
    ruta: data.path
});

export default File;
