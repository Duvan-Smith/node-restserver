const { Router } = require("express");
const { cargarArchivosCloudinary, actualizarImagenCloudinary, mostraImagenCloudinary } = require("../controllers/uploads.controller");
const { check } = require("express-validator");
const { validarCampos, validarArchivoSubir } = require("../middlewares");
const { coleccionesPermitidas } = require("../helpers");

const router = Router();

router.post("/", 
validarArchivoSubir, 
cargarArchivosCloudinary);
// cargarArchivos);

router.put("/:coleccion/:id", [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongodb').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary);
// ], actualizarImagen);

router.get("/:coleccion/:id", [
    check('id', 'El id debe ser de mongodb').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostraImagenCloudinary);
// ], mostraImagen);

module.exports = router;