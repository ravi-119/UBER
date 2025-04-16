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

    res.cookie('token', token)
    res.status(200).json({ token, captain });
}


module.exports.getCaptainProfile = async (req, res, next) => {
    try {
        const captainId = req.captain?._id;

        if (!captainId) {
            return res.status(400).json({ message: 'Captain ID not found in request' });
        }

        const captain = await captainModel.findById(captainId);

        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }

        return res.status(200).json({ success: true, captain });
    } catch (error) {
        console.error('Error fetching captain profile:', error);
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


module.exports.logoutCaptain = async (req, res, next) => {
    res.clearCookie('token');

    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    // Blacklist the token (you can implement this in your database)
    await blacklistTokenModel.create({ token });
    res.status(200).json({ message: 'Logout successfully' });
}
