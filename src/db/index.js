const { Sequelize } = require('sequelize')
const Database = require('better-sqlite3')

const tasks = new Database('tasks.db')
const users = new Database('users.db')

const sqTask = new Sequelize({
    dialect: 'sqlite',
    storage: 'tasks.db',
    dialectModule: tasks
})

const sqUser = new Sequelize({
    dialect: 'sqlite',
    storage: 'users.db',
    dialectModule: users
})

module.exports = {
    sqTask,
    sqUser
}