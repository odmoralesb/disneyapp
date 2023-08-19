import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from "../middlewares";

import { login, signin, register } from "../controllers/controller.auth";

const router = Router();

router.post(
    "/login",
    [
        check("username", "El nombre de usuario es obligatorio")
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

router.post(
    "/register",
    [
        check("nombreusuario", "El nombre de usuario es obligatorio")
            .not()
            .isEmpty(),
        check("nombres", "El nombre es obligatorio").not().isEmpty(),
        check("apellidos", "El apellido es obligatorio").not().isEmpty(),
        check("clave", "La clave es obligatoria").not().isEmpty(),
        validateFields
    ],
    register
);

export default router;
