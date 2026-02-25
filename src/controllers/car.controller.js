const Car = require('../models/car.model');

exports.createCar = async (req,res)=>{
    try{
        const car = new Car(req.body);
        await car.save();
        res.status(201).json(car);
    }catch(err){
        console.error(err.message);
        res.status(500).json({message : "server error"});
    }
};

exports.getcars = async(req,res)=>{
    try{
        const cars = await Car.find();
        res.status(200).json(cars);

    }catch(err){
        console.error(err.message);
        res.status(500).json({message : "server error"});
    }
    
}

exports.getCarById = async(req,res)=>{
    try{
        const car = await Car.findById(req.params.id);
        if(!car) return res.status(404).json({message:'Car was not found'});
        res.status(201).json(car);
        
    }catch(err){
        console.error(err.message);
        res.status(500).json({message : "server error"});
    }
}


exports.updateCar = async(req,res)=>{
    try{
        const car = await Car.findByIdAndUpdate(req.params.id,req,body,{new : true});
        if(!car) return res.status(404).json({message:'Car was not found'});
        res.status(201).json(car);

    }catch(err){
        console.error(err.message);
        res.status(500).json({message : "server error"});
    }
}

exports.deleteCar = async(req,res)=>{
    try{
        const car = await Car.findByIdAndDelete(req.params.id);
        if(!car) return res.status(404).json({message:'Car was not found'});
        res.status(201).json({message : "car deleted successfully"});

    }catch(err){
        console.error(err.message);
        res.status(500).json({message : "server error"});
    }
}