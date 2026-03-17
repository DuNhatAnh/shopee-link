import { collection, getDocs, addDoc, query, orderBy } from "firebase/firestore";
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
    console.log("Fetching products from COLLECTION_NAME:", COLLECTION_NAME);
    const q = query(collection(db, COLLECTION_NAME));
    
    // Add a race with a timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Firebase Timeout")), 5000)
    );
    
    const querySnapshot = await Promise.race([getDocs(q), timeoutPromise]);
    
    console.log("Fetched products count:", querySnapshot.docs.length);
    if (querySnapshot.docs.length === 0) return [];
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching products, using fallback:", error);
    return MOCK_DATA;
  }
};

export const addMockProducts = async () => {
  console.log("Starting to add mock products...");
  try {
    for (const product of MOCK_DATA) {
      const { id, ...productData } = product; // Remove ID for Firestore
      const docRef = await addDoc(collection(db, COLLECTION_NAME), productData);
      console.log("Added doc with ID:", docRef.id);
    }
  } catch (error) {
    console.error("Failed to add mock products:", error);
  }
};
