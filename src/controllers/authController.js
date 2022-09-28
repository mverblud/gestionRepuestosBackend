import Usuario from "../model/models/usuario.js";
import emailRegistro from "../helpers/emailRegistro.js";

const registrarUsuario = async (req, res) => {

    try {
        const { nombre, password, email, telefono } = req.body;
        const usuario = new Usuario({ nombre, password, email, telefono });
        const usuarioDB = await usuario.save();

        //  Envio de email con token para que se confirme el usuario
        emailRegistro({
            email,
            nombre,
            token: usuarioDB.token
        })

        res.json({ usuario: usuarioDB });

    } catch (error) {
        console.log(error);
    }
};

const confirmarUsuario = async (req, res) => {

    const { token } = req.params;

//  Verifico que el token corresponda al usuario
    const usuarioConfirmar = await Usuario.findOne({ token });
    if (!usuarioConfirmar) {
        const error = new Error("Token no valido");
        return res.status(400).json({ msg: error.message });
    }

    try {
    //  En caso de exito se elimina token y se confirma usuario
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.json({ msg: 'Usuario Confirmado Correctamente' });
    } catch (error) {
        console.log(error);
    }
};

export {
    registrarUsuario,
    confirmarUsuario
};