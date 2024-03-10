const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario o correo no son correctos"
            });
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario o correo no son correctos"
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario o correo no son correctos"
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({ usuario, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
};

const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body;

    try {
        const { nombre, img, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: 'googleUser',
                img,
                google: true
            };

            usuario = new Usuario(data);
            usuario.save();
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Usuario bloqueado"
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({ usuario, token });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "El token no se pudo verificar."
        });
    }
}

module.exports = {
    login,
    googleSignIn
}