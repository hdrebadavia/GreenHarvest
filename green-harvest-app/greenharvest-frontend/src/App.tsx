import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProductPage from './components/products/products';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ViewProduct from './components/products/view-product';
import Stores from './components/admin/stores';
import AdminLayout from './components/shared/admin-layout';
import Orders from './components/orders/orders';


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

      <Route path="/stores" element={
        <ProtectedRoute>
          <Stores />
        </ProtectedRoute>
      } />

      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      } />

      <Route path="/orders" element={
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
