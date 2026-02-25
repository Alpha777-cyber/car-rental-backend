const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    car : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Car'
    },
    rating : {
        type : Number,
        required : true,
        min : 1,
        max : 5
    },
    comment : { type : string},
},{timestamps : true});

module.exports =  mongoose.model('Review',reviewSchema);