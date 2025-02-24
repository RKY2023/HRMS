import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
return (
    <nav style={{ backgroundColor: '#333', padding: '1rem' }}>
        <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around', margin: 0, padding: 0 }}>
            <li><Link to="/employee-dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link></li>
            <li><Link to="/employee" style={{ color: '#fff', textDecoration: 'none' }}>Employee</Link></li>
            <li><Link to="/leave-management" style={{ color: '#fff', textDecoration: 'none' }}>Leave Management</Link></li>
        </ul>
    </nav>
);
};

export default NavBar;
