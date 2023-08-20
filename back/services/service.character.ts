//libraries
import { Request } from "express";

// models
import { IResponse } from "../models/model.interfaces";

// repositories
import * as RepositoryCharacter from "../repositories/repository.character";

export const getCharacters = async (req: Request): Promise<IResponse> => {
    try {
        const { query } = req;

        let sname = {};
        if (query.name != undefined) {
            sname = { nombre: query.name };
        }

        let sage = {};
        if (query.age != undefined) {
            sage = { edad: query.age };
        }

        const specification = {
            ...sname,
            ...sage
        };

        const characters =
            await RepositoryCharacter.getCharactersBySpecification(
                specification
            );

        const { rows } = characters;

        return {
            status: 200,
            payload: {
                records: rows
            }
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            errors: [
                "Ocurrio un error interno en el servidor. Hable con el administrador"
            ]
        };
    }
};

export const registerCharacter = async (req: Request): Promise<IResponse> => {
    try {
        const { body } = req;

        const errors: any = [];

        if (errors.length > 0) {
            return { status: 409, errors };
        }

        const charcater = await RepositoryCharacter.save(body);

        return {
            status: 200,
            payload: { charcater }
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            errors: [
                "Ocurrio un error interno en el servidor. Hable con el administrador"
            ]
        };
    }
};
