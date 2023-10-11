import express from 'express';
import router from './routes/index.js';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import cors from 'cors'; //Cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
import dotenv from 'dotenv';
dotenv.config({path: '.env'});


//Conectar Mongo
connectDB();

//Crear el servidor
const app = express();

//Habilitar bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Definir un dominio(s) para recibir las peticiones
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin);
        //Revisar la petición viene de un servidor que esta en la lista en whitelist
        const existe = whitelist.some(dominio => dominio === origin);
        if (existe) {
            callback(null, true);
        } else {
            callback(new Error('No Permitido por CORS'));
        }
    }
}

//Habilitar cors
app.use(cors(corsOptions));


//Rutas de la app
app.use('/', router);

//Carpeta publica
app.use(express.static('uploads'));

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

//Iniciar App
app.listen(port, host, () =>  {

})

