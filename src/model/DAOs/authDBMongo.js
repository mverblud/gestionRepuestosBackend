import Usuario from '../models/usuario.js';

export default class authDBMongoDAO {

    constructor() {
        this._collection = Usuario;
    };

    registrarUsuario = async (nombre, password, email, telefono) => {
        try {

        } catch (error) {
            console.log('error en registrarUsuario', error);
        }
    }

    confirmarUsuario = async token => {
        try {

        } catch (error) {
            console.log('error en confirmarUsuario', error);
        }
    };



}