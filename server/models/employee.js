const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
});

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  reportingManager: {
    type: String,
    required: true,
  },
  leaveHistory: [leaveSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
