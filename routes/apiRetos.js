import { Router } from 'express';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from '../config/conexion.js'; // Asegúrate de que el path sea correcto

const apiRetos = Router();

// Inicializa Firestore
const db = getFirestore(firebaseApp);

apiRetos.get('/', async (req, res) => {
    try {
        // Obtén la colección "retos"
        const retosCollection = collection(db, 'retos');
        
        // Obtén los documentos de la colección
        const retosSnapshot = await getDocs(retosCollection);
        
        if (retosSnapshot.empty) {
            return res.status(404).json({ message: 'No se encontraron retos' });
        }

        // Mapea los documentos a un array con los datos
        const retosList = retosSnapshot.docs.map(doc => ({
            id: doc.id, // Incluye el ID del documento
            ...doc.data() // Desglosa los datos del documento
        }));
        
        // Envía la lista de retos como respuesta
        res.status(200).json(retosList);
    } catch (error) {
        console.error("Error al obtener los retos:", error);
        res.status(500).json({ message: 'Error al obtener los retos' });
    }
});

export default apiRetos;
