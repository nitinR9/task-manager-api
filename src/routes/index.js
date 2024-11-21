const router = require('express').Router()
const TaskRouter = require('./task.route')

router.use('/task', TaskRouter)

module.exports = router