const { Sequelize } = require('sequelize')
const Database = require('better-sqlite3')

const db = new Database('task-manager.db')

const sq = new Sequelize({
    dialect: 'sqlite',
    storage: 'task-manager.db',
    dialectModule: db
})

module.exports = sq