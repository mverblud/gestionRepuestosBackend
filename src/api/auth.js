import authDBMongoDAO from '../model/DAOs/authDBMongo.js';

export default class ApiAuth {

    constructor() {
        this.auth = new authDBMongoDAO()
    };

    async registrarUsuario(nombre, password, email, telefono) { return await this.auth.registrarUsuario(nombre, password, email, telefono) };
    async confirmarUsuario(token) { return await this.auth.confirmarUsuario(token) };
}