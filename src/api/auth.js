import authDBMongoDAO from '../model/DAOs/authDBMongo.js';

export default class ApiAuth {

    constructor() {
        this.auth = new authDBMongoDAO()
    };

    async registrarUsuario(nombre, password, email, telefono) { return await this.auth.registrarUsuario(nombre, password, email, telefono) };
    async confirmarUsuario(token) { return await this.auth.confirmarUsuario(token) };
    async autenticar(email, password) { return await this.auth.autenticar(email, password) };
    async olvidePassword(email) { return await this.auth.olvidePassword(email) };
    async comprobarPassword(token) { return await this.auth.comprobarPassword(token) };
    async nuevoPassword(token, password) { return await this.auth.nuevoPassword(token, password) };

}