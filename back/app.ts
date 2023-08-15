import "dotenv/config";
import Server from "./models/model.server";

const server = new Server();

server.listen();
