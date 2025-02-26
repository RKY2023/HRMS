import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) => {
    return (
      (employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterDepartment === '' || employee.department === filterDepartment)
    );
  });

  return (
    <div>
      <h1>Employee Directory</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or department"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">All Departments</option>
          {/* Add options for each department */}
          {Array.from(new Set(employees.map((employee) => employee.department))).map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold">{employee.name}</h2>
            <p>Department: {employee.department}</p>
            <p>Contact: {employee.contact}</p>
            <p>Reporting Manager: {employee.reportingManager}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDirectory;
