const { User } = require('../models')
const createError = require("../utils/createError");

exports.me = async (req, res, next) => {
    try {
        // CHECK AUTH

        // FIND USER & GET USER DATA

        // FIND FRIENDS & GET DATA

    } catch {error} {
        next(error)
    }
}