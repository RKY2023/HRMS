const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    signup: async (req, res) => {
        try {
            const { name:username, email, password } = req.body;

            // Check if user already exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Create new user
            user = new User({
                username,
                email,
                password: await bcrypt.hash(password, 10)
            });

            await user.save();

            // Generate JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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

            // Check if user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Validate password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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
            const user = await User.findOne({ _id: decoded.id })
        
            if (!user) {
              throw new Error()
            }
        
            req.token = token
            req.user = user
            next()
        } catch (error) {
            res.status(401).send({ message: "Please authenticate" })
        }
    }
};

module.exports = authController;