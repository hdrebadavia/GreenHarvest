import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProductPage from './components/products/products';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ViewProduct from './components/products/view-product';

function App() {
  const hasSessionToken = !!sessionStorage.getItem('authToken')
  return (
    <Routes>
      {/* Login Route: Only accessible if NOT logged in */}
      <Route
        path="/"
        element={hasSessionToken ? <Navigate to="/products" replace /> : <Login />}
      />

      {/* Register Route: Often also restricted if logged in */}
      <Route
        path="/register"
        element={hasSessionToken ? <Navigate to="/products" replace /> : <Register />}
      />

      {/* Protected Routes: Require login */}
      <Route path="/products" element={
        <ProtectedRoute>
          <ProductPage />
        </ProtectedRoute>
      } />
      <Route path="/products/:productId" element={
           <ViewProduct/>
      } />
    </Routes>
  );
}

export default App;
