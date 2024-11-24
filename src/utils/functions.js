const { Task, Comment } = require("../model/tasks.model");

function getAllTasks(query){
    if (Object.keys(query).length){
        return Task.findAll({
            where: query,
            include: {
                model: Comment,
                attributes: ['text', 'author', 'createdAt'],
                as: 'comments'
            }
        })
    }
    return Task.findAll({
        include: {
            model: Comment,
            attributes: ['text', 'author', 'createdAt'],
            as: 'comments'
        }
    })
}

function getTask(id){
    return Task.findOne({
        where: {
            id
        },
        include: {
            model: Comment,
            attributes: ['text', 'author', 'createdAt'],
            as: 'comments'
        }
    })
}

module.exports = {
    getTask,
    getAllTasks
}