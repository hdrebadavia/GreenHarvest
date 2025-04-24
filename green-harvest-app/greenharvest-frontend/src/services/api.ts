import axios from 'axios';
import { Product } from '../interfaces/product.interface';
import { CartItems } from '../interfaces/cart.interface';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // adjust to match your ASP.NET backend
});

export const login = (data: { EmailAddress: string; Password: string }) =>
  api.post('/users/login', data);

export const register = (
    data: {
        FirstName: string;
        MiddleName: string;
        LastName: string;
        EmailAddress: string;
        ContactNumber: string;
        password: string;
        Role: string }) => {
   return api.post(`/users/register`, data);
  };

  export const getUser = (userId: number) => {
    return api.get(`/users/${userId}`);
  };

  // PRODUCTS

  export const getProducts = () => {
    return api.get('/products');
  }

  export const getProductById = (productId: number) => {
    return api.get(`/products/${productId}`);
  }

  export const addProduct = (data: Product) => {
    return api.post('/products', data);
  };

  export const deleteProduct = (productId: number) => {
    return api.delete(`/products/${productId}`);
  }

  export const getProductsByStoreId = (storeId: number) => {
    return api.get(`/products/store/${storeId}`)
  }
  //STORES
  export const getStores = () => {
    return api.get('/stores');
  }

  export const getStoreById = (storeId: number) => {
    return api.get(`/stores/${storeId}`);
  }

  //CART
  export const getCartItems = (userId: number) => {
    return api.get(`/cart/${userId}`);
  }

  export const addCartItem = (data: CartItems) => {
    return api.post(`/cart`, data);
  }