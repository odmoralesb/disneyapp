import jwt from "jsonwebtoken";

export const generateJWT = (payload = {}) => {
    return new Promise((resolve, reject) => {
        const SECRETORPRIVATEKEY = process.env.SECRETORPRIVATEKEY || "";
        jwt.sign(
            payload,
            SECRETORPRIVATEKEY,
            {
                expiresIn: "4h"
            },
            (err: Error | null, token: string | undefined) => {
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el token");
                } else {
                    resolve(token);
                }
            }
        );
    });
};

export const isTokenExpired = (token: string): boolean => {
    try {
        const { exp } = jwt.decode(token) as {
            exp: number;
        };
        const expirationDatetimeInSeconds = exp * 1000;

        return Date.now() >= expirationDatetimeInSeconds;
    } catch {
        return true;
    }
};
