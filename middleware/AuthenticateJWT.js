
// Proteger los contenidos que requieren la authenticación
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()
const secretKey=process.env.SECRET_KEY

const authenticateJWT= (req,res,next)=>{
    console.log('SECRET='+secretKey)
    const authHeader= req.headers.authorization

    if(authHeader){
        const token= authHeader.split(' ')[1]
        jwt.verify(token,secretKey,(err,user)=>{
            if(err){
                return res.sendStatus(403)
            }

            req.user=user
            next()
        })
    }else{
        res.sendStatus(401)
    }
}
module.exports=authenticateJWT;