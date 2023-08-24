import { Router } from "express";
import { check } from "express-validator";

import { validateJWT, validateFields } from "../middlewares";

import {
    getCharacters,
    createCharacter,
    updateCharacter,
    getCharacter
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
        check("image")
            .custom((value, { req }) => {
                if (
                    req.files["image"].mimetype === "image/jpeg" ||
                    req.files["image"].mimetype === "image/png"
                ) {
                    return true;
                } else {
                    return false;
                }
            })
            .withMessage("Solo se admiten archivos con imagenes png o jpeg"),
        validateFields
    ],
    createCharacter
);

router.put(
    "/:id",
    [
        validateJWT,
        validateFields,
        check("id", "El id del personaje es obligatorio").not().isEmpty(),
        check("name", "El nombre del personaje es obligatorio").not().isEmpty(),
        check("age", "La edad del personaje es obligatorio").not().isEmpty(),
        check("weight", "El peso del personaje es obligatorio").not().isEmpty(),
        validateFields
    ],
    updateCharacter
);

router.get("/:id", [validateJWT, validateFields], getCharacter);

export default router;
