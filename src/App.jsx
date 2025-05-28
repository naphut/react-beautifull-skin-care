import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppContext';
import Home from './components/Home';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import Register from './components/Register';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
        <Footer />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;