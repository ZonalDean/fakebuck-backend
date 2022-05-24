const createError = require("../utils/createError");
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { Op } = require('sequelize')

// GEN TOKEN FUNCTION

const genToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {expiresIn: process.env.JWT_EXPIRES_IN})

exports.login = async (req, res, next) => {
    try {

        // DESTRUCTURING REQUEST BODY
        const { emailOrPhone, password } = req.body;

        // CHECK FOR EMAIL OR PHONE_NUMBER
        const user = await User.findOne({
            where: {
                // Op.or === OR for sequelize
                [Op.or]: [
                    { email: emailOrPhone },
                    { phoneNumber: emailOrPhone }
                ]
            }
        });
        // if no user throw error
        if (!user) {
            createError('invalid credentials', 400);
        }

        // CHECK FOR PASSWORD MATCH
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            createError('invalid credentials', 400);
        }

        // GEN AND SEND TOKEN
        const token = genToken({ id: user.id})
        res.status(201).json({ token });

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

        // ASSIGN TOKEN AND PAYLOAD [OPTIONAL]
        const token = token({id: user.id})

        // SEND TOKEN FOR INSTANT ACCESS [OPTIONAL]
        res.status(201).json({ token });
        
    } catch (error) {
        next(error)
    }
};