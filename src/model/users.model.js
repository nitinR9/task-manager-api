const { DataTypes } = require('sequelize');
const { sqUser } = require('../db/index');
const bcrypt = require('bcrypt')

const User = sqUser.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false
});

User.prototype.validHash = function(password, hash){
    return bcrypt.compare(password, hash)
}

module.exports = User;
