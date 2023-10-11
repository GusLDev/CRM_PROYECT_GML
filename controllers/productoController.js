import multer from 'multer';
import shortid from 'shortid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Productos from '../models/Productos.js';
import path from 'path';
import { unlink } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rutaUploads = path.join(__dirname, '../uploads');

const configuracionMulter = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, rutaUploads);
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato No Válido'));
        }
    }
};

const upload = multer(configuracionMulter).single('imagen');

//Sube un archivo
const subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error });
        }
        return next();
    })
}


//Agrega un nuevo Producto

const nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);
    try {
        if (req.file.filename) {
            producto.imagen = req.file.filename;
        }

        await producto.save();
        res.json({ mensaje: 'Se Agrego un nuevo producto' });
    } catch (error) {
        console.log('error en agregar nuevo producto');
    }
}


//Muestra todos los productos
const mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
    }
}

//Muestra un producto en especifico
const mostrarProducto = async (req, res, next) => {
    const { idProducto } = req.params;

    try {

        const producto = await Productos.findById(idProducto);
        if (!producto) {
            res.json({ mensaje: 'Ese Producto no existe' });
            return next();
        }

        res.json(producto);

    } catch (error) {
        console.log(error);
    }
}


//Actualizar un producto por ID
const actualizarProducto = async (req, res, next) => {
    try {
        const { idProducto } = req.params;
        let producto = await Productos.findById(idProducto);

        //Contruir el nuevo producto que tendremos
        let nuevoProducto = req.body;

        //Verficiamos si hay una nueva imagen
        if (req.file) {
            nuevoProducto.imagen = req.file.filename;
            const borrarRuta = path.join(__dirname, '../uploads');
            await unlink(`${borrarRuta}/${producto.imagen}`);
        } else {
            //Buscar el producto a modificar
            nuevoProducto.imagen = producto.imagen;
        }

        let productoActualizado = await Productos.findOneAndUpdate({ _id: idProducto }, nuevoProducto, {
            new: true
        });


        res.json(productoActualizado);

    } catch (error) {
        console.log(error);
        next();
    }
}

//Eliminar un producto por ID
const eliminarProducto = async (req, res) => {
    const { idProducto } = req.params;
    try {
        await Productos.findOneAndDelete({ _id: idProducto });
        res.json({ mensaje: 'El Producto se ha eliminado ' });
    } catch (error) {
        console.log(error);
    }
}

const buscarProducto = async (req, res, next) => {
    //Obtener el query
    try {
        const { query } = req.params;
        const producto = await Productos.find({ nombre: new RegExp(query, 'i') });
        //i significa Insensible a mayusculas y minisculas
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }

}

export {
    nuevoProducto,
    subirArchivo,
    mostrarProductos,
    mostrarProducto,
    actualizarProducto,
    eliminarProducto,
    buscarProducto
}