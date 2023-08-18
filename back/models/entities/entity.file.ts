import { DataTypes } from "sequelize";
import db from "../../db/connection";

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

export default File;
