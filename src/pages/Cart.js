// src/pages/Cart.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Navigation from '../components/Navigation';

const Cart = () => {
  const { cart, updateCart, user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const newCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    updateCart(newCart);
  };

  const handleRemoveItem = (index) => {
    const itemTitle = cart[index].title;
    const newCart = cart.filter((_, i) => i !== index);
    updateCart(newCart);
    alert(`${itemTitle} removed from cart.`);
  };

  const handleCheckout = () => {
    if (!user) {
      alert('Please login to proceed to checkout.');
      navigate('/login');
    } else if (cart.length === 0) {
      alert('Your cart is empty.');
    } else {
      alert('Proceeding to checkout... (Implement checkout logic here)');
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <Navigation />
      <section id="cart" aria-labelledby="cart-heading">
        <h1>Your Shopping Cart</h1>
        <div className="cart-container" role="region" aria-live="polite">
          {cart.length === 0 ? (
            <p>No items in the cart yet.</p>
          ) : (
            <div>
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.title} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>
                      Quantity:
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                        aria-label={`Quantity for ${item.title}`}
                      />
                    </p>
                    <button
                      onClick={() => handleRemoveItem(index)}
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div>
                <h3>Total: ${total.toFixed(2)}</h3>
                <button onClick={handleCheckout} role="button">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
        <Link to="/" role="button">Continue Shopping</Link>
      </section>
    </div>
  );
};

export default Cart;