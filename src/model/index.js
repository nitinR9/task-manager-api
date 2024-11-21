const fs = require('fs')
const path = require('path')
const sequelize = require('../db/index')

const db = {}

fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js' && file.endsWith('.js'))
    .forEach( file => {
        const model = require(path.join(__dirname, file))
        db[model.name] = model
    })

Object.keys(db).forEach((name) => {
    if (db[name].associate){
        db[name].associate(db)
    }
})

db.sequelize = sequelize

module.exports = db