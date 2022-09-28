import Usuario from "../model/models/usuario.js";
import Producto from "../model/models/productos.js";

const emailExiste = async (email = '') => {

    const existeEmail = await Usuario.findOne({ email })
    if (existeEmail) {
        throw new Error(`El correo: ${correo} ya se encuentra registrado`);
    }
};

const existeProducto = async (id = '') => {
    
    const existeProducto = await Producto.findById({ _id:id });

    if (!existeProducto) {
        throw new Error(`El id no existe ${id}`);
    }

}

export {
    emailExiste,
    existeProducto
};