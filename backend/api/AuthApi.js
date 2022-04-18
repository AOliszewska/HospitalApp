const PacjentRepository = require("../repository/mysql2/UserRepository");
const config= require("../config/auth/key");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login= (req,res, next) => {
    const email = req.body.email;
    const haslo = req.body.haslo
    PacjentRepository.findByEmail(email).then(user => {
        if (!user) {
            return res.status(401).send({message: "Login"})
        }

        bcrypt.compare(haslo, user.haslo)
            .then(isEqual => {
                if (!isEqual) {
                    return res.status(401).send({message: "Login"})
                }
                const token = jwt.sign(
                    {
                        email: user.email,
                        userId: user._idUzytkownik
                    },
                    config.secret,
                    {expiresIn: '1h'}
                )

                res.status(200).json({token: token, userId: user._idUzytkownik ,_idRola: user.rola})
            }).catch(err => {
            console.log(err)
            res.status(501)
        })
    })
}