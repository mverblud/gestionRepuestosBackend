import Usuario from "../model/models/usuario.js";
import Producto from "../model/models/productos.js";
import Categoria from "../model/models/categorias.js";

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

export {
    emailExiste,
    existeProducto,
    existeCategoria
};