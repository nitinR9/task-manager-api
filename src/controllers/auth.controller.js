const { TokenExpiredError, decode, JsonWebTokenError } = require("jsonwebtoken")
const { User, Token } = require("../model/users.model")
const { getJWT, checkJWT, getHash } = require("../utils/functions")
const { loginSchema } = require("../utils/validators")
const bcrypt = require('bcrypt')

async function createUser(req, res, next){
    try{
        const parseBody = loginSchema.parse(req.body)

        const exists = await User.findOne({
            where: {
                name: parseBody.name
            }
        })

        if (exists){
            return res.status(400).json({
                error: 'User exists. Please login instead'
            })
        }

        const hash = await getHash(parseBody.password)
        
        const user = await User.create({
            name: parseBody.name,
            hash
        })

        const token = await getJWT({
            id: user.dataValues.id,
            name: parseBody.name
        })

        await Token.create({
            userId: user.dataValues.id,
            jwtToken: token
        })

        res.json({
            accessToken: token
        })
    }catch(err){
        next(err)
    }
}

async function loginUser(req, res, next){
    try{
        const parseBody = loginSchema.parse(req.body)

        const exists = await User.findOne({
            where: {
                name: parseBody.name
            },
            include: {
                model: Token,
                attributes: ['jwtToken'],
                as: 'token'
            }
        })

        if (!exists){
            return res.status(400).json({
                error: 'User doesnot exists'
            })
        }

        const result = bcrypt.compareSync(parseBody.password, exists.dataValues.hash)
        
        if (result){
            if (!exists.dataValues.token){
                const newToken = await getJWT({
                    id: exists.dataValues.id,
                    name: parseBody.name
                })

                await Token.create({
                    userId: exists.dataValues.id,
                    jwtToken: newToken
                })
    
                return res.json({
                    accessToken: newToken
                })
            }
            else{
                const [decodedToken, error] = await checkJWT(exists.dataValues.token.jwtToken)

                if (error instanceof TokenExpiredError){
                    const newToken = await getJWT({
                        id: exists.dataValues.id,
                        name: parseBody.name
                    })

                    await Token.update({
                        jwtToken: newToken
                    }, {
                        where: {
                            userId: exists.dataValues.id
                        }
                    })
        
                    return res.json({
                        accessToken: newToken
                    })
                }
                else if(error){
                    throw error
                }
                else if(!error){
                    return res.json({
                        accessToken: exists.dataValues.token.jwtToken
                    })
                }
            }
        }
        else{
            return res.status(401).json({
                error: 'Password invalid'
            })
        }
    }catch(err){
        next(err)
    }
}

async function logoutUser(req, res, next){
    try{
        const authHeader = req.headers['authorization']

        if (!authHeader){
            return res.status(400).json({
                error: 'Token is required to logout'
            })
        }

        if (authHeader.startsWith('Bearer')){
            const token = authHeader.slice(7, authHeader.length)

            const [decoded, error] = await checkJWT(token)

            if (error instanceof TokenExpiredError || decoded){
                let userId = ''
                if (decoded){
                    userId = decoded.id
                }
                else{
                    const expiredToken = decode(token)
                    userId = expiredToken.id
                }

                const dbToken = await Token.findOne({
                    where: {
                        userId
                    }
                })
    
                if (!dbToken){
                    return res.status(400).json({
                        error: 'User already loggedout'
                    })
                }

                if (dbToken.dataValues.jwtToken !== token){
                    return res.status(400).json({
                        error: 'Token mismatch. Please provide correct token'
                    })
                }

                await Token.destroy({
                    where: {
                        userId
                    }
                })

                return res.json({
                    success: 'User logged out'
                })
            }
            else{
                throw error
            }
        }
        
        res.status(400).json({
            error: 'Bearer token doesnot exist in headers'
        })
    }catch(err){
        next(err)
    }
}

async function deleteUser(req, res, next){
    try{
        const authHeader = req.headers['authorization']

        if (!authHeader){
            return res.status(400).json({
                error: 'Token is required to delete account'
            })
        }

        if (authHeader.startsWith('Bearer')){
            const token = authHeader.slice(7, authHeader.length)

            const [decoded, error] = await checkJWT(token)

            if (error){
                throw error
            }

            const userId = decoded.id
            const exists = await Token.findOne({
                where: {
                    userId
                }
            })

            if (!exists){
                return res.status(400).json({
                    error: 'User not logged in yet'
                })
            }

            await User.destroy({
                where: {
                    id: userId
                }
            })

            return res.json({
                success: 'User deleted'
            })
        }

        res.status(400).json({
            error: 'Bearer token doesnot exist in headers'
        })
    }catch(err){
        next(err)
    }
}

module.exports = {
    loginUser,
    createUser,
    logoutUser,
    deleteUser
}