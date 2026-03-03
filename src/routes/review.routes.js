const express = require('express');
const router = express.Router();
const { addReview, getReviewsByCar } = require('../controllers/review.controller');

// Add a review (logged-in user)
router.post('/', addReview);

// Get reviews for a specific car (can be public)
router.get('/:carId', getReviewsByCar);

module.exports = router;