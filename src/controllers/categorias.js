import ApiCategorias from '../api/categorias.js';

export default class ControllerCategorias {

    constructor() {
        this.apiCategorias = new ApiCategorias();
    }

    obtenerCategoria = async (req, res) => {
        try {
            const id = req.params.id;
            let categoria = await this.apiCategorias.obtenerCategoria(id);
            res.json(categoria);

        } catch (error) {
            console.log('error obtenerCategoria', error);
        }
    };

    obtenerCategorias = async (req, res) => {
        try {
            //  Por defecto se pagina en 50
            const { limite = 50, desde = 0 } = req.query;
            let categoria = await this.apiCategorias.obtenerCategorias(limite, desde);
            res.json(categoria);

        } catch (error) {
            console.log('error obtenerCategorias', error);
        }
    };

    actualizarCategoria = async (req, res) => {
        try {
            const id = req.params.id;
            const { body } = req;
            let categoria = await this.apiCategorias.actualizarCategoria(id, body);
            if (categoria.status !== 200) {
                const { msg, status } = categoria;
                res.status(status).json({ msg })
            } else {
                res.json(categoria);
            }
        } catch (error) {
            console.log('error actualizarCategoria', error);
        }
    }

    guardarCategoria = async (req, res) => {
        try {
            let categoria = req.body;
            let categoriaDB = await this.apiCategorias.guardarCategoria(categoria);
            if (categoriaDB.status !== 201) {
                const { msg, status } = categoriaDB;
                res.status(status).json({ msg })
            } else {
                res.status(201).json(categoriaDB.categoriaGuardado);
            }

        } catch (error) {
            console.log('error guardarCategoria', error);
        }
    };

    borrarCategoria = async (req, res) => {
        try {
            let id = req.params.id;
            let categoria = await this.apiCategorias.borrarCategoria(id);
            res.json(categoria);

        } catch (error) {
            console.log('error borrarCategoria', error);
        }
    };

}