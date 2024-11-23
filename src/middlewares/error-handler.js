const { ZodError } = require('zod');

module.exports = function(err, req, res, next){
    console.error(err.stack)
    if (typeof(err) === ZodError){
        return res.status(400).json({ error: err.errors })
    }
    return res.status(500).json({ error: err.message })
}