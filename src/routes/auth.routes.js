const express = require('express');
const router = express.Router();
const {register,login} =require('../controllers/auth.controller');
const {body,validationResult} = require('express-validator');

router.post(
    '/register',
    [
        body('name','Name is required').notEmpty(),
        body('email','valid email is required').isEmail(),
        body('password','Password must be 6+ chars').isLength({min : 6}),
    ],
    register
);

router.post(
    '/login',
    [
        body('email','Valid email is required').isEmail(),
        body('password','Password is required').notEmpty(),
    ],
    login
);




module.exports = router;