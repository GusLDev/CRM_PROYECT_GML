import mongoose, { Schema } from "mongoose";


const productosSchema = new Schema({
    nombre : {
        type: String,
        trim: true
    },
    precio: {
        type: Number
    },
    imagen : {
        type: String
    }
});

const Productos = new mongoose.model('Productos',productosSchema);

export default Productos