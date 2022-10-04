import CategoriasDBMongo from '../model/DAOs/categoriasDBMongo.js';

export default class ApiCategorias {

    constructor() {
        this.categoriaDAO = new CategoriasDBMongo();
    };

    async obtenerCategoria(id) { return await this.categoriaDAO.obtenerCategoria(id) };
    async obtenerCategorias(limite, desde) { return await this.categoriaDAO.obtenerCategorias(limite, desde) };
    async actualizarCategoria(id, body) { return await this.categoriaDAO.actualizarCategoria(id, body) }
    async guardarCategoria(categoria) { return await this.categoriaDAO.guardarCategoria(categoria) };
    async borrarCategoria(id) { return await this.categoriaDAO.borrarCategoria(id) };
}