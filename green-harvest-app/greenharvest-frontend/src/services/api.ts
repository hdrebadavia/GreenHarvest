import axios from 'axios';

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

  export const getProducts = () => {
    return api.get('/products');
  }