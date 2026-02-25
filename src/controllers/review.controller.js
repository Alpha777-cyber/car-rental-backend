const Review = require('../models/review.model');


exports.addReview = async (req,res)=>{
    try{
        const {car:carId ,rating,comment} = req.body;

        const review = new Review({
            user : req.user._id,
            car : cardId,
            rating,
            comment,
        });

        await review.save();
        res.status(201).json(review);

    }catch(err){
        console.error(err.message);
        res.status(500).json({message : 'server error'});
    }
};


exports.getReviewsByCar = async(req,res) =>{
    try{
        const reviews = await Review.find({car : req.params.carId}).populate('user','name');
        res.json(reviews);
    } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};