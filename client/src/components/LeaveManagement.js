import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    const fetchLeaves = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/leaves/all',{
          headers: {
            Authorization: `Bearer ${token}`,
        }});
        
        setLeaves(response.data);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    };

    fetchLeaves();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const leaveData = {
      leaveType,
      startDate,
      endDate,
      reason,
    };

    try {
      const response = await axios.post('/leaves/submit', leaveData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success) {
        alert('Leave request submitted successfully');
        setLeaves([...leaves, response.data.leaveRequest]);
      } else {
        alert('Failed to submit leave request: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error submitting leave request:', error);
      alert('Failed to submit leave request: ' + error.message);
    }
  };

  const events = leaves.map((leave) => ({
    title: `${leave.employeeName} - ${leave.status}`,
    start: new Date(leave.startDate),
    end: new Date(leave.endDate),
    allDay: true,
    resource: leave,
    color: leave.status === 'Approved' ? 'green' : 'orange',
  }));

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color;
    const style = {
      backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style,
    };
  };

  return (
    <div>
      <h1>Leave Management</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700">Leave Type:</label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Earned Leave">Earned Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Paternity Leave">Paternity Leave</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Reason:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Submit Leave Request
        </button>
      </form>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Leave Calendar</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leaves.map((leave) => (
          <div key={leave.id} className="bg-white p-4 rounded shadow-md">
            <p>Employee: {leave.employeeName}</p>
            <p>Start Date: {leave.startDate}</p>
            <p>End Date: {leave.endDate}</p>
            <p>Status: {leave.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveManagement;
