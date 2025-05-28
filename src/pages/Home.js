// src/pages/Home.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Navigation from '../components/Navigation';

const Home = () => {
  const { products, cart, updateCart, user } = useContext(AppContext);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    if (!user) {
      alert('Please login to add items to your cart.');
      navigate('/login');
      return;
    }
    const existingItem = cart.find(item => item.title === product.title);
    let newCart;
    if (existingItem) {
      newCart = cart.map(item =>
        item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    updateCart(newCart);
    alert(`${product.title} added to cart!`);
  };

  const filteredProducts = filter === 'all' ? products : products.filter(p => p.category.toLowerCase() === filter);

  return (
    <div>
      <Navigation />
      <main id="main">
        <div className="main-text">
          <span>Beauty</span>
          <h1>Ecommerce <font>Beauty Website</font></h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          <Link to="/">Shop Now</Link>
        </div>
        <div className="main-img">
          <img src="https://assets.boots.com/content/dam/boots/brands/brand---t/the-ordinary/the-ordinary_cp-direct-acids/the-ordinary_cp-direct-acids_2021-09/2021-09_the-ordinary_content-page_direct-acids_33-teaser_how-to-build-a-skincare-regime.dam.ts%3D1631532454891.jpg" alt="Skincare products" />
        </div>
      </main>
      <section id="new_products">
        <div className="new-p-heading">
          <h3>New Products</h3>
          <ul>
            {['all', 'skin', 'makeup', 'nail', 'hair'].map(category => (
              <li
                key={category}
                className={filter === category ? 'active' : ''}
                onClick={() => setFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </li>
            ))}
          </ul>
        </div>
        <div className="new-product-container">
          {filteredProducts.map(product => (
            <div key={product.id} className="new-product-box">
              <div className="new-product-img">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.title} />
                  <span>{product.category}</span>
                </Link>
              </div>
              <div className="new-product-text">
                <Link to={`/product/${product.id}`} className="new-product-title">{product.title}</Link>
                <span>${product.price.toFixed(2)}</span>
                <button
                  className="new-p-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;