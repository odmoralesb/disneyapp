import dotenv from "dotenv";

//libraries
import { Request } from "express";
import { UploadedFile } from "express-fileupload";
import * as fs from "fs";

// models
import { IResponse } from "../models/model.interfaces";

// repositories
import * as RepositoryCharacter from "../repositories/repository.character";
import * as RepositoryFile from "../repositories/repository.file";

// helpers
import { guid } from "./../helpers/guid";

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
        const { body, files } = req;

        const errors: any = [];

        const img = files && (files.image as UploadedFile);

        if (!img) {
            errors.push("Archivo no encontrado");
        }

        const ext = img?.name.split(".")[1];
        const FOLDER_IMG = process.env.FOLDER_IMG || "";
        const img_path = `${FOLDER_IMG}/${guid()}.${ext}`;

        const base = `${__dirname}/../public`;

        await Promise.all([img?.mv(`${base}${img_path}`)]).catch((error) => {
            errors.push("Ocurrio un error subiendo los archivos: " + error);
        });

        if (errors.length > 0) {
            return { status: 409, errors };
        }

        const file = await RepositoryFile.add({
            path: img_path
        });

        body.file = file.id;

        const character = await RepositoryCharacter.save(body);

        return {
            status: 200,
            payload: { character }
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

export const updateCharacter = async (
    id: string,
    req: Request
): Promise<IResponse> => {
    try {
        const { body } = req;

        const errors: any = [];

        if (errors.length > 0) {
            return { status: 409, errors };
        }

        const entityCharacter = await RepositoryCharacter.getCharacter(id);

        if (entityCharacter) {
            const character = await RepositoryCharacter.update(id, body);

            return {
                status: 200,
                payload: { character }
            };
        } else {
            return { status: 409, errors: ["Personaje no registrado"] };
        }
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

export const getCharacter = async (id: number): Promise<IResponse> => {
    try {
        const character = await RepositoryCharacter.getCharacter(id);
        if (character) {
            return {
                status: 200,
                payload: { character }
            };
        } else {
            return { status: 409, errors: ["Paciente no registrado"] };
        }
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
