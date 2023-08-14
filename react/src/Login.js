
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://localhost:7044/api/User/login', {
        Username: username,
        Password: password,
      });
      console.log(response.data.message);
      if (response.data.message === 'Login successful!') {
        setError('');
        onLogin(); 
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred while logging in.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleFormSubmit(event);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <div className="error">{error}</div>}
      <form className="login-form" onSubmit={handleFormSubmit}>
        <div>
          <label >Username:</label>
          <input
            className='info-user'
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label > Password:</label>
          <input
            className='info-pw'
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
