const express = require('express')
const cors = require('cors')
require('dotenv/config')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
