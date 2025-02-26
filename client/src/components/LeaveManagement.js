import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('/leaves');
        setLeaves(response.data);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    };

    fetchLeaves();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('reason', reason);
    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      const response = await axios.post('/leaves', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        alert('Leave request submitted successfully');
        setLeaves([...leaves, response.data.leave]);
      } else {
        alert('Failed to submit leave request: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error submitting leave request:', error);
      alert('Failed to submit leave request: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Leave Management</h1>
      <form onSubmit={handleSubmit} className="mb-8">
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
        <div className="mb-4">
          <label className="block text-gray-700">Attachment (optional):</label>
          <input
            type="file"
            onChange={(e) => setAttachment(e.target.files[0])}
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
