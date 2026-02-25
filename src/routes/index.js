const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const carRoutes = require('./car.routes');
const bookingRoutes = require('./booking.routes');
const reviewRoutes = require('./review.routes');

const { protect } = require('../middlewares/auth.middleware');

// Auth routes
router.use('/auth', authRoutes);

// Car routes (public + protected)
router.use('/cars', carRoutes);

// Booking routes (all protected)
router.use('/bookings', protect, bookingRoutes);

// Review routes (all protected)
router.use('/reviews', protect, reviewRoutes);

module.exports = router;