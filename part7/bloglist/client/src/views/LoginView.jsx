import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import useNotification from '../hooks/useNotification';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';

const LoginView = () => {
  const { login } = useAuth();
  const showNotification = useNotification();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login({ username, password });
      showNotification({ message: 'Successfully logged in', type: 'success' });
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.error(exception);
      showNotification({ message: 'Wrong credentials', type: 'error' });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ marginTop: 8, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Log in to application
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginView;
