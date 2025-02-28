const LeaveRequest = require('../models/leaveRequest');
const Employee = require('../models/employee');

const leaveController = {
  submitLeaveRequest: async (req, res) => {
    try {
      const { leaveType, startDate, endDate, reason } = req.body;
      const employeeId = req.employee._id;

      // Validate dates
      if (new Date(startDate) > new Date(endDate)) {
        return res.status(400).json({ message: 'End date must be after start date' });
      }

      // Check available leave balance (assuming a simple balance check for demonstration)
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      // Assuming each employee has a fixed number of leaves per year
      const availableLeaves = 20; // Example value
      const usedLeaves = employee.leaveHistory.filter(leave => leave.status === 'Approved').length;
      if (usedLeaves >= availableLeaves) {
        return res.status(400).json({ message: 'Insufficient leave balance' });
      }

      // Create leave request
      const leaveRequest = new LeaveRequest({
        employeeId,
        leaveType,
        startDate,
        endDate,
        reason,
      });

      await leaveRequest.save();
      res.status(201).json({ success: true, leaveRequest });
    } catch (err) {
      console.error('Error submitting leave request:', err);
      res.status(500).json({ status: err?.status || 500, message: err?.message || err });
    }
  },

  getUpcomingLeaves: async (req, res) => {
    try {
      const upcomingLeaves = await LeaveRequest.find({
        startDate: { $gte: new Date() },
      }).populate('employeeId', 'name');

      const formattedLeaves = upcomingLeaves.map(leave => ({
        ...leave._doc,
        startDate: leave.startDate.toISOString().split('T')[0],
        endDate: leave.endDate.toISOString().split('T')[0],
        employeeName: leave.employeeId.name,
      }));

      res.status(200).json(formattedLeaves);
    } catch (err) {
      console.error('Error fetching upcoming leaves:', err);
      res.status(500).json({ status: err?.status || 500, message: err?.message || err });
    }
  },

  getAllLeaves: async (req, res) => {
    try {
      const allLeaves = await LeaveRequest.find().populate('employeeId', 'name');

      const formattedLeaves = allLeaves.map(leave => ({
        ...leave._doc,
        startDate: leave.startDate.toISOString().split('T')[0],
        endDate: leave.endDate.toISOString().split('T')[0],
        employeeName: leave.employeeId.name,
      }));

      res.status(200).json(formattedLeaves);
    } catch (err) {
      console.error('Error fetching all leaves:', err);
      res.status(500).json({ status: err?.status || 500, message: err?.message || err });
    }
  },
};

module.exports = leaveController;
