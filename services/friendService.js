const { Op } = require('sequelize')
const { Friend, User } = require('../models')
const { FRIEND_ACCEPTED, FRIEND_PENDING } = require('../config/constants');
const { stringfy } = require('../Sync');


exports.findAcceptedFriends = async id => {
    // WHERE (requestToId = 1 OR requestFromId = 1) AND status = ACCEPTED
    const friends = await Friend.findAll({
        where: {
            [Op.or]: [{ requestToId: id }, { requestFromId: id }],
            status: FRIEND_ACCEPTED
        }
    });

    // SELECT * FROM users WHERE id IN () ***because friendIds = [...]
    const friendIds = friends.map(el =>
        el.requestToId === id ? el.requestFromId : el.requestToId
    );

    const users = await User.findAll({
        where: { id: friendIds },
        attributes: { exclude: ['password'] }
    });

    return users
}

exports.findPendingFriends = async id => {

    const friends = await Friend.findAll({
        where: {
            requestToId: id,
            status: FRIEND_PENDING
        },
        include: {
            model: User,
            as: 'RequestFrom' // base this on the model
        }
    });

    return friends.map(el => el.RequestFrom)

}

exports.findRequestedFriends = async id => {

    //FIND REQUESTED 'RequestTo'
    const friends = await Friend.findAll({
        where: {
            requestFromId: id,
            status: FRIEND_PENDING
        },
        include: {
            model: User,
            as: 'RequestTo'
        }
    })

    return friends.map(el => el.RequestTo)

}

exports.findUnkownFriends = async id => {

    // 'friends' FINDS ALL FRIENDS WITH RELATE 'requestToId' AND 'requestFromId'
    const friends = await Friend.findAll({
        where: {
            [Op.or]: [{ requestToId: id }, { requestFromId: id }],
        }
    });

    // SELECT * FROM users WHERE id IN () ***because friendIds = [...]
    // const 'knownIds' maps 'friends' converting all ids to be one type
    const knownIds = friends.map(el =>
        el.requestToId === id ? el.requestFromId : el.requestToId
    );
    
    // include owner into FriendIds array
    knownIds.push(id);

    // FIND ALL USERRS NOT IN 'friendIds
    const users = await User.findAll({
        where: { id: {[Op.notIn]: knownIds} },
        attributes: { exclude: ['password'] }
    });

    return users
}