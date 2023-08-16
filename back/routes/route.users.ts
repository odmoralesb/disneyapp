import { Router } from "express";
import { check } from "express-validator";

import { validateFields, validateJWTAdminDB } from "../middlewares";

import { createAdminSU } from "../controllers/controller.users";

const router = Router();

router.post(
    "/su",
    [
        validateJWTAdminDB,
        check("nombreusuario", "El nombre de usuario es obligatorio")
            .not()
            .isEmpty(),
        check("nombres", "El nombre es obligatorio").not().isEmpty(),
        check("apellidos", "El apellido es obligatorio").not().isEmpty(),
        validateFields
    ],
    createAdminSU
);

export default router;
