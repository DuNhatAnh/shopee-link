import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, deleteProduct } from '../services/productService';
import { Trash2, Plus, LogOut, Lock, LayoutDashboard, ExternalLink, Tag } from 'lucide-react';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    code: '',
    price: '',
    image: '',
    link: ''
  });

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
      setNewProduct({ name: '', code: '', price: '', image: '', link: '' });
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
        alert("Lỗi khi xóa sản phẩm: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login-container" style={{ background: '#fff', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ width: '100%', maxWidth: '350px', textAlign: 'center' }}>
          <Lock size={40} color="var(--primary)" style={{ marginBottom: '20px' }} />
          <h2 style={{ marginBottom: '10px' }}>Admin Access</h2>
          <p style={{ color: '#666', marginBottom: '30px', fontSize: '0.9rem' }}>Vui lòng nhập mật khẩu quản trị</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Mật khẩu" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              autoFocus
            />
            <button type="submit" className="buy-button" style={{ width: '100%', marginTop: '10px' }}>
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard" style={{ background: '#f8f8f8', minHeight: '100vh', padding: '20px' }}>
      <header style={{ maxWidth: '600px', margin: '0 auto 30px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center' }}>
          <LayoutDashboard size={20} style={{ marginRight: '10px' }} />
          Quản trị Link
        </h1>
        <button onClick={() => setIsLoggedIn(false)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}>
          <LogOut size={20} />
        </button>
      </header>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: 'var(--shadow)', marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '20px', fontSize: '1rem', display: 'flex', alignItems: 'center' }}>
            <Plus size={18} style={{ marginRight: '8px' }} /> Thêm Link Shopee
          </h3>
          <form onSubmit={handleAddProduct}>
            <input 
              placeholder="Tên sản phẩm" 
              value={newProduct.name}
              onChange={e => setNewProduct({...newProduct, name: e.target.value})}
              className="admin-input"
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input 
                placeholder="Mã SP (VD: MS-01)" 
                value={newProduct.code}
                onChange={e => setNewProduct({...newProduct, code: e.target.value})}
                className="admin-input"
              />
              <input 
                placeholder="Giá (VD: 150.000đ)" 
                value={newProduct.price}
                onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                className="admin-input"
              />
            </div>
            <input 
              placeholder="Link hình ảnh" 
              value={newProduct.image}
              onChange={e => setNewProduct({...newProduct, image: e.target.value})}
              className="admin-input"
            />
            <input 
              placeholder="Link Shopee (Link rút gọn/Affiliate)" 
              value={newProduct.link}
              onChange={e => setNewProduct({...newProduct, link: e.target.value})}
              className="admin-input"
            />
            <button type="submit" disabled={loading} className="buy-button" style={{ width: '100%', marginTop: '10px' }}>
              {loading ? 'Đang thực hiện...' : 'Cập nhật lên trang chủ'}
            </button>
          </form>
        </div>

        <div>
          <h3 style={{ marginBottom: '15px', fontSize: '1rem' }}>Sản phẩm hiện có ({products.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {products.map(product => (
              <div key={product.id} style={{ background: '#fff', padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '15px', border: '1px solid #eee' }}>
                <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', borderRadius: '6px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.85rem', marginBottom: '2px' }}>{product.name}</h4>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.8rem' }}>{product.price}</span>
                    <span style={{ fontSize: '0.7rem', color: '#999', display: 'flex', alignItems: 'center' }}><Tag size={10} style={{marginRight: '3px'}} />{product.code || 'N/A'}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a href={product.link} target="_blank" rel="noreferrer" style={{ color: '#ccc' }}><ExternalLink size={18} /></a>
                  <button onClick={() => handleDelete(product.id)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', padding: 0 }}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
