// ./middlewares/err.middleware.js

// Error-handling middleware for Express
function errorHandler(err, req, res, next) {
    // Log the error stack for debugging
    console.error(err.stack);

    // Send JSON response with status code and message
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
}

module.exports = { errorHandler };