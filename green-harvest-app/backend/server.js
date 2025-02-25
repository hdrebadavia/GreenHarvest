//GREEN HARVEST APP BACKEND
//Date: February 25, 2025
//Author: Hector Daniel Rebadavia

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// const sequelize = require("./config/db");
const { poolPromise } = require('./config/db');

//ROUTES INITIALIZATION
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");

//LOAD ENVIRONEMNT VARIABLES
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Test route
app.get('/', (req, res) => {
    res.send('Green Harvest API Running...');
});

// CONNECT TO DATABASE
connectDB();

//API ROUTES
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

