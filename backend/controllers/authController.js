const uzytkownikRepository = require('../repository/mysql2/UserRepository');
const authUtil = require('../util/authUtils');

exports.showLoginPage = (req, res, next) => {
    res.render('pages/Login/login',
        {
            navLocation: ''
        });
}

exports.login= (req,res, next) => {
    const email = req.body.loginEmail;
    const password = req.body.loginPassword;
    uzytkownikRepository.findByEmail(email)
        .then(user => {
            if(!user){
                res.render('pages/Login/login', {
                    navLocation: '',
                    loginError: req.__('validationMessage.wrong')
                })
            } else if(authUtil.comparePassword(password, user.haslo)===true){
                req.session.loggedUser= user;
                res.redirect('/');
            }else {
                res.render('pages/Login/login', {
                    navLocation: '',
                    loginError: req.__('validationMessage.wrong')
                })
            }

    }).catch(err => {
        console.log(err);
    })
}
exports.logout = (req, res, next) => {
    req.session.loggedUser= undefined;
    res.redirect('/');
}