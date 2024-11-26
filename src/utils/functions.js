const { genSalt, hash } = require("bcrypt");
const { Task, Comment } = require("../model/tasks.model");
const { TokenExpiredError, JsonWebTokenError, verify, sign } = require('jsonwebtoken')

function getAllTasks(query){
    if (Object.keys(query).length){
        return Task.findAll({
            where: query,
            include: {
                model: Comment,
                attributes: ['text', 'author', 'createdAt'],
                as: 'comments'
            }
        })
    }
    return Task.findAll({
        include: {
            model: Comment,
            attributes: ['text', 'author', 'createdAt'],
            as: 'comments'
        }
    })
}

function getTask(id){
    return Task.findOne({
        where: {
            id
        },
        include: {
            model: Comment,
            attributes: ['text', 'author', 'createdAt'],
            as: 'comments'
        }
    })
}

async function getHash(pwd){
    const salt = await genSalt()
    const hashedPwd = await hash(pwd, salt)
    return hashedPwd
}

async function getJWT(body){
    const payload = body
    const options = {
        expiresIn: '5m', // set to 1min for testing
        issuer: 'DEV9'
    }
    const KEY = process.env.SERVER_TOKEN
    return sign(body, KEY, options)
}

async function checkJWT(jwt){
    const KEY = process.env.SERVER_TOKEN
    return verify(jwt, KEY, (err, decoded) => {
        if (err){
            return [null, err]
        }
        return [decoded, null]
    })
}

module.exports = {
    getTask,
    getAllTasks,
    getHash,
    getJWT,
    checkJWT
}