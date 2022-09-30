import ProductosDBMongo from '../model/DAOs/productosDBMongo.js';

export default class ApiProductos {

    constructor() {
        this.productoDAO = new ProductosDBMongo();
    };

    async obtenerProducto(id) { return await this.productoDAO.obtenerProducto(id) };
    async obtenerProductos(limite, desde) { return await this.productoDAO.obtenerProductos(limite, desde) };
    async actualizarProducto(id, body) { return await this.productoDAO.actualizarProducto(id, body) }
    async guardarProducto(producto) { return await this.productoDAO.guardarProducto(producto) };
    async borrarProducto(id) { return await this.productoDAO.borrarProducto(id) };
}