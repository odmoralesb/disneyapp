import { DataTypes } from "sequelize";
import db from "../../db/connection";
import File from "./entity.file";
import { ICharacter } from "../model.interfaces";

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

export interface ICharacterModelResponse {
    id: number;
    nombre: string;
    edad: number;
    peso: number;
    historia: string;
}

export const Adapter = (data: ICharacter): ICharacterModelResponse => ({
    id: data.id,
    nombre: data.name,
    edad: data.age,
    peso: data.weight,
    historia: data.story
});

export default Character;
