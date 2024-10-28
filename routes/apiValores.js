import { Router } from 'express';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from '../config/conexion.js'; // Asegúrate de que el path sea correcto

const apiValores = Router();

// Inicializa Firestore
const db = getFirestore(firebaseApp);

apiValores.get('/', async (req, res) => {
    try {
        // Obtén la colección "valores"
        const valoresCollection = collection(db, 'valores');
        
        // Obtén los documentos de la colección
        const valoresSnapshot = await getDocs(valoresCollection);
        
        if (valoresSnapshot.empty) {
            return res.status(404).json({ message: 'No se encontraron valores' });
        }

        // Mapea los documentos a un array con los datos
        const valoresList = valoresSnapshot.docs.map(doc => ({
            id: doc.id, // Incluye el ID del documento
            ...doc.data() // Desglosa los datos del documento
        }));
        
        // Envía la lista de valores como respuesta
        res.status(200).json(valoresList);
    } catch (error) {
        console.error("Error al obtener los valores:", error);
        res.status(500).json({ message: 'Error al obtener los valores' });
    }
});

export default apiValores;
