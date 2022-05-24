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

exports.stringfy = (input) => {
    console.log(JSON.stringify(input, null, 2))
}

// USE THIS TO PUT OBJECT INTO OBJECT FOR weird objects (SQL is weird setter getter)
exports.parseStrinfyJSON = (input) => {
    return JSON.parse(JSON.stringify(input))
}