import { collection, getDocs, addDoc, deleteDoc, doc, query } from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION_NAME = "products";

const MOCK_DATA = [
  {
    id: "1",
    name: "Áo thun Shopee Local Brand",
    price: "150.000đ",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000",
    link: "https://shopee.vn"
  },
  {
    id: "2",
    name: "Tai nghe Bluetooth không dây",
    price: "299.000đ",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000",
    link: "https://shopee.vn"
  },
  {
    id: "3",
    name: "Bình giữ nhiệt 500ml",
    price: "85.000đ",
    image: "https://images.unsplash.com/photo-1602143399827-bd95967c7967?auto=format&fit=crop&q=80&w=1000",
    link: "https://shopee.vn"
  }
];

export const getProducts = async () => {
  try {
    console.log("Fetching products...");
    const q = query(collection(db, COLLECTION_NAME));
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Firebase Timeout")), 4000)
    );
    
    const querySnapshot = await Promise.race([getDocs(q), timeoutPromise]);
    
    if (querySnapshot.docs.length === 0) {
      console.log("No products found in Firestore, using mock fallback.");
      return MOCK_DATA;
    }
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching products, using fallback:", error);
    return MOCK_DATA;
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
