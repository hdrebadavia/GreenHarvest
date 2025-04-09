import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProductPage from './components/products/products';
import StoresPage from './components/stores/Stores';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/stores" element={<StoresPage />} />
    </Routes>
  );
}

export default App;
