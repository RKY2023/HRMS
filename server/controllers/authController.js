const Employee = require('../models/employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    signup: async (req, res) => {
        try {
            const { name, email, password, department, contact, reportingManager } = req.body;

            // Check if employee already exists
            let employee = await Employee.findOne({ email });
            if (employee) {
                return res.status(409).json({ message: 'Employee already exists' });
            }

            // Create new employee
            employee = new Employee({
                name,
                email,
                password: await bcrypt.hash(password, 10),
                department,
                contact,
                reportingManager
            });

            await employee.save();

            // Generate JWT token
            const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            res.status(201).json({ success: true, token });
        } catch (err) {
            console.log(err);
            res.status(500).json({ status: err?.status || 500, message: err?.message || err });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(email);

            // Check if employee exists
            const employee = await Employee.findOne({ email });
            if (!employee) {
                return res.status(404).json({message: 'User not found' }); 
            }

            // Validate password
            const isMatch = await bcrypt.compare(password, employee.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            res.status(200).json({ success: true , token });
        } catch (err) {
            res.status(500).json({ status: err?.status || 500, message: err?.message || err });
        }
    },
    auth: async (req, res, next) => {
        try {
            const token = req.header("Authorization").replace("Bearer ", "")
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const employee = await Employee.findOne({ _id: decoded.id })
        
            if (!employee) {
              throw new Error()
            }
        
            req.token = token
            req.employee = employee
            next()
        } catch (error) {
            res.status(401).send({ message: "Please authenticate" })
        }
    },
    getEmployeeDetails: async (req, res) => {
        try {
            const employee = await Employee.findById(req.employee._id);
            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.status(200).json(employee);
        } catch (err) {
            res.status(500).json({ status: err?.status || 500, message: err?.message || err });
        }
    }
};

module.exports = authController;