const { User, Friend } = require('../models')
const createError = require("../utils/createError");
const friendService = require("../services/friendService")

exports.getMe = async (req, res, next) => {
    try {

        // HARD WAY
        // const {
        //     id,
        //     firstName,
        //     lastName,
        //     email,
        //     phoneNumber,
        //     profilePic,
        //     coverPhoto,
        //     createdAt,
        //     updatedAt } = req.user;

        // const friends = await friendService.findAcceptedFriends(req.user.id);

        // res.json({
        //     user: 
        //         id,
        //         firstName,
        //         lastName,
        //         email,
        //         phoneNumber,
        //         profilePic,
        //         coverPhoto,
        //         createdAt,
        //         updatedAt,
        //         friends
        // })

        // COOL WAY
        const user = JSON.parse(JSON.stringify(req.user)); 
        const friends = await friendService.findAcceptedFriends(req.user.id);

        user.friends = friends;

        res.json({ user });

    } catch (err) {
        next(err)
    }


}