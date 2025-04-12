const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");
const authmiddleware = require("../middlewares/auth.middleware");


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 1 }).withMessage('First name must be at least 1 character long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 character long')
],
    captainController.registerCaptain
)   

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min:8 }).withMessage('Password must be at least 8 character long')

],
    captainController.loginCaptain
)

router.get('/profile', authmiddleware.authCaptain, captainController.getCaptainProfile)

router.get('/logout', authmiddleware.authCaptain, captainController.logoutCaptain)  

module.exports = router;