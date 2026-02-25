const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

const generateToken = (userId) =>{
    return jwt.sign({ id: userId},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};


exports.register = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors : errors.array() });

    const {name , email , password} = req.body;

    try{

        let user = await User.findOne({email});
        if(user) return res.status(400).json({message: 'user already exists'});

        user = new User({name,email,password});
        await user.save();

        const token = generateToken(user._id);
        res.status(201).json({
            token,
            user:{
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role
            },
        });
    }catch(err){
       console.error(err.message);
       res.status(500).json({
        message : 'server error'
       });
    }
}


exports.login = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({
        errors: errors.array()
    });

    const {email ,password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "invalid credentials"});

        const isMatch  = await user.matchPassword(password);
        if(!isMatch) return res.status(400).json({message: 'invalid credentials'});

        const token = generateToken(user._id);
        res.json({
            token,
            user:{
                id: user._id,
                name : user.name,
                email : user.email,
                role : user.role
            }
        })
        }catch(err){
            console.error(err.message);
            res.status(500).json({message : 'server error'});
        }
};