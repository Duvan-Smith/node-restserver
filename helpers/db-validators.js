const Role = require("../models/role");
const { Usuario, Categoria, Producto } = require("../models");

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

const productoExiste = async (nombre = "") => {
  const existeProducto = await Producto.findOne({ nombre });
  if (existeProducto) throw new Error("El producto existe");
};

const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) throw new Error("El id no existe");
};

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) throw new Error(`La coleccion -${coleccion}- no es permitida. [${colecciones}]`);
  return true;
}

module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
  categoriaExiste,
  existeCategoriaPorId,
  productoExiste,
  existeProductoPorId,
  coleccionesPermitidas
};
