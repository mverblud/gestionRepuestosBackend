import Categoria from '../models/categorias.js';

export default class CategoriaDBMongoDAO {

    constructor() {
        this._collection = Categoria;
    };

    obtenerCategoria = async _id => {
        try {
            const categoria = await this._collection.findOne({ _id })
            return categoria;
        } catch (error) {
            console.log('error en obtenerCategoria', error);
        }
    }

    obtenerCategorias = async (limite, desde) => {
        try {
            const query = { estado: true }
            const [total, categorias] = await Promise.all([
                this._collection.countDocuments(query),
                this._collection.find(query)
                    .skip(Number(desde))
                    .limit(Number(limite))
            ])
            return {
                total,
                limite,
                desde,
                categorias
            }

        } catch (error) {
            console.log('error en obtenerProductos', error);
        }
    };

    actualizarCategoria = async (_id, body) => {

        const { nombre } = body;
        try {
            if (nombre) {
                const categoriaDB = await this._collection.findOne({ nombre });
                if (categoriaDB) {
                    return {
                        status: 400,
                        msg: `La Categoria ${categoriaDB.nombre}, ya existe`
                    }
                }
            }

            const categoria = await this._collection.findByIdAndUpdate(id, body, { new: true });
            return {
                status: 200,
                categoria
            };

        } catch (error) {
            console.log('error en actualizarCategoria', error);
            return {
                status: 400,
                msg: `error en actualizarCategoria ${error}`
            };
        }
    }

    guardarCategoria = async categoria => {
        try {
            const { nombre } = categoria;
            const categoriaDB = await this._collection.findOne({ nombre: nombre.toUpperCase() });
            if (categoriaDB) {
                return {
                    status: 400,
                    msg: `La Categoria con el codigo: ${categoriaDB.codigo}, ya existe`
                }
            }

            const categoriaNew = new this._collection({ nombre });
            const categoriaGuardado = await categoriaNew.save();

            return {
                status: 201,
                categoriaGuardado
            };

        } catch (error) {
            console.log('error en guardarCategoria', error);
            return {
                status: 400,
                msg: `error en guardarCategoria ${error}`
            };
        }
    };

    borrarCategoria = async _id => {
        try {
            const categoriaBorrada = await this._collection.deleteOne({ _id });
            return categoriaBorrada;
        } catch (error) {
            console.log('error en borrarCategoria', error);
        }
    };

}