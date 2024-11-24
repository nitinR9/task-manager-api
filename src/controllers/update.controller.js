const { Task } = require("../model/tasks.model")
const { putTaskSchema } = require("../utils/validators")

async function updateTask(req, res, next){
    try{
        const taskId = req.params.id
        const updateValues = req.body

        if (taskId === ''){
            return res.status(400).json({
                error: 'Task ID is required for the operation'
            })
        }
        
        const exists = await Task.findOne({
            where: {
                id: taskId
            }
        })

        if (!exists){
            return res.status(404).json({
                error: 'Task ID doesnot exist for the operation to proceed'
            })
        }

        const result = putTaskSchema.parse(updateValues)

        await Task.update(
            result,
            {
                where: {
                    id: taskId
                }
            }
        )

        res.status(200).json({
            success: 'Task updated'
        })
    }catch(err){
        next(err)
    }
}

async function deleteTask(req, res, next){
    try{
        const taskId = req.params.id;

        if (taskId === ''){
            return res.status(400).json({
                error: 'Task ID is required for the operation'
            })
        }

        const result = await Task.destroy({
            where: {
                id: taskId
            }
        })

        if (result){
            res.json({
                success: 'Task deleted successfully'
            })
        }
        else{
            res.status(404).json({
                error: 'Task doesnot exists for the operation'
            })
        }
    }catch(err){
        next(err)
    }
}

module.exports = {
    updateTask,
    deleteTask
}