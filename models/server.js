const express = require("express");
var cors = require("cors");
const { dbConnection } = require("../database/config.db");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth : "/api/auth",
      usuarios : "/api/usuarios",
      categorias : "/api/categorias",
    }

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
    this.app.use(this.paths.auth, require("../routes/auth.route"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios.route"));
    this.app.use(this.paths.categorias, require("../routes/categorias.route"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server puerto", this.port);
    });
  }
}

module.exports = Server;
