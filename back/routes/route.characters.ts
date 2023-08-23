import { Router } from "express";
import { check } from "express-validator";

import { validateJWT, validateFields } from "../middlewares";

import {
    getCharacters,
    createCharacter
} from "../controllers/controller.characters";

const router = Router();

router.get("/", [validateJWT, validateFields], getCharacters);

router.post(
    "/",
    [
        validateJWT,
        validateFields,
        check("name", "El nombre del personaje es obligatorio").not().isEmpty(),
        check("age", "La edad del personaje es obligatorio").not().isEmpty(),
        check("weight", "El peso del personaje es obligatorio").not().isEmpty(),
        validateFields,
        check("files[0][file]")
            .custom((value, { req }) => {
                if (
                    req.files["files[0][file]"].mimetype === "image/jpeg" ||
                    req.files["files[0][file]"].mimetype === "image/png"
                ) {
                    return true;
                } else {
                    return false;
                }
            })
            .withMessage("Solo se admiten archivos con imagenes png o jpeg")
    ],
    createCharacter
);

export default router;
