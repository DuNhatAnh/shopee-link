import { collection, getDocs, addDoc, deleteDoc, doc, query } from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION_NAME = "products";

export const getProducts = async () => {
  try {
    console.log("Fetching products...");
    const q = query(collection(db, COLLECTION_NAME));
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Firebase Timeout")), 4000)
    );
    
    const querySnapshot = await Promise.race([getDocs(q), timeoutPromise]);
    
    if (querySnapshot.docs.length === 0) {
      console.log("No products found in Firestore.");
      return [];
    }
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), product);
    return { id: docRef.id, ...product };
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
