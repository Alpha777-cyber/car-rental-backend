const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.protect = async (req,res,next) =>{
  let token; 
  if(req.headers.authorization && req.headers.authorization.startWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token) return res.status(401).json({
    message : "Not authorized"
  });

  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next()

  }catch(err){
    console.error(err.message);
    res.status(401).json({
      message : 'Token is not valid'
    });
  }
}