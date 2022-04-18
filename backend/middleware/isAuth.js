const jwt = require('jsonwebtoken')
const config = require("../config/auth/key")

module.exports = (req, res, next) => {
    console.log("ISAUTH")
    const authHeader = req.headers['authorization']
    const token = authHeader;
    if(token == null){
        return res.sendStatus(401);
    }
    try{
        jwt.verify(token, config.secret);
        next()
    }catch (err){
        return res.sendStatus(403)
    }

}