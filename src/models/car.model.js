const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    brand : {
        type : String,
        required: true,  
    },
    pricePerDay : {
        type : Number,
        required : true 
    },
    seats : {
        type : Number,
        default : 4
    },
    imageUrl : {
        type : String 
    },
    available : {
        type : Boolean,
        default : true 
    },
},{timestamps : true});

module.exports = mongoose.model('Car',carSchema);