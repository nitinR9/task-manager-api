const express = require('express');
const cors = require('cors');
require('dotenv/config');

const app = express()
const PORT = process.env.PORT || 3000
const PASSWORD = process.env.USER_PASS || 'user'

const apiRouter = require('./src/routes');
const errorHandler = require('./src/middlewares/error-handler');

const User = require('./src/model/users.model');
const { hash, genSalt } = require('bcrypt');
const { sqTask, sqUser } = require('./src/db/index');

(async () => {
    await sqTask.sync({ force: true })
    await sqUser.sync({ force: true })

    console.log('creating initial user !')
    const salt = await genSalt()
    const pwd = await hash(PASSWORD, salt)

    await User.create({
        name: 'john.doe',
        hash: pwd
    })

    console.log('User created !')
})()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api', apiRouter)

app.all('*', (req, res, next) => {
    res.status(404).json({ error: 'Route not found' })
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
