const captainService = require('../services/captain.service');
const captainModel = require('../models/captain.model');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstname, lastname, email, password, color, plateNumber, capacity, vehicalType } = req.body;

        const existingCaptain = await captainModel.findOne({ email });
        if (existingCaptain) {
            return res.status(400).json({ message: 'Captain already exists' });
        }

        const captain = await captainService.createCaptain({
            firstname,
            lastname,
            email,
            password,
            color,
            plateNumber,
            capacity,
            vehicalType
        });

        const token = captain.generateAuthToken();
        res.status(201).json({ token, captain });
    } catch (error) {
        next(error);
    }
};



module.exports.loginCaptain  = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password}  = req.body;
    const captain = await captainModel.findOne({ email}).select('+password');
    if(!captain){
        return res.status(400).json({message: 'Invalid email or password'});
    }

    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({message: 'Invalid email or password'});
    }
    const token = captain.generateAuthToken();
    res.status(200).json({ token, captain });
}


module.exports.getCaptainProfile = async (req, res, next) => {
    try {
        const captain = await captainModel.findById(req.captain._id);
        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }
        res.status(200).json({ captain });
    } catch (error) {
        next(error);
    } 
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Blacklist the token (you can implement this in your database)
    await blacklistTokenModel.create({ token });

    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}
