import { Identifier, Op, Model } from "sequelize";

import { Character, File } from "../models/entities";
import { Adapter as AdapterCharacter } from "./../models/entities/entity.character";

import { ICharacter } from "../models/model.interfaces";

export const getCharacter = async (id: Identifier) => {
    const c = await Character.findByPk(id, {
        include: { model: File }
    });
    return c;
};

export const getCharactersBySpecification = async (specifications = {}) => {
    const rows = await Character.findAll({
        where: { ...specifications },
        include: { model: File },
        order: [["id", "ASC"]]
    });
    return { rows };
};

export const save = async (data: ICharacter) => {
    const character = await Character.create(
        { ...AdapterCharacter(data) },
        { isNewRecord: true }
    );
    return character;
};
