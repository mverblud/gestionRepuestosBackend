import Carritos from '../models/carritos.js';

export default class CarritosDBMongoDAO {

    constructor() {
        this._collection = Carritos;
    };

    obtenerCarrito = async _id => {
        try {
            const carrito = await this._collection.findOne({ _id })
                .populate('usuario', 'nombre')
                .populate('productos', 'nombre')
            return carrito;
        } catch (error) {
            console.log('error en obtenerCarrito', error);
        }
    }

    obtenerCarritosUser = async (limite, desde, userId) => {
        try {
            const query = { usuario: userId }
            const [total, carritos] = await Promise.all([
                this._collection.countDocuments(query),
                this._collection.find(query)
                    .populate('usuario', 'nombre')
                    .populate('productos', 'nombre')
                    .skip(Number(desde))
                    .limit(Number(limite))
            ])
            return {
                total,
                limite,
                desde,
                carritos
            }

        } catch (error) {
            console.log('error en obtenerProductos', error);
        }
    };

    actualizarCarrito = async (_id, estado) => {
        console.log(estado);
        try {
            const carrito = await this._collection.findByIdAndUpdate(_id, { data: estado }, { new: true });
            console.log(carrito);
            return {
                status: 200,
                carrito
            };

        } catch (error) {
            console.log('error en actualizarCarrito', error);
            return {
                status: 400,
                msg: `error en actualizarCarrito ${error}`
            };
        }
    }

    guardarCarrito = async (carrito, userId) => {

        try {

            carrito.usuario = userId;
            const carritoGuardado = await this._collection.create(carrito)

            return {
                status: 201,
                carritoGuardado
            };

        } catch (error) {
            console.log('error en guardarCarrito', error);
            return {
                status: 400,
                msg: `error en guardarCarrito ${error}`
            };
        }
    };

}