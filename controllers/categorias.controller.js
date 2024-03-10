const { request, response } = require("express");
const { Categoria } = require("../models");

const categoriasGet = async (req = request, res = response) => {
    const { page = 1, limit = 5, skip = 0 } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario','nombre')
            .skip(Number(skip))
            .limit(Number(limit)),
    ]);

    res.json({
        total,
        categorias,
    });
};

const categoriasGetById = async (req = request, res = response) => {
    const id = req.params.id;

    const categoria = await Categoria.findById(id).populate('usuario','nombre');

    res.json(categoria);
};

const categoriasPut = async (req = request, res = response) => {
    const id = req.params.id;
    const { _id, usuario, nombre, estado } = req.body;

    const data = {
        nombre: nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new : true});

    res.json(categoria);
};

const categoriasPost = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json(categoria);
};

const categoriasDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, {new : true});

    res.json(categoria);
};

module.exports = {
    categoriasGet,
    categoriasGetById,
    categoriasPut,
    categoriasPost,
    categoriasDelete,
}