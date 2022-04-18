const jwt = require('jsonwebtoken');
const config = require("../config/auth/key");
const UserRepository = require("../repository/mysql2/UserRepository");

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader;
    try{
        let decoded = jwt.verify(token, config.secret);
        UserRepository.getUserId(decoded.userId)
            .then( user => {
                user = JSON.parse(JSON.stringify(user));
                if(user._idRola === 3){
                    next()
                } else {
                    return res.sendStatus(403)
                }
            })
            .catch(err => {
                return res.sendStatus(401)
            })

    }catch (err){
        return res.sendStatus(403)
    }

}