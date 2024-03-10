const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  // const { saludo, page = 1, limit = 10 } = req.query;
  const { page = 1, limit = 5, skip = 0 } = req.query;
  const query = { estado: true };

  // const usuarios = await Usuario.find(query)
  //   .skip(Number(skip))
  //   .limit(Number(limit));

  // const total = await Usuario.countDocuments(query);

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(skip)).limit(Number(limit)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, password, google, ...usarioPut } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    usarioPut.password = bcryptjs.hashSync(password, salt);
  }

  const usario = await Usuario.findByIdAndUpdate(id, usarioPut, {new : true});

  res.json(usario);
};

const usuariosPost = async (req = request, res = response) => {
  //Si son muchos campos puede usar google, ...rest - lo cual daria el resto
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();

  res.json(usuario);
};

const usuariosDelete = async (req = request, res = response) => {
  const id = req.params.id;

  //borrar usuario
  // const usuario = await Usuario.findByIdAndDelete(id);
  //Se elimina por medio del estado
  
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, {new : true});
  // const usuarioAutenticado = req.usuario;
  
  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};