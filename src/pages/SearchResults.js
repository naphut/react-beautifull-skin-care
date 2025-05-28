// src/pages/SearchResults.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Navigation from '../components/Navigation';

const SearchResults = () => {
  const { products, cart, updateCart, user } = useContext(AppContext);
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('query')?.toLowerCase() || '';
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
  );

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

  return (
    <div>
      <Navigation />
      <section id="new_products">
        <div className="new-p-heading">
          <h3>Search Results for "{query}"</h3>
          <button onClick={() => navigate('/')} aria-label="Clear search results">
            Clear Search
          </button>
        </div>
        <div className="new-product-container">
          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.map(product => (
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
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchResults;