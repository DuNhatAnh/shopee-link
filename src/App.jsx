import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getProducts } from './services/productService';
import ProductCard from './components/ProductCard';
import AdminDashboard from './components/AdminDashboard';

const MainFeed = ({ products, loading }) => {
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
};

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainFeed products={products} loading={loading} />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
