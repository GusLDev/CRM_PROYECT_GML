import React from 'react';
import Usuarios from '../models/Usuarios.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const registrarUsuario = async (req, res) => {
    //Leer los datos del usuario y colocarlos en Usuarios
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({ mensaje: 'Usuario Creado Correctamente' });
    } catch (error) {
        console.log("error");
        res.json({ mensaje: 'Hubo Un Error' });
    }
}

const autenticarUsuario = async (req, res, next) => {
    // Buscar el usuario
    const { email, password } = req.body;
    const usuario = await Usuarios.findOne({ email });

    if (!usuario) {
        // Si el usuario no existe
        return res.status(401).json({ mensaje: 'Correo no válido' });
    }

    try {
        // Verificar la contraseña
        if (!bcrypt.compareSync(password, usuario.password)) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Contraseña correcta, firmar el token
        const token = jwt.sign({
            email: usuario.email,
            nombre: usuario.nombre,
            id: usuario.id
        },
            'LLAVESECRETA',
            {
                expiresIn: '1h'
            });

        // Retornar el TOKEN
        res.json({ token });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en la autenticación' });
    }
}



export {
    registrarUsuario,
    autenticarUsuario
}

