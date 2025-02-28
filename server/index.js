const path = require("path");
const express = require("express");
const cors = require('cors');

require('dotenv').config();

const connectDB = require("./utils/database")();
// const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const app = express();

const port = 3001;


app.use(cors({
  origin: process.env.HOST_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const WelcomeToExpress = (req, res) => {
    res.send("Express on Vercel");
  };
// routes
app.get("/", WelcomeToExpress);
app.use("/auth", authRoutes);
app.use("/leaves", leaveRoutes);


connectDB.then(() => {
    app.listen(port, () => console.log(`Server ready on port ${port}.`));
}).catch((err) => {
    console.log(err);
});

module.exports = app;