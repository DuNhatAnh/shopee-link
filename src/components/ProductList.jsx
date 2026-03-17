import React from 'react';
import { ExternalLink, Tag } from 'lucide-react';

const ProductList = ({ products }) => {
  const handleProductClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <a
          key={product.id}
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="product-card"
          onClick={(e) => {
            // Optional: Handle analytics or custom logic here
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="product-card-image"
          />
          <div className="product-card-info">
            <h3 className="product-name">{product.name}</h3>
            <div className="product-meta">
              <span className="product-price">{product.price}</span>
              {product.code && (
                <span className="product-code">
                  <Tag size={10} style={{ marginRight: '3px' }} />
                  {product.code}
                </span>
              )}
            </div>
          </div>
          <div style={{ paddingRight: '15px', display: 'flex', alignItems: 'center', color: '#ccc' }}>
            <ExternalLink size={20} />
          </div>
        </a>
      ))}
    </div>
  );
};

export default ProductList;