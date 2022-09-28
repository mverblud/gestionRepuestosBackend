import dotenv from "dotenv";
import ProductosFactoryDAO from '../model/DAOs/productoFactory.js';

dotenv.config();

export default class ApiProductos {

    constructor() {
        this.productoDAO = ProductosFactoryDAO.get(process.env.TIPO_PRESISTENCIA);
    };

    async obtenerProducto(id) { return await this.productoDAO.obtenerProducto(id) };
    async obtenerProductos(limite, desde) { return await this.productoDAO.obtenerProductos(limite, desde) };
    async actualizarProducto(id, body) { return await this.productoDAO.actualizarProducto(id, body) }
    async guardarProducto(producto) { return await this.productoDAO.guardarProducto(producto) };
    async borrarProducto(id) { return await this.productoDAO.borrarProducto(id) };
}