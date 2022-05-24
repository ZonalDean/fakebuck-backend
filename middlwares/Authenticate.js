require('dotenv').config();
const createError = require("../utils/createError");
const jwt = require('jsonwebtoken')
const { User } = require('../models')


module.exports = async (req, res, next) => {
    try {

        // EXTRACT authorization FROM HEADERS & CHECK IF VALID
        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer')) {
            createError('You are unautherized', 401)
        };

        // EXTRACT TOKEN FROM authorization & CHECK IF TOKEN IS REAL
        const token = authorization.split(' ')[1]
        if (!token) {
            createError('You are unautherized', 401)
        };

        // PREPARE PAYLOAD
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        // create user AND exclude password from payload
        const user = await User.findOne({ where: { id: payload.id },
        attributes: {
            exclude: ['password']
        } })
        // check if user is valid
        if (!user) {
            createError('You are unautherized', 401)
        };

        // PREPARE USER TO BE SENT TO ROUTE
        req.user = user;
        next()
    } catch (err) {
        next(err)
    }
}