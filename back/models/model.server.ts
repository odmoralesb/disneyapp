import express, { Application } from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

import authRoutes from "../routes/route.auth";
import userRoutes from "../routes/route.users";


import db from "../db/connection";

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        auth: "/api/auth",
        users: "/api/users"
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "8000";

        // Metodos iniciales
        this.dbConnection();
        this.miidlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            const DB_PASSWORD = process.env.DB_PASSWORD?.trim || "";
            const DB_ALLOW_EMPTY_PASS =
                (process.env.DB_ALLOW_EMPTY_PASS || "false") == "true";

            if (!DB_ALLOW_EMPTY_PASS && DB_PASSWORD.length == 0)
                throw "El password del usuario admin de la BD es obligatorio en el archivo de la configuracion";

            await db.authenticate();
            console.log("Database online");
        } catch (error: any) {
            throw new Error(error);
        }
    }

    miidlewares() {
        // cors
        this.app.use(cors());

        // Lectura del Body
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(fileUpload());

        // Carpeta publica
        //this.app.use(express.static("public"));
        this.app.use(express.static(process.env.PUBLIC_PATH || "public"));
    }

    routes() {
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.users, userRoutes);

        this.app.get("/*", (req, res) => {
            const path = process.env.INDEX_PATH || "";
            res.sendFile(path, (err) => {
                if (err) {
                    res.status(500).send({
                        ...err
                    });
                }
            });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }
}

export default Server;
