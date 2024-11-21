const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');

const User = sequelize.define('User', {
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
    tableName: 'users'
});

module.exports = User;
