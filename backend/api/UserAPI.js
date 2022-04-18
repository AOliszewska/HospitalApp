const userRepository = require('../repository/mysql2/UserRepository');

exports.getUser = (req,res,next) => {
    userRepository.getUser().then(user => {
        res.status(200).json(user);
    }).catch(err => {
        console.log(err);
    });

}

exports.getUserId = (req,res,next) => {
    const userId = req.params.userId;
    console.log(userId);
    userRepository.getUserId(userId)
        .then(user => {
            if(!user){
                res.status(404).json({
                    message: 'User with id: '+userId+' not found'
                })
            }else {
                res.status(200).json(user);
            }
        });
};

exports.createUser = (req, res, next )=> {
    userRepository.createUser(req.body)
        .then(newObj =>{
            res.status(201).json(newObj);
        }).catch(err => {
        if(!err.statusCode){
            err.statusCode=500;
        }
        res.status(500).json(err.details);
        next(err);
    });
};
exports.updateUser = (req, res, next )=> {
    const userId = req.params.userId;
    console.log(userId);
    console.log("body")
    console.log(req.body);
    userRepository.updateUser(userId,req.body).then(result =>{
        res.status(201).json({message: 'Update user!', user: result});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode=500;
        }
        res.status(500).json(err.details);
        next(err);
    });

};
exports.deleteUser = (req, res, next )=> {
    const userId = req.params.userId;
    console.log("deleteuser" + userId);
    userRepository.deleteUser(userId).then(result =>{
        res.status(200).json({message: 'Removed user!', user: result});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    });
};