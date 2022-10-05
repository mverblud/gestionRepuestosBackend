import mongoose from "mongoose";

const carritoSchema = mongoose.Schema(
    {
        productos: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Producto'
        }],
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Usuario'
        },
        estado: {
            type: String,
            required: true,
            enum: ['ACTIVO', 'CANCELADO'],
            default: 'ACTIVO'
        },
    },
    {
        timestamps: true
    }
);

const Carrito = mongoose.model("Carrito", carritoSchema);
export default Carrito;