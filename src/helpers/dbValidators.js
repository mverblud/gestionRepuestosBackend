import Usuario from "../model/models/usuario.js";
import Producto from "../model/models/productos.js";
import Categoria from "../model/models/categorias.js";
import Carrito from "../model/models/carritos.js";


const emailExiste = async (email = '') => {

    const existeEmail = await Usuario.findOne({ email })
    if (existeEmail) {
        throw new Error(`El email: ${email} ya se encuentra registrado`);
    }
};

const existeProducto = async (id = '') => {

    const existeProducto = await Producto.findById({ _id: id });
    if (!existeProducto) {
        throw new Error(`El id no existe ${id}`);
    }
}

const existeCategoria = async (_id = '') => {

    const existeCategoria = await Categoria.findById({ _id });
    if (!existeCategoria) {
        throw new Error(`El id no existe ${id}`);
    }
}

const existeCarrito = async (_id = '') => {

    const existeCarrito = await Carrito.findById({ _id });
    if (!existeCarrito) {
        throw new Error(`El id no existe ${id}`);
    }
}

const verificarProductos = async (productos = []) => {

    await Promise.all(
        productos.map(async productoId => {
            try {
                const existeProducto = await Producto.findById({ _id: productoId });
                if (!existeProducto) {
                    throw new Error(`El id no existe ${productoId}`);
                }

            } catch (error) {
                throw new Error(`Error al verficar Id Producto`);
            }
        }))
}

export {
    emailExiste,
    existeProducto,
    existeCategoria,
    verificarProductos,
    existeCarrito
};