const mongoose = require('mongoose');   
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: String,
        lastname: String
    },
    email: String, 
    password: String,  
    socketId: String,
    status: {
        type: String,
        default: 'inactive',
        Enum: ['active', 'inactive']
    },
    vehicle: {
        color: String,
        plateNumber: String,
        capaciry: Number
    },
    vehicalType: {
        type: String,
        Enum: ['car', 'bike', 'auto']
    },  

    location: {
        latitude: Number,
        longitude: Number
    }
});

captainSchema.methods.generateAuthToken = function() {
    const token  = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}


captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}       

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;
