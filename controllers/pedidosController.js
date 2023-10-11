import Pedidos from "../models/Pedidos.js";


//Agregar nuevo pedido
const nuevoPedido = async (req, res, next) => {

    const pedido = new Pedidos(req.body);

    try {
        await pedido.save();
        res.json({ mensaje: 'Se agregó un nuevo pedido' });
    } catch (error) {
        console.log(error);
        next();
    }
}


//Mostrar todos los pedidos
const mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }

}

//Muestra un pedido por su ID
const mostrarPedido = async (req, res, next) => {
    const { idPedido: id } = req.params;
    try {
        const pedido = await Pedidos.findById(id).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        if (!pedido) {
            res.json({ mensaje: 'Ese pedido no existe' });
            return next();
        }

        res.json(pedido);

    } catch (error) {
        console.log(error);
        next();
    }
}

//Actualizar pedidos
const actualizarPedido = async (req, res, next) => {
    const { idPedido: id } = req.params;
    try {
        let pedido = await Pedidos.findOneAndUpdate({ _id: id }, req.body, {
            new: true
        }).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedido);

    } catch (error) {
        console.log(error);
        next();
    }
}

//Eliminar pedido
const eliminarPedido = async (req, res, next) => {
    const { idPedido: id } = req.params;
    try {
        await Pedidos.findByIdAndDelete(id);
        res.json({mensaje: 'Se ha eliminado Correctamente el pedido'});
    } catch (error) {
        console.log(error);
        next();
    }
}

const obtenerPedidoPorIdCliente = async (req, res) => {
    const { idCliente: cliente } = req.params;
    try{
        const pedido = await Pedidos.find({ cliente });
        if(pedido.length > 0){
            res.json({message: true});
        } else {
            res.json({message: false});
        }

    }catch(error){
        console.log(error);
        next();
    }
}

const obtenerPedidoPorIdProducto = async (req, res, next) => {
    const { idProducto } = req.params;

    try{
        const pedido = await Pedidos.find({ 'pedido.producto': idProducto });
        if(pedido.length > 0){
            res.json({message: true});
        } else {
            res.json({message: false});
        }

    }catch(error){
        console.log(error);
        next();
    }
}


export {
    nuevoPedido,
    mostrarPedidos,
    mostrarPedido,
    actualizarPedido,
    eliminarPedido,
    obtenerPedidoPorIdCliente,
    obtenerPedidoPorIdProducto
}