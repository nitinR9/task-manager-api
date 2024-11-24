const router = require('express').Router()
const TaskRouter = require('./task.route')
const AuthRouter = require('./auth.route')

router.use('/', AuthRouter)
router.use('/', TaskRouter)

module.exports = router