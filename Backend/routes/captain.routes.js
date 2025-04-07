const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 1 }).withMessage('First name must be at least 1 character long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 character long')
],
    captainController.registerCaptain
)   

module.exports = router;

