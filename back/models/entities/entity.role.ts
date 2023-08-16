import { DataTypes } from "sequelize";
import db from "../../db/connection";

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

export default Role;
