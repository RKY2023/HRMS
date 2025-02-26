import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
    } else {
      navigate('/employee-dashboard');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to HRMS</h1>
    </div>
  );
};

export default Home;
