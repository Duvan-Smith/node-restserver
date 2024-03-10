const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg:"Usuario o correo no son correctos"
            });
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg:"Usuario o correo no son correctos"
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                msg:"Usuario o correo no son correctos"
            });
        }

        const token=await generarJWT(usuario.id);

        res.json({ usuario, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

module.exports = {
    login
}