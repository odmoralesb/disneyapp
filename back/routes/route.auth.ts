import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from "../middlewares";

import { login, signin } from "../controllers/controller.auth";

const router = Router();

router.post(
    "/login",
    [
        check("nombreusuario", "El nombre de usuario es obligatorio")
            .not()
            .isEmpty(),
        validateFields
    ],
    login
);

router.post(
    "/signin",
    [check("token", "El token es obligatorio").not().isEmpty(), validateFields],
    signin
);


export default router;
