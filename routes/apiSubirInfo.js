import { Router } from 'express';
import { db } from '../config/conexion.js'; // Asegúrate de importar la conexión a Firestore
import { collection, addDoc } from 'firebase/firestore/lite';

const apiSubirInfo = Router();

apiSubirInfo.post('/', async (req, res) => {
    try {
        // Obtén la colección "informacion"
        const infoCollection = collection(db, 'informacion');

        // Recibe la información desde el cuerpo de la petición
        const newInfo = {
            direccion: req.body.direccion,
            edad: req.body.edad,
            estado: req.body.estado,
            foto: req.body.foto,
            kilometros: req.body.kilometros,
            nombre: req.body.nombre,
            sexo: req.body.sexo,
            telefono: req.body.telefono,
            tiposangre: req.body.tiposangre
        };

        // Verifica que se reciban todos los campos requeridos
        if (!newInfo.nombre || !newInfo.telefono) {
            return res.status(400).json({ message: 'El nombre y teléfono son obligatorios' });
        }
        
        // Agrega un nuevo documento a la colección "informacion"
        await addDoc(infoCollection, newInfo);

        // Responde con éxito
        res.status(200).json({ message: 'Información subida exitosamente' });
    } catch (error) {
        console.error("Error al subir la información:", error);
        res.status(500).json({ message: 'Error al subir la información' });
    }
});

export default apiSubirInfo;
