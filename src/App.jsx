import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getProducts } from './services/productService';
import ProductList from './components/ProductList';
import AdminDashboard from './components/AdminDashboard';
import { Search, X } from 'lucide-react';

const MainFeed = ({ products, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase();
    const matchesName = product.name?.toLowerCase().includes(searchLower);
    const matchesCode = product.code?.toLowerCase().includes(searchLower);
    return matchesName || matchesCode;
  });

  return (
    <div className="app-container">
      <header className="header">
        <h1>My Shopee Bio</h1>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>Săn deal đỉnh cùng mình nhé! 👇</p>
      </header>
      
      <div className="search-container">
        <div className="search-wrapper">
          <div className="search-icon">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            className="search-input"
            placeholder="Tìm theo tên hoặc mã SP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <X size={12} />
            </button>
          )}
        </div>
      </div>
      
      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} />
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Search size={48} strokeWidth={1} />
          </div>
          <p className="empty-state-text">Không tìm thấy sản phẩm nào phù hợp.</p>
          {searchTerm && (
            <button className="reset-search-btn" onClick={() => setSearchTerm('')}>
              Xem tất cả sản phẩm
            </button>
          )}
        </div>
      )}

      {products.length === 0 && !searchTerm && (
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
