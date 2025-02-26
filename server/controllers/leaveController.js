const LeaveRequest = require('../models/leaveRequest');
const Employee = require('../models/employee');

const leaveController = {
  submitLeaveRequest: async (req, res) => {
    try {
      const { employeeId, leaveType, startDate, endDate, reason } = req.body;

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
};

module.exports = leaveController;
