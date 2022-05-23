const { sequelize } = require('./models')

exports.modDB = (arming) => {
    if (arming === 'force') {
        sequelize.sync({ force: true })
    } if (arming === 'alter') {
        sequelize.sync({ alter: true })
    } else {
        console.log(`'force' to force sync, 'alter' to alter sync`)
    }
}