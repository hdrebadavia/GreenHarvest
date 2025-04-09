import { Button, TextField, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { register } from '../../services/api';

const Register = () => {
    const [FirstName, setFirstName] = useState('');
    const [MiddleName, setMiddleName] = useState('');
    const [LastName, setLastName] = useState('');
    const [EmailAddress, setEmailAddress] = useState('');
    const [ContactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');
    const Role = 'Customer';
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
    
        try {
          const response = await register({
            FirstName,
            MiddleName,
            LastName,
            EmailAddress,
            ContactNumber,
            password,
            Role
            });
          console.log('Registration successful!', response.data);
          alert('Registration successful!');
        } catch (error) {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        }
      };

  return (
    <Box display="flex" flexDirection="column" gap={2} maxWidth={400} mx="auto" mt={10}>
      <Typography variant="h5" textAlign="center">Register</Typography>
      <TextField
        label="First Name"
        type="text"
        value={FirstName}
        onChange={(e) => setFirstName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Middle Name"
        type="text"
        value={MiddleName}
        onChange={(e) => setMiddleName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Last Name"
        type="text"
        value={LastName}
        onChange={(e) => setLastName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Email Address"
        type="email"
        value={EmailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
        fullWidth
      />
      <TextField
        label="Contact Number"
        type="text"
        value={ContactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleRegister} fullWidth>
        Register
      </Button>
    </Box>
  );
};

export default Register;
