// src/pages/ProductDetails.js
import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Navigation from '../components/Navigation';

const ProductDetails = () => {
  const { products, cart, updateCart, user } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const product = products.find(p => p.id == id);

  const handleAddToCart = () => {
    if (!user) {
      alert('Please login to add items to your cart.');
      navigate('/login');
      return;
    }
    const existingItem = cart.find(item => item.title === product.title);
    let newCart;
    if (existingItem) {
      newCart = cart.map(item =>
        item.title === product.title ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      newCart = [...cart, { ...product, quantity }];
    }
    updateCart(newCart);
    alert(`${product.title} added to cart!`);
  };

  if (!product) {
    return (
      <div>
        <Navigation />
        <section id="product_details">
          <p>Product Not Found</p>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <section id="product_details">
        <div className="d-product-img">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="d-product-text">
          <span className="category">{product.category}</span>
          <strong>{product.title}</strong>
          <p>High-quality {product.category.toLowerCase()} product designed for women.</p>
          <span className="price">${product.price.toFixed(2)}</span>
          <div className="quantity">
            <span>Quantity:</span>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
          </div>
          <a href="#" onClick={handleAddToCart}>Add to Cart</a>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;