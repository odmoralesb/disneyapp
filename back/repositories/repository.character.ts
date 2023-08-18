import { Identifier, Op, Model } from "sequelize";
import { Character, File } from "../models/entities";

export const getCharacter = async (id: Identifier) => {
    const u = await Character.findByPk(id, {
        include: { model: File }
    });
    return u;
};

export const getCharactersBySpecification = async (
    specifications = {},
    order = "ASC"
) => {
    const rows = await Character.findAll({
        where: { ...specifications },
        include: { model: File },
        order: [["id", order]]
    });

    return { rows };
};
