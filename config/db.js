const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required: true,
    },
    email : {
        type : String,
        required: true,
        unique : true,
    },
    password : {
        type : String,
        required: true,
        unique: true,
    },
    createdAt : {
        type : Date,
        default: Date.now,
    }
});

/// Hashing Password ///

userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    };

    try{
        const salt = await bcrypt.genSalt(15);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    }catch(error){
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

