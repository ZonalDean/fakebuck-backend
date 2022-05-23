const { sequelize } = require('./models')

const forceDB = () => {
    sequelize.sync({ force: true })
}