import React, { useState } from 'react';
import { Heart, Share2, MessageCircle, ShoppingBag, Music2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);

  const handleBuyNow = () => {
    window.open(product.link, '_blank');
  };

  return (
    <div className="product-item">
      {/* Media Background */}
      <img 
        src={product.image} 
        alt={product.name} 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        loading="lazy"
      />
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay" />

      {/* Right Sidebar */}
      <div style={{
        position: 'absolute',
        right: '12px',
        bottom: '100px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        zIndex: 20,
        alignItems: 'center'
      }}>
        <motion.div whileTap={{ scale: 0.8 }} onClick={() => setLiked(!liked)}>
          <Heart 
            size={32} 
            fill={liked ? "var(--primary)" : "none"} 
            color={liked ? "var(--primary)" : "white"} 
          />
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>1.2k</span>
        </motion.div>
        
        <motion.div whileTap={{ scale: 0.8 }}>
          <MessageCircle size={32} color="white" />
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>45</span>
        </motion.div>
        
        <motion.div whileTap={{ scale: 0.8 }}>
          <Share2 size={32} color="white" />
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Share</span>
        </motion.div>

        <div className="spinning-disc" style={{ marginTop: '10px' }}>
          <Music2 size={24} color="white" />
        </div>
      </div>

      {/* Bottom Info */}
      <div style={{
        position: 'absolute',
        left: '16px',
        bottom: '30px',
        right: '80px',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '4px' }}>
            {product.name}
          </h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: 'bold' }}>
            {product.price}
          </p>
        </div>

        <button className="buy-button" onClick={handleBuyNow}>
          <ShoppingBag size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          Mua ngay trên Shopee
        </button>
      </div>

      <style jsx>{`
        .spinning-disc {
          width: 40px;
          height: 40px;
          background: #333;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid #111;
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
