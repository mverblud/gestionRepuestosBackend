import Producto from '../models/productos.js';

export default class ProductoDBMongoDAO {

    constructor() {
        this._collection = Producto;
    };

    obtenerProducto = async _id => {
        try {
            const producto = await this._collection.findOne({ _id })
                .populate('categoria', 'nombre')
            //    .populate('marcaAuto', 'nombre')
            //    .populate('marcaProducto', 'nombre')
            return producto;
        } catch (error) {
            console.log('error en obtenerProducto', error);
        }
    }

    obtenerProductos = async (limite, desde) => {
        try {
            const query = { estado: true }
            const [total, productos] = await Promise.all([
                this._collection.countDocuments(query),
                this._collection.find(query)
                    .populate('categoria', 'nombre')
                    //        .populate('marcaAuto', 'nombre')
                    //        .populate('marcaProducto', 'nombre')
                    .skip(Number(desde))
                    .limit(Number(limite))
            ])
            return {
                total,
                limite,
                desde,
                productos
            }

        } catch (error) {
            console.log('error en obtenerProductos', error);
        }
    };

    actualizarProducto = async (_id, body) => {

        const { codigo } = body;
        try {
            if (codigo) {
                const productoDB = await this._collection.findOne({ codigo: codigo.toUpperCase() });
                if (productoDB) {
                    return {
                        status: 400,
                        msg: `El Producto ${productoDB.codigo}, ya existe`
                    }
                }
            }
            /*             if (marcaProducto) {
                            const esMongoID = TypesObjectId.isValid(marcaProducto);
                            if (esMongoID) {
                                //  Verifico si no existe la marca
                                const existeMarcaProducto = await MarcaProducto.findById({ _id: marcaProducto });
                                if (!existeMarcaProducto) {
                                    return {
                                        status: 400,
                                        msg: `La marca ${marcaProducto}, no existe existe`
                                    }
                                }
                            } else {
                                return {
                                    status: 400,
                                    msg: `No es un un ID válido`
                                }
                            }
                        } 
                        
                if (marcaAuto) {
                    const esMongoID = ObjectId.isValid(marcaAuto);
                    if (esMongoID) {
                        //  Verifico si no existe la marca
                        const existeMarcaAuto = await MarcaAuto.findById({ _id: marcaAuto });
                        if (!existeMarcaAuto) {
                            return res.status(400).json({
                                msg: `La marca ${marcaAuto}, no existe existe`
                            })
                        }
                    } else {
                        return res.status(400).json({
                            msg: `No es un un ID válido`
                        })
                    }
                }
            
                if (categoria) {
                    const esMongoID = ObjectId.isValid(categoria);
                    if (esMongoID) {
                        //  Verifico si no existe la marca
                        const existeCategoria = await Categoria.findById({ _id: categoria });
                        if (!existeCategoria) {
                            return res.status(400).json({
                                msg: `La marca ${categoria}, no existe existe`
                            })
                        }
                    } else {
                        return res.status(400).json({
                            msg: `No es un un ID válido`
                        })
                    }
                }
                        */

            const producto = await this._collection.findByIdAndUpdate(id, body, { new: true });
            return {
                status: 200,
                producto
            };

        } catch (error) {
            console.log('error en actualizarProducto', error);
            return {
                status: 400,
                msg: `error en actualizarProducto ${error}`
            };
        }
    }

    guardarProducto = async producto => {
        const { codigo, nombre, marcaProducto, marcaAuto, categoria, stock, precio, iva, descuento, img } = producto;
        try {

            const productoDB = await this._collection.findOne({ codigo: codigo.toUpperCase() });
            if (productoDB) {
                return {
                    status: 400,
                    msg: `El Producto con el codigo: ${productoDB.codigo}, ya existe`
                }
            }

            //  calculo precios
            let precioIva = 0

            if (precio > 0 && iva > 0) {
                precioIva = ((precio * iva) / 100) + precio
            } else {
                precioIva = precio
            }

            const productoNew = new this._collection({
                codigo: codigo.toUpperCase(),
                nombre: nombre.toUpperCase(),
                marcaProducto,
                marcaAuto,
                categoria,
                stock,
                precio,
                iva,
                precioIva,
                descuento,
                img
            });

            const productoGuardado = await productoNew.save();
            return {
                status: 201,
                productoGuardado
            };

        } catch (error) {
            console.log('error en guardarProducto', error);
            return {
                status: 400,
                msg: `error en guardarProducto ${error}`
            };
        }
    };

    borrarProducto = async _id => {
        try {
            const productoBorrada = await this._collection.deleteOne({ _id });
            return productoBorrada;
        } catch (error) {
            console.log('error en borrarProducto', error);
        }
    };

}