import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [upcomingLeaves, setUpcomingLeaves] = useState([]);
  const [upcomingShifts, setUpcomingShifts] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    const fetchUpcomingLeaves = async () => {
      try {
        const response = await axios.get('/leaves/upcoming');
        setUpcomingLeaves(response.data);
      } catch (error) {
        console.error('Error fetching upcoming leaves:', error);
      }
    };

    const fetchUpcomingShifts = async () => {
      try {
        const response = await axios.get('/shifts/upcoming');
        setUpcomingShifts(response.data);
      } catch (error) {
        console.error('Error fetching upcoming shifts:', error);
      }
    };

    fetchEmployees();
    fetchUpcomingLeaves();
    fetchUpcomingShifts();
  }, []);

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((employee) => (
          <div key={employee.id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold">{employee.name}</h2>
            <p>Department: {employee.department}</p>
            <p>Contact: {employee.contact}</p>
          </div>
        ))}
      </div>
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
      <h2 className="text-2xl font-bold mt-8">Upcoming Shifts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingShifts.map((shift) => (
          <div key={shift.id} className="bg-white p-4 rounded shadow-md">
            <p>Employee: {shift.employeeName}</p>
            <p>Shift Date: {shift.date}</p>
            <p>Shift Time: {shift.time}</p>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-8">Quick Access</h2>
      <div className="flex justify-around mt-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
          Request Leave
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
          Submit Timesheet
        </button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
