const router = require('express').Router()
const TaskRouter = require('./task.route')

router.use('/', TaskRouter)

module.exports = router