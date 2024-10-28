// Importa los módulos necesarios
import express from 'express'; // Framework para crear aplicaciones web en Node.js
import cors from 'cors'; // Middleware para permitir solicitudes desde otros dominios (Cross-Origin Resource Sharing)
import dotenv from 'dotenv'; // Carga las variables de entorno desde un archivo .env
import cookieParser from 'cookie-parser'; // Middleware para manejar cookies

// Importa las rutas personalizadas para la API
import apiRetos from './routes/apiRetos.js';
import apiSubirInfo from './routes/apiSubirInfo.js';
import apiValores from './routes/apiValores.js';

// Configura el uso de variables de entorno
dotenv.config();

// Define el puerto donde el servidor escuchará (usando una variable de entorno o el puerto 3000 por defecto)
const port = process.env.PORT || 3000;

// Crea la aplicación de Express
const app = express();

// Middleware para interpretar JSON en las solicitudes
app.use(express.json());
// Middleware para interpretar datos de formularios (urlencoded) en las solicitudes
app.use(express.urlencoded({ extended: true }));
// Middleware para permitir solicitudes desde otros dominios
app.use(cors());
// Middleware para manejar cookies en las solicitudes
app.use(cookieParser());

// Rutas para manejar las solicitudes HTTP
app.use('/crearRegistro', apiSubirInfo); // Ruta para subir información
app.use('/obtenerRetos', apiRetos); // Ruta para obtener retos
app.use('/obtenerValores', apiValores); // Ruta para obtener valores

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Server running on port ${port}`); // Mensaje en consola cuando el servidor está activo
});
