import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";

import { dbConection } from "../database/config.js";
import userRouter from "../routes/usuarios.js";

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
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(json());
  }

  routes() {
    this.app.use("/api/users", userRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

export default Server;
