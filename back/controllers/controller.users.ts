import { Request, Response } from "express";

import * as ServiceUser from "../services/service.user";
import * as ServiceRole from "../services/service.role";

export const createAdminSU = async (req: Request, res: Response) => {
    req.body.superusuario = true;
    req.body.role_id = await ServiceRole.getRole("ADMIN");

    const { status, ...response } = await ServiceUser.registerAdminSU(req);

    res.status(status).json(response);
};