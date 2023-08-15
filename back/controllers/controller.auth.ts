import { Request, Response } from "express";
import * as ServiceAuth from "../services/service.auth";

export const login = async (req: Request, res: Response) => {
    const { status, ...response } = await ServiceAuth.login(req);

    res.status(status).json(response);
};

export const signin = async (req: Request, res: Response) => {
    const { status, ...response } = await ServiceAuth.signin(req);

    res.status(status).json(response);
};
