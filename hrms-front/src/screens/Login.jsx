// screens/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend for authentication
      const response = await axios.post('/api/users/login', { email, password });

      // Check if login was successful and get user role
      const { role } = response.data;

      // Redirect based on user role
      switch (role) {
        case 'Employee':
          navigate('/employee');
          break;
        case 'Payroll':
          navigate('/payroll');
          break;
        case 'HR':
          navigate('/hr');
          break;
        case 'Department':
          navigate('/department');
          break;
        case 'Admin':
          navigate('/adminpanel');
          break;
        default:
          setError('Invalid role');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
