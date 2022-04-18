const jwt = require('jsonwebtoken');
const config = require("../config/auth/key");
const UserRepository = require("../repository/mysql2/UserRepository");
//userDiseaseId
//idpres
module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader;
    try{
        let decoded = jwt.verify(token, config.secret);
        UserRepository.getUserId(decoded.userId)
            .then( user => {
                console.log("TUTAJ isUSER")
                console.log(user._idUzytkownik);
                const zmienna= req.params['userId'||'idpres'||'userDiseaseId']
                console.log(zmienna);
                user = JSON.parse(JSON.stringify(user));
                if(user._idUzytkownik === parseInt(req.params['userId']) || user._idRola===3){
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