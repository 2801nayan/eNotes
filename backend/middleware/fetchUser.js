let JWT = require('jsonwebtoken')
const JWT_Token = "#ItSjWtToken@Sign$"

const fetchUser = (req, res, next)=>{
    //get the user from the jwt token and then add id to req obj
    const token = req.header('auth-token')
    if(!token){
        res.status(401).json({error : "Please authenticate using valid token"})
    }
    try {
        const data = JWT.verify(token, JWT_Token)
        req.user = data.user
        next();
    } catch (error) {
        res.status(401).json({error : error.message})
    }
}

module.exports = fetchUser