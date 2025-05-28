// src/components/Navigation.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navigation = () => {
  const { cart, user, logout } = useContext(AppContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <nav className="navigation" aria-label="Main navigation">
      <Link to="/" className="logo" aria-label="Home">
        <img alt="Company Logo" src="/images/logo.png" />
      </Link>
      <form className="search-box" onSubmit={handleSearch} role="search">
        <input
          type="search"
          placeholder="Search Products"
          aria-label="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        />
        <button type="submit" aria-label="Search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <div className="nav-btns">
        <div className="user-menu">
          <button
            className="nav-user"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            <i className={user ? "fa-solid fa-right-from-bracket" : "fa-regular fa-user"} aria-hidden="true"></i>
            <span className="sr-only">User menu</span>
          </button>
          <div className={`user-dropdown ${isDropdownOpen ? 'show' : ''}`} role="menu">
            {!user && (
              <>
                <Link to="/login" className="" role="menuitem">Login</Link>
                <Link to="/register" className="" role="menuitem">Register</Link>
              </>
            )}
            {user && (
              <button
                onClick={() => {
                  logout();
                  setIsDropdownOpen(false);
                  navigate('/');
                  alert('Logged out successfully.');
                }}
                className=""
                role="menuitem"
              >
                Logout
              </button>
            )}
          </div>
        </div>
        <Link to="/cart" className="nav-cart" aria-label="Shopping cart">
          <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>
          <span className="cart-count" aria-live="polite">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;