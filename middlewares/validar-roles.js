const { request, response } = require("express");

const esAdminRole = async (req = request, res = response, next) => {
    if(!req.usuario){
        return res.status(500).json({
            msg:"Se debe validar el token primero."
        });
    }

    const {rol, nombre} = req.usuario;

    if(rol !== "ADMIN_ROLE"){
        return res.status(401).json({
            msg:`${nombre} no es administrador`
        });
    }

    next();
}

const tieneRole = (...roles) => {
    return  (req = request, res = response, next) => {
        if(!req.usuario){
            return res.status(500).json({
                msg:"Se debe validar el token primero."
            });
        }
    
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg:`El servicio requiere de uno de los siguientes roles: ${roles}`
            });
        }
    
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
};