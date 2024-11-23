const router = require('express').Router()
const { addTasks, addComments } = require('../controllers/add.controller')
const { updateTask, deleteTask } = require('../controllers/update.controller')

router.post('/tasks', addTasks)
router.post('/tasks/:id/comments', addComments)
router.put('/tasks/:id', updateTask)
router.delete('/tasks/:id', deleteTask)
// router.get('tasks/:id', )
// router.get('tasks', )
// router.get('tasks/search')

module.exports = router