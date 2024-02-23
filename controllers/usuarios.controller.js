const { request, response } = require("express");

const usuariosGet = (req = request, res = response) => {
  const { saludo, page = 1, limit = 10 } = req.query;
  res.json({
    meg: "get Api",
    des: "Hello World",
    saludo,
    page,
    limit,
  });
};

const usuariosPut = (req = request, res = response) => {
  const id = req.params.id;
  res.json({
    meg: "put Api",
    des: "Hello World",
    id,
  });
};

const usuariosPost = (req, res) => {
  const { nombre, id } = req.body;
  res.json({
    meg: "post Api",
    des: "Hello World",
    nombre,
    id,
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    meg: "delete Api",
    des: "Hello World",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
