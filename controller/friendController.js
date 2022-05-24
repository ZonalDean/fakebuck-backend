const { Op } = require('sequelize')
const createError = require('../utils/createError');
const { Friend, User } = require('../models');
const { FRIEND_ACCEPTED, FRIEND_PENDING } = require('../config/constants');
const { stringfy } = require('../Sync');
const FriendService = require('../services/friendService')

exports.getAllFriend = async (req, res, next) => {
    try {

        const { status } = req.query;

        // declare empty array to be filled by if else statements
        let user = []

        // status? === will not use function if undefined
        if (status?.toUpperCase() === 'PENDING') {
            user = await FriendService.findPendingFriends(req.user.id)
        } else if (status?.toUpperCase() === 'REQUESTED') {
            user = await FriendService.findRequestedFriends(req.user.id)
        } else if (status?.toUpperCase() === 'UNKNOWN') {
            user = await FriendService.findUnkownFriends(req.user.id)
        } else {
            user = await FriendService.findAcceptedFriends(req.user.id)
        }

        // >>>>>>>> FIND ACCEPTED
        // const user = await FriendService.findAcceptedFriends(req.user.id)

        // >>>>>>>> FIND PENDING (sent from others)
        // const user = await FriendService.findPendingFriends(req.user.id)

        // >>>>>>>> FIND REQUESTED (sent from user)
        // const user = await FriendService.findRequestedFriends(req.user.id)

        // >>>>>>>> FIND UNKNOWN (no requests at all)
        // const user = await FriendService.findUnkownFriends(req.user.id)

        stringfy(user)
        res.json({ user })
    } catch (err) {
        next(err)
    }
}

exports.requestFriend = async (req, res, next) => {
    try {
        const { requestToId } = req.body;

        if (req.user.id === requestToId) {
            createError('cannot request yourself', 400)
        }

        // CHECK IF THIS FRIEND HAS ALREADY BEEN REQUESTED
        const existFriend = await Friend.findOne({
            where: {
                [Op.or]: [
                    { requestFromId: req.user.id, requestToId: requestToId }, // {,} = AND ; {},{} = OR
                    { requestFromId: requestToId, requestToId: req.user.id }
                    //req.user.id Phukao, requestToId Toro
                    // requestFromId = Phukao AND requestToId = Toro OR 
                    // requestToId = Phukao AND request FromId = Toro
                ]
            }
        })

        if (existFriend) {
            createError('This friend has already been requested', 400)
        }

        // CREATE A FRIEND RELATIONSHIP
        const friend = await Friend.create({
            requestToId,
            requestFromId: req.user.id,
            status: FRIEND_PENDING
        })

        res.json({ friend })

        console.log(req.user.id)
        console.log(requestToId)

    } catch (err) {
        next(err)
    }
}

exports.updateFriend = async (req, res, next) => {
    try {

        // EXTRACT friend.id FROM req.params AND FIND FRIEND
        const { requestFromId } = req.params;
        const friend = await Friend.findOne({
            where: {
                requestFromId,
                requestToId: req.user.id,
                status: FRIEND_PENDING
            }
        });

        // CHECK IF FRIEND EXISTS
        if (!friend) {
            createError('Friend request not found', 400);
        }

        // ACCEPT FRIEND
        friend.status = FRIEND_ACCEPTED
        await friend.save()

        // RES
        res.json({ message: 'Friend request accepted' })

    } catch (err) {
        next(err)
    }
}

exports.deleteFriend = async (req, res, next) => {
    try {
        const { id } = req.params;

        const friend = await Friend.findOne({ where: { id } });

        if (!friend) {
            createError('Friend request not found', 400)
        };

        if (
            friend.requestFromId !== req.user.id &&
            friend.requestToId !== req.user.id
        ) {
            createError('You do not have permission', 403)
        };

        await friend.destroy();
        res.status(201).json('Removed friend')

    } catch (err) {
        next(err)
    }
}
