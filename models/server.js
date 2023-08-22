import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import { dbConection } from "../database/config.js";
import userRouter from "../routes/usuarios.js";
import authRouter from "../routes/auth.js";
const { pathname: publicPath } = new URL("../public", import.meta.url);

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    await dbConection();
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/users", userRouter);
    this.app.use("/api/auth", authRouter);
    this.app.use(express.static("./public"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

export default Server;
