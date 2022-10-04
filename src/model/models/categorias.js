import mongoose from "mongoose";

const categoriaSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            unique: true,
            trim : true,
            uppercase : true
        },
        estado: {
            type: Boolean,
            required: [true],
            default: true,
        },
        habilitado: {
            type: Boolean,
            required: [true],
            default: true,
        }
    },
    {
        timestamps: true
    }
);

const Categoria = mongoose.model("Categoria", categoriaSchema);
export default Categoria;