import { Button, TextField, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { getUser, login } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { userService } from '../../services/user.service';


const Login = () => {
  const [EmailAddress, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login({ EmailAddress, Password });
      console.log('Logged in!', response.data);

      const { token, user } = response.data;
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('user', user.id);
      sessionStorage.setItem('role', user.role);


      userService.setUserDetails(user);
      if (user.role === 'Customer') {
        navigate('/products');
      } else if (user.role === 'Admin') {
        navigate('/admin');
      } else {
        console.error('Unknown user role:', user.role);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <div className="w-25">
        <div className="text-center">
            <img
            src="/src/assets/GreenHarvest Logo - Transparent.png"
            alt="Logo"
            style={{
              maxWidth:"70%",
              height:"auto",
              transition: 'transform 0.2s',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}

          />
        </div>

        <div className="card p-2">
          <div className="card-body">
            <h2 className="card-title mb-4">Login</h2>
                      {/* Email Input */}
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="name@example.com" // Optional: Add a placeholder
                onChange={(e) => setEmail(e.target.value)}
                value={EmailAddress} // Keep it a controlled component
              />
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label htmlFor="passwordInput" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                onChange={(e) => setPassword(e.target.value)}
                value={Password} // Keep it a controlled component
              />
            </div>

            {/* Login Button - Using d-grid for potentially better full-width behavior */}
            <div className="d-grid gap-2 mb-3">
              <button className="btn btn-primary" type="button" onClick={handleLogin}>
                Login
              </button>
            </div>
            {/* Alternative simple button (might not be full width depending on container):
            <button className="btn btn-primary mb-3" type="button" onClick={handleLogin}>Login</button>
            */}


            {/* Registration Link */}
            <p className="text-center mt-2">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>

          </div>
        </div>
      </div>

    </div>

  );
};

export default Login;
