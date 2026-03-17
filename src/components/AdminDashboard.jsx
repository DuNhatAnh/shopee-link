import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, deleteProduct } from '../services/productService';
import { Trash2, Plus, LogOut, Lock, Package, ExternalLink } from 'lucide-react';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    link: ''
  });

  // Simple password check (user can change this or use env)
  const ADMIN_PASSWORD = "123"; 

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert("Sai mật khẩu!");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image || !newProduct.link) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      setLoading(true);
      await addProduct(newProduct);
      setNewProduct({ name: '', price: '', image: '', link: '' });
      await fetchProducts();
    } catch (error) {
      alert("Lỗi khi thêm sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        setLoading(true);
        await deleteProduct(id);
        await fetchProducts();
      } catch (error) {
        alert("Lỗi khi xóa sản phẩm");
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login-container">
        <div className="glass-morphism login-card">
          <Lock size={48} color="var(--primary)" style={{ marginBottom: '20px' }} />
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Nhập mật khẩu..." 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
            />
            <button type="submit" className="buy-button" style={{ width: '100%', marginTop: '20px' }}>
              Đăng nhập
            </button>
          </form>
        </div>
        <style jsx>{`
          .admin-login-container {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #111;
            padding: 20px;
          }
          .login-card {
            width: 100%;
            max-width: 350px;
            padding: 40px 30px;
            text-align: center;
          }
          .admin-input {
            width: 100%;
            padding: 12px 16px;
            background: rgba(255,255,255,0.05);
            border: 1px solid var(--glass-border);
            border-radius: 8px;
            color: white;
            font-size: 1rem;
            outline: none;
            margin-top: 20px;
          }
          .admin-input:focus {
            border-color: var(--primary);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Quản lý Link Shopee</h1>
        <button onClick={() => setIsLoggedIn(false)} className="logout-btn">
          <LogOut size={20} />
        </button>
      </header>

      <div className="admin-content">
        <section className="glass-morphism admin-card">
          <h3><Plus size={20} style={{ marginRight: '8px' }} /> Thêm sản phẩm mới</h3>
          <form onSubmit={handleAddProduct} className="add-form">
            <input 
              placeholder="Tên sản phẩm" 
              value={newProduct.name}
              onChange={e => setNewProduct({...newProduct, name: e.target.value})}
              className="admin-input"
            />
            <input 
              placeholder="Giá (VD: 150.000đ)" 
              value={newProduct.price}
              onChange={e => setNewProduct({...newProduct, price: e.target.value})}
              className="admin-input"
            />
            <input 
              placeholder="Link ảnh (Tốt nhất là link Unsplash hoặc Shopee)" 
              value={newProduct.image}
              onChange={e => setNewProduct({...newProduct, image: e.target.value})}
              className="admin-input"
            />
            <input 
              placeholder="Link Shopee (Affiliate Link)" 
              value={newProduct.link}
              onChange={e => setNewProduct({...newProduct, link: e.target.value})}
              className="admin-input"
            />
            <button type="submit" disabled={loading} className="buy-button" style={{ marginTop: '20px' }}>
              {loading ? 'Đang lưu...' : 'Lưu sản phẩm'}
            </button>
          </form>
        </section>

        <section className="product-list-section">
          <h3>Danh sách hiện có ({products.length})</h3>
          <div className="product-grid">
            {products.map(product => (
              <div key={product.id} className="glass-morphism product-admin-item">
                <img src={product.image} alt={product.name} />
                <div className="item-details">
                  <h4>{product.name}</h4>
                  <p>{product.price}</p>
                  <div className="actions">
                    <a href={product.link} target="_blank" rel="noreferrer"><ExternalLink size={18} /></a>
                    <button onClick={() => handleDelete(product.id)} className="delete-btn">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .admin-dashboard {
          min-height: 100vh;
          background: #000;
          color: white;
          padding: 20px;
          overflow-y: auto;
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .logout-btn {
          background: none;
          border: none;
          color: #ff4d4d;
          cursor: pointer;
        }
        .admin-content {
          display: flex;
          flex-direction: column;
          gap: 30px;
          max-width: 600px;
          margin: 0 auto;
        }
        .admin-card {
          padding: 20px;
        }
        .add-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .admin-input {
          width: 100%;
          padding: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: white;
        }
        .product-grid {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 15px;
        }
        .product-admin-item {
          display: flex;
          padding: 12px;
          gap: 15px;
          align-items: center;
        }
        .product-admin-item img {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          object-fit: cover;
        }
        .item-details {
          flex: 1;
        }
        .item-details h4 {
          font-size: 0.9rem;
          margin-bottom: 4px;
        }
        .item-details p {
          color: var(--primary);
          font-weight: bold;
          font-size: 0.85rem;
        }
        .actions {
          display: flex;
          gap: 15px;
          margin-top: 8px;
        }
        .actions a { color: #aaa; }
        .delete-btn {
          background: none;
          border: none;
          color: #ff4d4d;
          cursor: pointer;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
