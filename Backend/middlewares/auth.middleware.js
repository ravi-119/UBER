const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');
const BlacklistTokenModel = require('../models/blacklistToken.model');


module.exports.authUser = async (req, res, next) => {
    const token  = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];  
    if(!token){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await userModel.findOne({ token: token });

    if (isBlacklisted){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        return next();


    }catch(err){
        return res.status(401).json({ message: 'Unauthorized' });
    }   
}




module.exports.authCaptain = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = req.cookies.token || (authHeader && authHeader.startsWith('Bearer ') && authHeader.split(' ')[1]);


        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Token missing' });
        }

        // Check if token is blacklisted
        const isBlacklisted = await BlacklistTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized: Token blacklisted' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch captain
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized: Captain not found' });
        }

        // Attach captain to request
        req.captain = captain;
        next();

    } catch (err) {
        console.error('Auth error:', err.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
};
