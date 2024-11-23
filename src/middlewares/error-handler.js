const { ZodError } = require('zod');
const { fromError } = require('zod-validation-error');

module.exports = function(err, req, res, next){
    console.error(err.stack)
    if (err instanceof ZodError){
        return res.status(400).json({ error: fromError(err).toString() })
    }
    return res.status(500).json({ error: err.message })
}