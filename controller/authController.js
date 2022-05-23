const createError = require("../utils/createError");
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

exports.login = async (req, res, next) => {
    try {
        res.status(200).json({ message: 'login succesful' });
    } catch (error) {
        next(error)
    }
};

exports.signup = async (req, res, next) => {
    try {
        
        // DESTRUCTURING BODY
        const { firstName, lastName, emailOrPhone, password, confirmPassword } = req.body;

        // VALIDATE TO CHECK FOR INPUTS
        if (!emailOrPhone) {
            createError('email or phone number requried', 400)
        } if (!password) {
            createError('requires a password', 400)
        } if (password !== confirmPassword) {
            createError('passwords do not match', 400)
        }

        // VALIDATE FORMAT FOR EMAIL OR PHONE NUMBER
        const isMobilePhone = validator.isMobilePhone(emailOrPhone + '')
        const isEmail = validator.isEmail(emailOrPhone + '')

        if (!isEmail && !isMobilePhone) {
            createError('email or phone number is invalid format')
        }

        // USER CREATION IS INTIATIED
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const user = await User.create({
            firstName,
            lastName,
            email: isEmail ? emailOrPhone : null,
            phoneNumber: isMobilePhone ? emailOrPhone : null,
            password: hashedPassword
        });

        // ASSIGN TOKEN AND PAYLOAD
        const payload = {
            id: user.id,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {
            expiresIn: '1d'
        })

        // SEND TOKEN
        res.status(201).json({ token });
    } catch (error) {
        next(error)
    }
};