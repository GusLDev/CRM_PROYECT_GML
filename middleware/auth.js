import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    //Autorización por el header
    const authHeader = req.get('Authorization');

    if(!authHeader){
        console.log(error);
    }

    //Obtener el token y verificarlo
    //Bearer: TOKEN
    const token = authHeader.split(' ')[1];
    let revisarToken;
    try {
        revisarToken = jwt.verify(token, 'LLAVESECRETA');
    } catch(error) {
        console.log(error);
    }

    //Si es un token valido, pero hay algun error
    //Como por ejemplo que el token expire
    if(!revisarToken){
        const error = new Error('No Autenticado');
        console.log(error);
    }

    next();
}

export default auth