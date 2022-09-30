import Usuario from '../models/usuario.js';
import emailRegistro from "../../helpers/emailRegistro.js";

export default class authDBMongoDAO {

    constructor() {
        this._collection = Usuario;
    };

    registrarUsuario = async (nombre, password, email, telefono) => {
        try {
            const usuario = new this._collection({ nombre, password, email, telefono });
            const usuarioDB = await usuario.save();

            //  Envio de email con token para que se confirme el usuario
            emailRegistro({ email, nombre, token: usuarioDB.token });

            return {
                usuario: usuarioDB
            }

        } catch (error) {
            console.log('error en registrarUsuario', error);
        }
    }

    confirmarUsuario = async token => {
        try {
            //  Verifico que el token corresponda al usuario
            const usuarioConfirmar = await this._collection.findOne({ token });
            if (!usuarioConfirmar) {
                const error = new Error("Token no valido");
                return {
                    status: 400,
                    msg: error.message
                };
            }

            //  En caso de exito se elimina token y se confirma usuario
            usuarioConfirmar.token = null;
            usuarioConfirmar.confirmado = true;
            await usuarioConfirmar.save();

            return { status: 201, msg: 'Usuario Confirmado Correctamente' };

        } catch (error) {
            console.log('error en confirmarUsuario', error);
            return {
                status: 400,
                msg: `error en guardarProducto ${error}`
            };
        }
    };
}

/* 
const confirmarUsuario = async (req, res) => {

    const { token } = req.params;



    try {

    } catch (error) {
        console.log(error);
    }
};
 */