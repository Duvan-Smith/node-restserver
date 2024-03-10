const { request, response } = require("express");
const { Producto } = require("../models");

const productosGet = async (req = request, res = response) => {
    const { page = 1, limit = 5, skip = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(skip))
            .limit(Number(limit)),
    ]);

    res.json({
        total,
        productos,
    });
};

const productoGetById = async (req = request, res = response) => {
    const id = req.params.id;

    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json(producto);
};

const productoPut = async (req = request, res = response) => {
    const id = req.params.id;
    const { nombre, estado, ...productoPost } = req.body;

    const data = {
        nombre: nombre.toUpperCase(),
        usuario: req.usuario._id,
        ...productoPost
    }

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(producto);
};

const productoPost = async (req = request, res = response) => {
    const { nombre, estado, ...productoPost } = req.body;

    const data = {
        nombre: nombre.toUpperCase(),
        usuario: req.usuario._id,
        ...productoPost
    }

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json(producto);
};

const productoDelete = async (req = request, res = response) => {
    const id = req.params.id;

    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(producto);
};

module.exports = {
    productosGet,
    productoGetById,
    productoPut,
    productoPost,
    productoDelete,
}