const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth.controller");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");
const { categoriaExiste, existeCategoriaPorId } = require("../helpers/db-validators");
const { categoriasPost, categoriasGet, categoriasGetById, categoriasPut, categoriasDelete } = require("../controllers/categorias.controller");

const router = Router();

router.get("/",
    categoriasGet
);

router.get("/:id",
    [
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(existeCategoriaPorId),
        validarCampos,
    ],
    categoriasGetById
);

router.post("/", [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check("nombre").custom(categoriaExiste),
    validarCampos,
],
    categoriasPost
);

router.put("/:id",
    [
        validarJWT,
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(existeCategoriaPorId),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check("nombre").custom(categoriaExiste),
        validarCampos,
    ],
    categoriasPut
);

//Privado eleminar admin
router.delete("/:id",
    [
        validarJWT,
        esAdminRole,
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(existeCategoriaPorId),
        validarCampos,
    ],
    categoriasDelete
);

module.exports = router;