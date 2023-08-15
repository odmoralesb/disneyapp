import { DataTypes } from "sequelize";
import db from "../../db/connection";
import Rol from "./entity.role";

const Usuario = db.define(
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

Usuario.belongsTo(Rol, {
    foreignKey: "rol_id"
});

export default Usuario;
