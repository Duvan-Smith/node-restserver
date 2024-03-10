const express = require("express");
var cors = require("cors");
const { dbConnection } = require("../database/config.db");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";

    this.conectarDB();

    this.middlewares();

    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth.route"));
    this.app.use(this.usuariosPath, require("../routes/usuarios.route"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server puerto", this.port);
    });
  }
}

module.exports = Server;
