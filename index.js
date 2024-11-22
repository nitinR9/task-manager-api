const express = require('express')
const cors = require('cors')
require('dotenv/config')

const app = express()
const PORT = process.env.PORT || 3000

const apiRouter = require('./src/routes')
const { ZodError } = require('zod')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api', apiRouter)

app.all('*', (req, res, next) => {
    res.status(404).json({ error: 'Route not found' })
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    if (typeof(err) === ZodError){
        return res.status(400).json({ error: err.errors })
    }
    return res.status(500).json({ error: err.message })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
