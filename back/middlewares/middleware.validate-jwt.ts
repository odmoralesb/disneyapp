import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { IToken, IUser } from "../models/model.interfaces";
import * as RepositoryUser from "../repositories/repository.user";

export const validateJWTAdminDB = async (
    req: Request,
    res: Response,
    next: Function
) => {
    const token = req.header("x-token");

    if (!token) {
        return res
            .status(401)
            .json({ errors: ["No hay token en la peticion"] });
    }

    try {
        const SECRETORPRIVATEKEY = process.env.SECRETORPRIVATEKEY || "";

        const { username, role } = jwt.verify(
            token,
            SECRETORPRIVATEKEY
        ) as IToken;

        if (!username) {
            return res.status(401).json({ errors: ["Token invalido"] });
        }

        if (role !== "ADMIN-DB") {
            return res.status(401).json({
                errors: [
                    "Usuario no tiene autorizacion para realizar esta peticion"
                ]
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ errors: ["Token invalido"] });
    }
};

export const validateJWTSUAdmin = async (
    req: Request,
    res: Response,
    next: Function
) => {
    const token = req.header("x-token");

    if (!token) {
        return res
            .status(401)
            .json({ errors: ["No hay token en la peticion"] });
    }

    try {
        const SECRETORPRIVATEKEY = process.env.SECRETORPRIVATEKEY || "";

        const { id } = jwt.verify(token, SECRETORPRIVATEKEY) as IToken;

        if (!id) {
            return res.status(401).json({ errors: ["Token invalido"] });
        }

        const user = await RepositoryUser.getUser(id);

        if (!user.id) {
            return res.status(401).json({ errors: ["Token invalido"] });
        }

        if (!user.is_superuser) {
            return res.status(401).json({
                errors: [
                    "Usuario no tiene autorizacion para realizar esta peticion"
                ]
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ errors: ["Token invalido"] });
    }
};

export const validateJWTAdmin = async (
    req: Request,
    res: Response,
    next: Function
) => {
    const token = req.header("x-token");

    if (!token) {
        return res
            .status(401)
            .json({ errors: ["No hay token en la peticion"] });
    }

    try {
        const SECRETORPRIVATEKEY = process.env.SECRETORPRIVATEKEY || "";

        const { id } = jwt.verify(token, SECRETORPRIVATEKEY) as IToken;

        if (!id) {
            return res.status(401).json({ errors: ["Token invalido"] });
        }

        const user = await RepositoryUser.getUser(id);

        if (!user.id) {
            return res.status(401).json({ errors: ["Token invalido"] });
        }

        if (user.role?.name !== "ADMIN") {
            return res.status(401).json({
                errors: [
                    "Usuario no tiene autorizacion para realizar esta peticion"
                ]
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ errors: ["Token invalido"] });
    }
};

export const validateJWT = async (
    req: Request,
    res: Response,
    next: Function
) => {
    const token = req.header("x-token");

    if (!token) {
        return res
            .status(401)
            .json({ errors: ["No hay token en la peticion"] });
    }

    try {
        const SECRETORPRIVATEKEY = process.env.SECRETORPRIVATEKEY || "";

        const { id } = jwt.verify(token, SECRETORPRIVATEKEY) as IToken;

        if (!id) {
            return res.status(401).json({ errors: ["Token invalido"] });
        }

        const user = await RepositoryUser.getUser(id);

        if (!user.id) {
            return res.status(401).json({ errors: ["Token invalido"] });
        }

        if (!user.id) {
            return res.status(401).json({
                errors: [
                    "Usuario no tiene autorizacion para realizar esta peticion"
                ]
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ errors: ["Token invalido"] });
    }
};
