import { Router } from "express";

import { validateJWT, validateFields } from "../middlewares";

import { getCharacters } from "../controllers/controller.characters";

const router = Router();

router.get("/", [validateJWT, validateFields], getCharacters);

export default router;
