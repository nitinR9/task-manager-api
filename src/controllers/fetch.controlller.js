const { getTasksSchema, searchTasksSchema } = require("../utils/validators")
const { getTask, getAllTasks } = require("../utils/functions")
const { Task, Comment } = require("../model/tasks.model")
const { Op } = require("sequelize")

async function fetchAllTasks(req, res, next){
    try{
        const queryParams = req.query
        const parseQuery = getTasksSchema.parse(queryParams)
        const result = await getAllTasks(parseQuery)

        res.json({
            tasks: result,
            total: result.length
        })
    }catch(err){
        next(err)
    }
}

async function fetchSingleTask(req, res, next){
    try{
        const id = req.params.id
        
        if (!id && id === ''){
            return res.json({
                error: 'Task ID is required complete the operation'
            })
        }
        
        const result = await getTask(id)
        res.json(result)
    }catch(err){
        next(err)
    }
}

async function searchTask(req, res, next){
    try{
        const queryParams = req.query
        const parseQuery = searchTasksSchema.parse(queryParams)
        const searchValue = parseQuery.key
        
        const results = await Task.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${searchValue}%` } },
                    { description: { [Op.like]: `%${searchValue}%` } },
                    { assignee: { [Op.like]: `%${searchValue}%` } },
                    { dueDate: { [Op.like]: `%${searchValue}%` } }
                ]
            },
            include: {
                model: Comment,
                attributes: ['text', 'author', 'createdAt'],
                as: 'comments'
            }
        })

        res.json({
            tasks: results,
            total: results.length
        })
    }catch(err){
        next(err)
    }
}


module.exports = {
    fetchAllTasks,
    fetchSingleTask,
    searchTask
}