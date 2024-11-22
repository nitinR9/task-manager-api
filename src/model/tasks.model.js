const { DataTypes } = require('sequelize')
const { sqTask } = require('../db/index')

const Comment = sqTask.define('Comment', {
    commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id: {
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
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    tableName: 'comments',
    timestamps: false
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
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'tasks',
    timestamps: true
})

Task.hasMany(Comment, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
})

Comment.belongsTo(Task)

module.exports = {
    Task,
    Comment
}