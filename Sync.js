const { sequelize } = require('./models')

exports.forceDB = (arming) => {
    if (arming === 'armed') {
        sequelize.sync({ force: true })
    } else {
        console.log(`Need to arm for force sync`)
    }
}