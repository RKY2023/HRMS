import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [upcomingLeaves, setUpcomingLeaves] = useState([]);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/auth/employeeDetails', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    const fetchUpcomingLeaves = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/leaves/upcoming',{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUpcomingLeaves(response.data);
      } catch (error) {
        console.error('Error fetching upcoming leaves:', error);
      }
    };

    fetchEmployeeDetails();
    fetchUpcomingLeaves();
  }, []);

  const handleLeaveRequest = () => {
    navigate('/leave-management');
  };

  return (
    <div>
      {employee && (
        <div className="bg-white p-4 rounded shadow-md mb-4">
          <h2 className="text-xl font-bold">{employee.name}</h2>
          <p>Email: {employee.email}</p>
          <p>Department: {employee.department}</p>
          <p>Contact: {employee.contact}</p>
          <p>Reporting Manager: {employee.reportingManager}</p>
        </div>
      )}
      <h2 className="text-2xl font-bold mt-8">Upcoming Leaves</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingLeaves.map((leave) => (
          <div key={leave.id} className="bg-white p-4 rounded shadow-md">
            <p>Employee: {leave.employeeName}</p>
            <p>Start Date: {leave.startDate}</p>
            <p>End Date: {leave.endDate}</p>
          </div>
        ))}
      </div>
      
      <h2 className="text-2xl font-bold mt-8">Quick Access</h2>
      <div className="flex justify-around mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          onClick={handleLeaveRequest}
        >
          Request Leave
        </button>

      </div>
    </div>
  );
};

export default EmployeeDashboard;
