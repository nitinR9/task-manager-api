const { DataTypes, DATE } = require('sequelize')
const sequelize = require('../db/index')

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: ['Todo', 'In Progress', 'Done'],
        allowNull: false,
    },
    priority: {
        type: DataTypes.ENUM,
        values: ['Low', 'Medium', 'High'],
        allowNull: false
    },
    assignee: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creator: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'tasks',
    timestamps: true
})

module.exports = Task