const valiJWT = require("../middlewares/validar-jwt");
const valiRoles = require("../middlewares/validar-roles");
const Valicampos = require("../middlewares/validar-campos");
const ValiArchivo = require("../middlewares/validar-archivo");

module.exports = {
    ...valiJWT,
    ...valiRoles,
    ...Valicampos,
    ...ValiArchivo
}