import { Request, Response } from "express";
import * as ServiceAuth from "../services/service.auth";

import * as ServiceUser from "../services/service.user";
import * as ServiceRole from "../services/service.role";

export const login = async (req: Request, res: Response) => {
    const { status, ...response } = await ServiceAuth.login(req);

    res.status(status).json(response);
};

export const signin = async (req: Request, res: Response) => {
    const { status, ...response } = await ServiceAuth.signin(req);

    res.status(status).json(response);
};

export const register = async (req: Request, res: Response) => {
    req.body.superusuario = true;
    req.body.rol_id = await ServiceRole.getRole("USER");

    const { status, ...response } = await ServiceUser.registerUser(req);

    res.status(status).json(response);
};
