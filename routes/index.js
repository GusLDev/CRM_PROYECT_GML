import express from 'express';
import { nuevoCliente, mostrarClientes, mostrarCliente, actualizarCliente, eliminarCliente} from '../controllers/clienteController.js';
import { nuevoProducto, subirArchivo, mostrarProductos, mostrarProducto, actualizarProducto,
         eliminarProducto, buscarProducto} from '../controllers/productoController.js';
import { nuevoPedido, mostrarPedidos, mostrarPedido, actualizarPedido, eliminarPedido, obtenerPedidoPorIdCliente,
         obtenerPedidoPorIdProducto } from '../controllers/pedidosController.js';

import { registrarUsuario, autenticarUsuario} from '../controllers/usuariosController.js';

//Middleware para proteger las rutas
import auth from '../middleware/auth.js';

const router = express.Router();

//*************************************************************************CLIENTES*********************************************

//Agrega nuevos clientes via POST
router.post('/clientes', auth, nuevoCliente);

//Obtener Todos los clientes
router.get('/clientes', auth, mostrarClientes);

//Muestra un cliente en especifico (ID)
router.get('/clientes/:idCliente', auth, mostrarCliente);

//Actualizar cliente
router.put('/clientes/:idCliente', auth, actualizarCliente);

//Eliminar cliente
router.delete('/clientes/:idCliente', auth, eliminarCliente);

//***************************************************************************PRODUCTOS*************************************************

//Agrea nuevos productos
router.post('/productos', auth, subirArchivo,nuevoProducto);

//Obtener Todos los productos
router.get('/productos', auth, mostrarProductos);

//Muestra un producto en especifico
router.get('/productos/:idProducto', auth, mostrarProducto);

//Actualizar Productos
router.put('/productos/:idProducto', auth, subirArchivo,actualizarProducto);

//Eliminar Producto
router.delete('/productos/:idProducto', auth, eliminarProducto);

//Busqueda de Productos
router.get('/productos/busqueda/:query', auth, buscarProducto);

//*********************************************************************PEDIDOS*******************************************************

//Agrega Nuevos Pedidos
router.post('/pedidos', auth, nuevoPedido);

//Mostrar todos los pedidos
router.get('/pedidos', auth, mostrarPedidos);

//Mostrar un pedido por su ID
router.get('/pedidos/:idPedido', auth, mostrarPedido);

//Actualizar un pedido por su ID
router.put('/pedidos/:idPedido', auth, actualizarPedido);

//Eliminar un pedido por su ID
router.delete('/pedidos/:idPedido', auth, eliminarPedido);

// Obtener un pedido por su ID de cliente
router.get('/pedidos/cliente/:idCliente', auth, obtenerPedidoPorIdCliente);

// Obtener un pedido por su ID de producto
router.get('/pedidos/producto/:idProducto', auth,  obtenerPedidoPorIdProducto);

//*********************************************************************USUARIOS*******************************************************
router.post('/crear-cuenta',
            registrarUsuario
);

router.post('/iniciar-sesion',
            autenticarUsuario
);


export default router  
