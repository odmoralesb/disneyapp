import { Request, Response } from "express";

import * as ServiceCharacter from "../services/service.character";

export const getCharacters = async (req: Request, res: Response) => {
    const { status, ...response } = await ServiceCharacter.getCharacters(req);
    res.status(status).json(response);
};
