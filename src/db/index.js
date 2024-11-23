const { Sequelize } = require('sequelize')

const sqTask = new Sequelize({
    dialect: 'sqlite',
    storage: 'tasks.db'
})

const sqUser = new Sequelize({
    dialect: 'sqlite',
    storage: 'users.db'
})

module.exports = {
    sqTask,
    sqUser
}