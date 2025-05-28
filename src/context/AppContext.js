import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')) || null);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const updateCart = (newCart) => setCart(newCart);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password });
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem('loggedInUser', JSON.stringify(response.data.user));
      localStorage.setItem('authToken', response.data.token);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name, email, password, password_confirmation) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        name,
        email,
        password,
        password_confirmation,
      });
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem('loggedInUser', JSON.stringify(response.data.user));
      localStorage.setItem('authToken', response.data.token);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
    setToken(null);
    setCart([]);
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('cart');
  };

  return (
    <AppContext.Provider value={{ cart, updateCart, user, login, logout, register, products, token }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;