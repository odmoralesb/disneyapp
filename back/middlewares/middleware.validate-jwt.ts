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

        const entityUser = await RepositoryUser.getUser(id);

        if (!entityUser) {
            return res.status(401).json({ errors: ["Token invalido"] });
        }

        const user = entityUser.toJSON<IUser>();

        if (!user.superusuario) {
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

        const entityUser = await RepositoryUser.getUser(id);

        if (!entityUser) {
            return res.status(401).json({ errors: ["Token invalido"] });
        }

        const user = entityUser.toJSON<IUser>();

        if (user.role?.nombre !== "ADMIN") {
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

        const entityUser = await RepositoryUser.getUser(id);

        if (!entityUser) {
            return res.status(401).json({ errors: ["Token invalido"] });
        }

        const user = entityUser.toJSON<IUser>();

        if (!user) {
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


