const userchorobyRepository = require('../repository/mysql2/UserDiseaseRepository');



exports.getUserDisease = (req,res,next) => {
    console.log("*****")
    userchorobyRepository.getUserDisease().then(choroby => {
        res.status(200).json(choroby);
    }).catch(err => {
        console.log(err);
    });

}

exports.getUserDiseaseId = (req,res,next) => {
    console.log("api");
    const userDiseaseId = req.params.userDiseaseId;

    userchorobyRepository.getUserDiseaseId(userDiseaseId)
        .then(user => {
            if(!user){
                res.status(404).json({
                    message: 'User with id: '+userDiseaseId+' not found'
                })
            }else {
                res.status(200).json(user);
            }
        });
};
exports.getUserDiseaseSingle = (req,res,next) => {
    console.log("api");
    const userDiseaseId = req.params.userDiseaseId;

    userchorobyRepository.getUserDiseaseSingle(userDiseaseId)
        .then(user => {
            if(!user){
                res.status(404).json({
                    message: 'User with id: '+userDiseaseId+' not found'
                })
            }else {
                res.status(200).json(user);
            }
        });
};

exports.createUserDiseases = (req, res, next )=> {
    userchorobyRepository.createUserDisease(req.body)
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
exports.updateUserDisease = (req, res, next )=> {
    const userDiseaseId = req.params.userDiseaseId;
    console.log(req.body);
    userchorobyRepository.updateUserDisease(userDiseaseId,req.body)
        .then(result =>{
        res.status(200).json({message: 'Update DiseaseUser!', userdisease: result});
        }).catch(err => {
        if(!err.statusCode){
            err.statusCode=500;
        }
        res.status(500).json(err.details);
        next(err);
    });

};
exports.deleteUserDiseases = (req, res, next )=> {
    const userDiseaseId = req.params.userDiseaseId;
    console.log( userDiseaseId);
    userchorobyRepository.deleteUserDisease(userDiseaseId).then(result =>{
        res.status(200).json({message: 'Removed user!', userdisease: result});
    }).catch(err => {
        if(!err.statusCode){
            console.log("wchodzi apidddd");
            err.statusCode=500;
        }
        next(err);
    });
};