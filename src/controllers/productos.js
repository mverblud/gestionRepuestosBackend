import ApiProductos from '../api/productos.js';

export default class ControllerProductos {

    constructor() {
        this.apiProductos = new ApiProductos();
    }

    obtenerProducto = async (req, res) => {
        try {
            const id = req.params.id;
            let producto = await this.apiProductos.obtenerProducto(id);
            res.json(producto);

        } catch (error) {
            console.log('error obtenerProducto', error);
        }
    };

    obtenerProductos = async (req, res) => {
        try {
            //  Por defecto se pagina en 50
            const { limite = 50, desde = 0 } = req.query;
            let producto = await this.apiProductos.obtenerProductos(limite, desde);
            res.json(producto);

        } catch (error) {
            console.log('error obtenerProductos', error);
        }
    };

    actualizarProducto = async (req, res) => {
        try {
            const id = req.params.id;
            const { body } = req;
            let producto = await this.apiProductos.actualizarProducto(id, body);
            if (producto.status !== 200) {
                const { msg, status } = producto;
                res.status(status).json({ msg })
            } else {
                res.json(producto);
            }
        } catch (error) {
            console.log('error actualizarProducto', error);
        }
    }

    guardarProducto = async (req, res) => {
        try {
            let producto = req.body;
            let productoDB = await this.apiProductos.guardarProducto(producto);
            if (productoDB.status !== 201) {
                const { msg, status } = productoDB;
                res.status(status).json({ msg })
            } else {
                res.status(201).json(productoDB.productoGuardado);
            }

        } catch (error) {
            console.log('error guardarProducto', error);
        }
    };

    borrarProducto = async (req, res) => {
        try {
            let id = req.params.id;
            let producto = await this.apiProductos.borrarProducto(id);
            res.json(producto);

        } catch (error) {
            console.log('error borrarProducto', error);
        }
    };

}