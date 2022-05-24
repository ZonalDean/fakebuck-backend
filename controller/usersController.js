const { User, Friend } = require('../models')
const createError = require("../utils/createError");
const friendService = require("../services/friendService")
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

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

exports.updateProfile = async (req, res, next) => {
    try {
        console.log(req.file)

        cloudinary.uploader.upload(req.file.path, async (error, result) => {
            
            if (error) {
                return next(err);
            }

            await User.update(
                { profilePic: result.secure_url },
                { where: { id: req.user.id } }
            );
        
            fs.unlinkSync(req.file.path);

            res.json({ profilePic: result.secure_url })

        });
        
    } catch (err) {
        next(err)
    }
}