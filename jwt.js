const jwt = require('jsonwebtoken')
const knex=require('./connection/dbconn')

const tokencreate=({id})=>{
    return jwt.sign(id,'hxcbresrreuifhdtpxgsf')
}

const verifytoken= async(req,res,next)=>{
    if(req.headers.cookie){
        const token=(req.headers.cookie).split('=')[1]
        const id=jwt.verify("hxcbresrreuifhdtpxgsf")
        const user_id= await knex('user_data').where({id})
        req.usedata=user_id
        next()
    }
}

module.exports={tokencreate,verifytoken}