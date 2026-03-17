import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getProducts } from './services/productService';
import ProductList from './components/ProductList';
import AdminDashboard from './components/AdminDashboard';

const MainFeed = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="shopee-loader"></div>
        <style jsx>{`
          .shopee-loader {
            width: 40px;
            height: 40px;
            border: 4px solid #eee;
            border-top: 4px solid var(--primary);
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
      <header className="header">
        <h1>My Shopee Bio</h1>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>Săn deal đỉnh cùng mình nhé! 👇</p>
      </header>
      
      <ProductList products={products} />

      {products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Chưa có sản phẩm nào được cập nhật.</p>
        </div>
      )}
      
      <footer style={{ textAlign: 'center', padding: '40px 0', opacity: 0.5, fontSize: '0.8rem' }}>
        &copy; 2024 Shopee Affiliate Bio Link
      </footer>
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
