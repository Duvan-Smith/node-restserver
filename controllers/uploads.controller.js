const { request, response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivos = async (req = request, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({ msg: 'No se encontraron archivos.' });
        return;
    }
    try {
        // const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        // const nombre = await subirArchivo(req.files);
        res.json({ nombre });
    } catch (msg) {
        res.status(400).json({ msg })
    }
};

module.exports = {
    cargarArchivos
}