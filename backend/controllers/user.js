const db = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const registerUser = async(req,res) => {
    const {username,password,name} = req.body
    const invaliduserName = await db.User.findOne({where:{username:username}})
    if(invaliduserName) {res.status(400).send({message:'username already taken'})}
    else {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password,salt)
        await db.User.create({
            username:username,
            password:hashedPassword,
            name:name
        })
        res.status(201).send({message:'Successfully created!'})
    }
}
const loginUser = async (req,res) => {
    const {username,password} = req.body
    const userFound = await db.User.findOne({where:{username:username}})
    if(!userFound) res.status(400).send('Incorrect username or password')
    else{
        const correctPassword = bcrypt.compareSync(password,userFound.password)
        if(correctPassword){
            const payload = {
                name: userFound.name,
                id: userFound.id
            }
            const token = jwt.sign(payload,process.env.SECRET_OR_KEY,{expiresIn:3600})
            res.status(200).send({
                message:'Successfully logged in',
                token:token
            })
        } else{
            res.status(400).send('Incorrect username or password')
        }
    }
} 
const getUser = async (req,res) => {
    const user = await db.User.findAll()
    res.status(200).send(user)
}
module.exports = {
    registerUser,loginUser,getUser
}