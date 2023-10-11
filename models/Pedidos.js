import mongoose, { Schema } from "mongoose";

const pedidosSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'Clientes'
    },
    pedido: [{
        producto: {
            type: Schema.ObjectId,
            ref: 'Productos'
        },
        cantidad: Number
    }],
    total: {
        type: Number
    }
});

const Pedidos = new mongoose.model('Pedidos',pedidosSchema);

export default Pedidos