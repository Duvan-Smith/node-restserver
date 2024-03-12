const { Router } = require("express");
const { cargarArchivos, actualizarImagen, mostraImagen } = require("../controllers/uploads.controller");
const { check } = require("express-validator");
const { validarCampos, validarArchivoSubir } = require("../middlewares");
const { coleccionesPermitidas } = require("../helpers");

const router = Router();

router.post("/", validarArchivoSubir, cargarArchivos);

router.put("/:coleccion/:id", [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongodb').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagen);

router.get("/:coleccion/:id", [
    check('id', 'El id debe ser de mongodb').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostraImagen);

module.exports = router;