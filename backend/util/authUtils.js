const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

exports.hashPassowrd = (passPlain) => {
    passHashed = bcrypt.hashSync(passPlain, salt);
    return passHashed;
}
exports.comparePassword = (passPlain, passHash) => {
    const res = bcrypt.compareSync(passPlain, passHash);
    return res;
}
exports.permitAuthenticatedUser3 = (req, res, next) => {
    const loggedUser= req.session.loggedUser;
    if(loggedUser && loggedUser.rola===3){
        next();
    }else{
        throw new Error('unautorized access');
    }
}
exports.permitAuthenticatedUser2 = (req, res, next) => {
    const loggedUser= req.session.loggedUser;
    if(loggedUser && (loggedUser.rola===2 || loggedUser.rola===3)){
        next();
    }else{
        throw new Error('unautorized access');
    }
}