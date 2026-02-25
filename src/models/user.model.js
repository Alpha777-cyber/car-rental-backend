const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        required : true,
        type : String,
        trim : true
    },
    email: {
        type: String,
        unique : true,
        lowercase : true,
        required : true
    },
    password :{
        type : String,
        required : true,
        minlength : 6,
    },
    role : {
        default : 'user',
        enum : ['user','admin'],
        type : String
    },
},{timestamps:true});

// Use async pre-save middleware without calling next() — returning/awaiting handles flow
userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

module.exports = mongoose.model('User',userSchema);