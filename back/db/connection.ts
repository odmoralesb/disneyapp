import { Sequelize } from "sequelize";

const DB_DATABASE = process.env.DB_DATABASE || "";
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_HOST = process.env.DB_HOST || "";
const DB_LOGGIN = (process.env.DB_LOGGIN || "false") == "true";

const db = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mariadb",
    logging: DB_LOGGIN
});

export default db;
