const captainModel = require('../models/captain.model');
const bcrypt = require('bcrypt');

module.exports.createCaptain = async ({
    firstname,
    lastname,
    email,
    password,
    color,
    plateNumber,
    capacity,
    vehicalType
}) => {
    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new captain
        const captain = await captainModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password: hashedPassword,
            vehicle: {
                color,
                plateNumber,
                capacity
            },
            vehicalType
        });

        return captain;
    } catch (error) {
        console.error('Error creating captain:', error.message);
        throw error;
    }
};
