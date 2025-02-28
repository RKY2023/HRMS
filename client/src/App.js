import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeDashboard from './components/EmployeeDashboard';
import NavBar from './components/NavBar';
import Home from './components/Home';
import LeaveManagement from './components/LeaveManagement';
import EmployeeDirectory from './components/EmployeeDirectory';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className='text-7xl text-center text-blue-400 '>HRMS</h1>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/leave-management" element={<LeaveManagement />} />
          <Route path="/employee-directory" element={<EmployeeDirectory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
