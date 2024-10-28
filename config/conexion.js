import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../keys.js';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseApp = initializeApp(firebaseConfig); // Inicializa la app de Firebase

export const db = getFirestore(firebaseApp); // Exporta la instancia de Firestore
export default firebaseApp;
