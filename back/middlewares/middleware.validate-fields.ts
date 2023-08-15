import { validationResult } from "express-validator";
import { Request, Response } from "express";

export const validateFields = (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const output: string[] = [];

        errors.array().forEach((e) => {
            output.push(e.msg);
        });

        return res.status(400).json({ errors: output });
    }

    next();
};

export default validateFields;
