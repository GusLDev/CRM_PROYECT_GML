import Clientes from '../models/Clientes.js';

//Agrega un nuevo cliente

const nuevoCliente = async (req, res, next) => {
    //Esto se mapea
    const cliente = new Clientes(req.body);

    try {
        //Almacenar el registro
        await cliente.save();
        res.json({ mensaje: 'Se agrego un nuevo cliente' });
    } catch (error) {
        //Si hay un error, console.log y next
        res.send(error);
        next();
    }
}

//Muestra todos los clientes

const mostrarClientes = async (req, res) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
    }
}


//Muestra un cliente

const mostrarCliente = async (req, res) => {
    const { idCliente } = req.params;

    try {

        const cliente = await Clientes.findById(idCliente);
        if (!cliente) {
            res.json({ mensaje: 'Ese cliente no existe' });
            next();
        }

        res.json(cliente);

    } catch (error) {
        console.log(error);
    }
}

//Actualizar un cliente
const actualizarCliente = async (req, res) => {

    const { idCliente } = req.params;
    const { nombre, apellido, empresa, email, telefono } = req.body;

    try {
        const cliente = await Clientes.findByIdAndUpdate(
            idCliente,
            {
                $set: {
                    nombre,
                    apellido,
                    empresa,
                    email,
                    telefono
                },
            },
            { new: true }
        );

        if (!cliente) {
            res.json({ mensaje: 'Ese cliente no existe' });
            next();
        }

        res.json(cliente);
    } catch (error) {
        console.log(error);
    }
}

//Eliminar un cliente por su ID

const eliminarCliente = async (req, res) => {
    const { idCliente } = req.params;  
    try{
        await Clientes.findOneAndDelete({_id : idCliente});
        res.json( {mensaje: 'El cliente se ha eliminado '} );
    }catch(error){
        console.log(error);
    }
}

export {
    nuevoCliente,
    mostrarClientes,
    mostrarCliente,
    actualizarCliente,
    eliminarCliente
}