const { sqTask } = require("../db")
const { Task, Comment } = require("../model/tasks.model")
const { postTaskSchema, postCommentSchema } = require("../utils/validators")
const rs = require('randomstring')


async function addTasks(req, res, next){
    try{
        const result = postTaskSchema.parse(req.body)
        const id = rs.generate(12)  
        
        const task = await Task.create({
            id,
            ...result,
            creator: req.user.name
        }) ;

        res.json({
            ...task.dataValues,
            comments: []
        })
    }
    catch(err){
        next(err)
    }
}

async function addComments(req, res, next){
    try{
        const taskId = req.params.id

        const exists = await Task.findOne({
            where: {
                id: taskId
            }
        })

        if (!exists){
            return res.status(404).json({
                error: 'Cannot comment as associated task doesnot exist.'
            })
        }

        const result = postCommentSchema.parse(req.body)

        const comment = await Comment.create({
            taskId,
            ...result,
            author: req.user.name
        })
        res.json({
            id: comment.dataValues.id,
            ...result,
            author: req.user.name
        })
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    addTasks,
    addComments
}