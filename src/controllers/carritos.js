import ApiCarritos from '../api/carritos.js';

export default class ControllerCarritos {

    constructor() {
        this.apiCarritos = new ApiCarritos();
    }

    obtenerCarrito = async (req, res) => {
        try {
            const id = req.params.id;
            let carrito = await this.apiCarritos.obtenerCarrito(id);
            res.json(carrito);

        } catch (error) {
            console.log('error obtenerCarrito', error);
        }
    };

    obtenerCarritosUser = async (req, res) => {
        try {
            const userId = req.usuario._id;
            //  Por defecto se pagina en 50
            const { limite = 50, desde = 0 } = req.query;
            let carritos = await this.apiCarritos.obtenerCarritosUser(limite, desde, userId);
            res.json(carritos);

        } catch (error) {
            console.log('error obtenerCarritosUser', error);
        }
    };

    actualizarCarrito = async (req, res) => {
        try {
            const id = req.params.id;
            const { estado } = req.body;
            let carrito = await this.apiCarritos.actualizarCarrito(id, estado);
            if (carrito.status !== 200) {
                const { msg, status } = carrito;
                res.status(status).json({ msg })
            } else {
                res.json(carrito.carrito);
            }
        } catch (error) {
            console.log('error actualizarCarrito', error);
        }
    }

    guardarCarrito = async (req, res) => {
        try {
            const carrito = req.body;
            const userId = req.usuario._id;

            const carritoDB = await this.apiCarritos.guardarCarrito(carrito, userId);
            if (carritoDB.status !== 201) {
                const { msg, status } = carritoDB;
                res.status(status).json({ msg })
            } else {
                res.status(201).json(carritoDB.carritoGuardado);
            }

        } catch (error) {
            console.log('error guardarCarrito', error);
        }
    };

}