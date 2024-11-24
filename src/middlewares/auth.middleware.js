const { verify } = require("jsonwebtoken")

async function authHandler(req, res, next){
    const header = req.headers['authorization']

    if (!header || !header.startsWith('Bearer ')){
        return res.status(400).json({
            error: 'Authorization token missing or invalid'
        })
    }

    const token = header.split(' ')[1]

    verify(token, process.env.SERVER_TOKEN, (err, decoded) => {
        if (err){
            next(err)
        }

        req.user = decoded
        next()
    })
}

module.exports = authHandler