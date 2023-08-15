import { Role } from "../models/entities";

export const get = async (specifications = {}) => {
    const r = await Role.findOne({
        where: specifications
    });
    return r;
};
