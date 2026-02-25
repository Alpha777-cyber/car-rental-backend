const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv')

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const connectedDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);

    }catch(err){
        console.log('Mongoose connection failed :',err.message);
        process.exit(1);
    }
}

module.exports = connectedDB;