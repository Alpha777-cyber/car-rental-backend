const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings } = require('../controllers/booking.controller');

// All booking routes are protected in the centralized router
router.post('/', createBooking);      // Create a booking
router.get('/', getUserBookings);     // Get all bookings of logged-in user

module.exports = router;