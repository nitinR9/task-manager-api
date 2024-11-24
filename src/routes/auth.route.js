const { loginUser, createUser, logoutUser, deleteUser } = require('../controllers/auth.controller')

const router = require('express').Router()

router.post('/signup', createUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.delete('/user', deleteUser)

module.exports = router