import { File } from "../models/entities";
import { IFile } from "../models/model.interfaces";

import {
    Adapter as AdapterFile,
    IFileModelResponse
} from "./../models/entities/entity.file";

export const add = async (data: IFile) => {
    const file = (
        await File.create({ ...AdapterFile(data) }, { isNewRecord: true })
    ).toJSON<IFileModelResponse>();
    return {
        id: file.id,
        path: file.ruta
    };
};
