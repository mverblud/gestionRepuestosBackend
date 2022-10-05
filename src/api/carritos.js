import CarritosDBMongo from '../model/DAOs/carritosDBMongo.js';

export default class ApiCarritos {

    constructor() {
        this.carritosDAO = new CarritosDBMongo();
    };

    async obtenerCarrito(id) { return await this.carritosDAO.obtenerCarrito(id) };
    async obtenerCarritosUser(limite, desde,userId) { return await this.carritosDAO.obtenerCarritosUser(limite, desde,userId) };
    async actualizarCarrito(id, estado) { return await this.carritosDAO.actualizarCarrito(id, estado) }
    async guardarCarrito(carrito, userId) { return await this.carritosDAO.guardarCarrito(carrito, userId) };
}