const { User, Friend } = require('../models')
const createError = require("../utils/createError");

exports.getMe = async (req, res) => {

    // SEND USER FROM "Authenticate" MIDDLEWARE
    const user = req.user
    res.json({ user: user })

    // FIND USER & GET USER DATA

    // FIND FRIENDS & GET DATA

}