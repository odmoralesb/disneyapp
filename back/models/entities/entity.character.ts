import { DataTypes } from "sequelize";
import db from "../../db/connection";
import File from "./entity.file";

const Character = db.define(
    "character",
    {
        id: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        edad: {
            type: DataTypes.NUMBER
        },
        peso: {
            type: DataTypes.NUMBER
        },
        historia: {
            type: DataTypes.STRING
        },
        imagen: {
            type: DataTypes.NUMBER
        }
    },
    {
        tableName: "personajes"
    }
);

Character.hasOne(File, {
    foreignKey: "id"
});

export default Character;
