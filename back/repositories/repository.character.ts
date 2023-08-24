import { Identifier, Op, Model } from "sequelize";

import { Character, File } from "../models/entities";
import {
    Adapter as AdapterCharacter,
    ICharacterModelResponse
} from "./../models/entities/entity.character";

import { IFileModelResponse } from "./../models/entities/entity.file";

import { ICharacter } from "../models/model.interfaces";

export const getCharacter = async (id: Identifier) => {
    const c = (
        await Character.findByPk(id, {
            include: { model: File }
        })
    )?.toJSON();

    return c
        ? {
              id: c.id,
              name: c.nombre,
              age: c.edad,
              weight: c.peso,
              story: c.historia,
              image: {
                  id: c.file.id,
                  path: c.file.ruta
              }
          }
        : null;
};

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
            story: c.historia,
            image: r.toJSON().file
                ? {
                      id: r.toJSON().file.id,
                      path: r.toJSON().file.ruta
                  }
                : null
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

export const update = async (id: Identifier, data: ICharacter) => {
    const entity = await Character.findByPk(id);
    const character =
        entity &&
        (
            await entity.update({
                ...AdapterCharacter(data)
            })
        ).toJSON<ICharacterModelResponse>();
    return character
        ? {
              id: character.id,
              name: character.nombre,
              age: character.edad,
              weight: character.peso,
              story: character.historia,
              image: character.imagen
          }
        : null;
};
