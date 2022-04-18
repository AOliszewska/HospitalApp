const jwt = require("jsonwebtoken");
const config = require("../config/auth/key");
const UserRepository = require("../repository/mysql2/UserRepository");

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader;
    try{
        let decoded = jwt.verify(token, config.secret);
        UserRepository.getUserId(decoded.userId)
            .then( user => {
                console.log("TUTAJ ONLY USER")
                console.log(user._idUzytkownik);
                const zmienna= req.params['opinionId']
                user = JSON.parse(JSON.stringify(user));
                if(user._idUzytkownik === parseInt(req.params['opinionId'])){
                    console.log("NEXT")
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