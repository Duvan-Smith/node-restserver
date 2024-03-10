const valiJWT = require("../middlewares/validar-jwt");
const valiRoles = require("../middlewares/validar-roles");
const Valicampos = require("../middlewares/validar-campos");

module.exports = {
    ...valiJWT,
    ...valiRoles,
    ...Valicampos
}