import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('/auth/login', authData);
      const data = response.data;
      if (data.success) {
        alert('Login successful');
        localStorage.setItem('token', data.token);
        navigate('/employee-dashboard');
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert('Login failed: ' + error.response.data.message);
      } else {
        alert('Login failed: ' + error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <button
          onClick={() => navigate('/signup')}
          className="w-full mt-4 text-blue-500 hover:underline"
        >
          Switch to Signup
        </button>
      </div>
    </div>
  );
};

export default Login;
