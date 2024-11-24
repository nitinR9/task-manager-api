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

const Token = sqUser.define('Token', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    jwtToken: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tokens',
    timestamps: false  
})

User.hasOne(Token, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    as: 'token'
})

module.exports = {
    User,
    Token
};
