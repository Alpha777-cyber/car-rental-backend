require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectedDB = require('./config/db');
const routes = require('./routes'); // make sure this exports an Express router
const { errorHandler } = require('./middlewares/err.middleware'); // make sure this is a middleware function

const app = express();

// Connect to the database
connectedDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
if (routes && typeof routes === 'function') {
    app.use('/api', routes);
} else {
    console.error('Routes is not a valid Express router!');
}

// Root route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'The app is running'
    });
});

// Global error handling
if (errorHandler && typeof errorHandler === 'function') {
    app.use(errorHandler);
} else {
    console.error('Error handler is not a valid middleware function!');
}

module.exports = app;