const captainService = require('../services/captain.service');
const captainModel = require('../models/captain.model');
const { validationResult } = require('express-validator');


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
