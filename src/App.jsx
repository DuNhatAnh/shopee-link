import React, { useEffect, useState } from 'react';
import { getProducts, addMockProducts } from './services/productService';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await getProducts();
        
        // If no products, add mock data (for first time setup)
        if (data.length === 0) {
          console.log("Adding mock products...");
          await addMockProducts();
          data = await getProducts();
        }
        
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="shopee-loader"></div>
          <p style={{ marginTop: '20px', color: 'var(--primary)', fontWeight: 'bold' }}>Săn deal đỉnh...</p>
        </div>
        <style jsx>{`
          .shopee-loader {
            width: 50px;
            height: 50px;
            border: 5px solid #eee;
            border-top: 5px solid var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
             0% { transform: rotate(0deg); }
             100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="progress-bar" />
      
      <div className="product-feed">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <p>Không có sản phẩm nào.</p>
        </div>
      )}
    </div>
  );
}

export default App;
