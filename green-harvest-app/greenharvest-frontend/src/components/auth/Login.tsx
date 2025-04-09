import { Button, TextField, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { login } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom


const Login = () => {
  const [EmailAddress, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login({ EmailAddress, Password });
      console.log('Logged in!', response.data);

      navigate('/products')
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} maxWidth={300} mx="auto" mt={10}>
      <Typography variant="h5">Login</Typography>
      <TextField label="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
      <Typography variant="body2" textAlign="center" mt={2}>
        Don't have an account? <Link to="/register">Register here</Link>
      </Typography>
    </Box>
  );
};

export default Login;
