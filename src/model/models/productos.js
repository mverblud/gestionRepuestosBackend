import mongoose from "mongoose";

const productoSchema = mongoose.Schema(
    {
        codigo: {
            type: String,
            required: [true, 'El codigo es obligatorio'],
            trim : true,
            uppercase : true
        },
        nombre: {
            type: String,
            required: [true, 'El Nombre es obligatorio'],
            trim : true,
            uppercase : true
        },
        marcaProducto: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'MarcaProducto'    
        },
        marcaAuto: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'MarcaAuto'    
        },
        categoria: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Categoria'    
        },
        stock: {
            type: Number,
            default: 0
        },
        descripcion: { 
            type: String,
            trim : true, 
        },
        img: {
            type: String,
            default: ''
        },
        precio: {
            type: Number,
            default: 0
        },
        iva: {
            type: Number,
            default: 0    
        },
        precioIva: {
            type: Number,
            default: 0    
        },
        descuento: {
            type: Number,
            default: 0    
        },
        precioFinal: {
            type: Number,
            default: 0    
        },
        habilitado: {
            type: Boolean,
            default: true    
        },
        estado: {
            type: Boolean,
            required: [true],
            default: true,
        },
        img: [{
            type: String,
            default: ''
        }]
    },
    {
        timestamps: true
    }
);

const Producto = mongoose.model("Producto", productoSchema);
export default Producto;