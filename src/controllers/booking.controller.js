const Booking = require('../models/booking.model');
const Car = require('../models/car.model');

exports.createBooking = async (req,res)=>{
    try{
        const {car : carId ,startDate, endDate} = req.body;

        const car = await Car.findById(carId);
        if(!car) return res.status(404).json({message : 'car is not found'});
        if(!car.available) return res.status(400).json({message:'the car is not available'});

        const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
        const totalPrice = car.pricePerDay * days;

        const booking = new Booking({
            user : req.user._id,
            car : carId,
            startDate,
            endDate,
            totalPrice,
        });

        await booking.save();
        res.status(201).json(booking);
        
    }catch(err){
        console.error(err.message);
        res.status(500).json({message:'server error'});
    }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('car');
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};