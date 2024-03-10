const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");
const { productoExiste, existeProductoPorId } = require("../helpers/db-validators");
const {
    productosGet,
    productoGetById,
    productoPost,
    productoPut,
    productoDelete
} = require("../controllers/productos.controller");

const router = Router();

router.get("/",
    productosGet
);

router.get("/:id",
    [
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(existeProductoPorId),
        validarCampos,
    ],
    productoGetById
);

router.post("/", [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check("nombre").custom(productoExiste),
    check("categoria", "No es un id valido").isMongoId(),
    validarCampos,
],
    productoPost
);

router.put("/:id",
    [
        validarJWT,
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(existeProductoPorId),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check("nombre").custom(productoExiste),
        validarCampos,
    ],
    productoPut
);

//Privado eleminar admin
router.delete("/:id",
    [
        validarJWT,
        esAdminRole,
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(existeProductoPorId),
        validarCampos,
    ],
    productoDelete
);

module.exports = router;