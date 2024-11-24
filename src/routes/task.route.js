const router = require('express').Router()
const { addTasks, addComments } = require('../controllers/add.controller')
const { fetchAllTasks, fetchSingleTask, searchTask } = require('../controllers/fetch.controlller')
const { updateTask, deleteTask } = require('../controllers/update.controller')
const authHandler = require('../middlewares/auth.middleware')

router.use(authHandler)

router.post('/tasks', addTasks)
router.post('/tasks/:id/comments', addComments)
router.put('/tasks/:id', updateTask)
router.delete('/tasks/:id', deleteTask)
router.get('/tasks/search', searchTask)
router.get('/tasks/:id', fetchSingleTask)
router.get('/tasks', fetchAllTasks)

module.exports = router