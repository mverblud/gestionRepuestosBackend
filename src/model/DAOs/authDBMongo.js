import Usuario from '../models/usuario.js';
import generarJWT from '../../helpers/generarJWT.js';
import generarId from '../../helpers/generarTokenId.js';
import emailRegistro from '../../helpers/emailRegistro.js';
import emailOlvidePassword from '../../helpers/emailOlvidePassword.js';


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
                msg: `error en confirmarUsuario ${error}`
            };
        }
    };

    autenticar = async (email, password) => {
        try {

            const usuario = await this._collection.findOne({ email });
            if (!usuario) {
                const error = new Error("El Usuario no existe");
                return {
                    status: 403,
                    msg: error.message
                }
            }

            if (!usuario.confirmado) {
                const error = new Error("Tu Cuenta no ha sido confirmada");
                return {
                    status: 403,
                    msg: error.message
                }
            }

            if (await usuario.comprobarPassword(password)) {
                const usuarioOK = {
                    _id: usuario._id,
                    nombre: usuario.nombre,
                    email: usuario.email,
                    token: generarJWT(usuario._id)
                };
                return {
                    status: 200,
                    msg: usuarioOK
                }
            } else {
                const error = new Error("El Password es incorrecto");
                return {
                    status: 403,
                    msg: error.message
                }
            }

        } catch (error) {
            console.log('error en autenticar', error);
            return {
                status: 400,
                msg: `error en autenticar ${error}`
            };
        }
    }

    olvidePassword = async (email) => {
        try {

            const usuarioExiste = await this._collection.findOne({ email });
            if (!usuarioExiste) {
                const error = new Error('El usuario no existe');
                return {
                    status: 400,
                    msg: error.message
                }
            };

            usuarioExiste.token = generarId();
            await usuarioExiste.save();

            // Envio email
            emailOlvidePassword({
                email,
                nombre: usuarioExiste.nombre,
                token: usuarioExiste.token
            });

            return {
                status: 200,
                msg: 'Hemos enviado un mail con las instrucciones'
            };

        } catch (error) {
            console.log('error en olvidePassword', error);
            return {
                status: 400,
                msg: `error en olvidePassword ${error}`
            };
        }
    }

    comprobarPassword = async (token) => {
        try {

            const tokenValido = await this._collection.findOne({ token });
            if (tokenValido) {
                return {
                    status: 200,
                    msg: 'Token Valido y el usuario existe'
                }
            } else {
                const error = new Error('Token no valido');
                return {
                    status: 400,
                    msg: error.message
                }
            }

        } catch (error) {
            console.log('error en comprobarPassword', error);
            return {
                status: 400,
                msg: `error en comprobarPassword ${error}`
            };
        }
    };

    nuevoPassword = async (token, password) => {
        try {

            const usuario = await this._collection.findOne({ token });
            if (!usuario) {
                const error = new Error('Hubo un error');
                return {
                    status: 400,
                    msg: error.message
                }
            }

            usuario.token = null;
            usuario.password = password;
            await usuario.save();
            return {
                status: 200,
                msg: 'Password mofificado correctamente'
            }

        } catch (error) {
            console.log('error en nuevoPassword', error);
            return {
                status: 400,
                msg: `error en nuevoPassword ${error}`
            };
        }
    }

}