import { Identifier, Op, Model } from "sequelize";

import { Character, File } from "../models/entities";
import {
    Adapter as AdapterCharacter,
    ICharacterModelResponse
} from "./../models/entities/entity.character";

import { ICharacter } from "../models/model.interfaces";

export const getCharacter = async (id: Identifier) => {
    const c = await Character.findByPk(id, {
        include: { model: File }
    });
    return c;
};

// export const getCharactersBySpecification = async (specifications = {}) => {
//     const rows = await Character.findAll({
//         where: { ...specifications },
//         include: { model: File },
//         order: [["id", "ASC"]]
//     });
//     return { rows };
// };

export const getCharactersBySpecification = async (specifications = {}) => {
    const r = await Character.findAll({
        where: { ...specifications },
        include: { model: File },
        order: [["id", "ASC"]]
    });

    const rows = r.map((r) => {
        const c = r.toJSON<ICharacterModelResponse>();
        return {
            id: c.id,
            name: c.nombre,
            age: c.edad,
            weight: c.peso,
            story: c.historia
        };
    });

    return { rows };
};

export const save = async (data: ICharacter) => {
    const character = (
        await Character.create(
            { ...AdapterCharacter(data) },
            { isNewRecord: true }
        )
    ).toJSON<ICharacterModelResponse>();
    return {
        id: character.id,
        name: character.nombre,
        age: character.edad,
        weight: character.peso,
        story: character.historia
    };
};
