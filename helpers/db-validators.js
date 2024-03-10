const Role = require("../models/role");
const {Usuario, Categoria} = require("../models");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) throw new Error("El rol no existe");
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) throw new Error("El correo existe");
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) throw new Error("El id no existe");
};

const categoriaExiste = async (nombre = "") => {
  const existeCategoria = await Categoria.findOne({ nombre });
  if (existeCategoria) throw new Error("La categoria existe");
};

const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) throw new Error("El id no existe");
};

module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
  categoriaExiste,
  existeCategoriaPorId,
};
