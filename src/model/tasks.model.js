const { DataTypes } = require('sequelize')
const { sqTask } = require('../db/index')

const Comment = sqTask.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    taskId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'comments',
    timestamps: true,
    updatedAt: false
})

const Task = sqTask.define('Task', {
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
        defaultValue: 'Todo'
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
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tasks',
    timestamps: true,
    indexes: [
       {
            type: 'FULLTEXT',
            fields: ['title', 'description', 'assignee']
       } 
    ]
})

Task.hasMany(Comment, {
    foreignKey: 'taskId',
    onDelete: 'CASCADE',
    as: 'comments'
})

module.exports = {
    Task,
    Comment
}