const opiniaRepository = require("../repository/mysql2/OpinionRepository");
const receptaRepository = require("../repository/mysql2/PrescriptionRepository");
const userchorobyRepository = require("../repository/mysql2/UserDiseaseRepository");

exports.getUser = (req,res,next) => {
    opiniaRepository.getListId().then(opinia => {
        res.status(200).json(opinia);
    }).catch(err => {
        console.log(err);
    });

}
exports.getUserDoctor= (req,res,next) => {
    const idpres = req.params.doctorId;
    opiniaRepository.getUser(idpres).then(opinia => {
        res.status(200).json(opinia);
    }).catch(err => {
        console.log(err);
    });

}
exports.getOpinion= (req,res,next) => {
    const idpres = req.params.doctorId;
    opiniaRepository.getUserOpinia(idpres).then(opinia => {
        res.status(200).json(opinia);
    }).catch(err => {
        console.log(err);
    });

}
exports.getOpinionId= (req,res,next) => {
    const idpres = req.params.opinionId;
    opiniaRepository.getOpinionId(idpres).then(opinia => {
        res.status(200).json(opinia);
    }).catch(err => {
        console.log(err);
    });

}
exports.createOpinion = (req, res, next )=> {
    console.log("OPINIAAPI")
    console.log(req.body)
    opiniaRepository.createOpinion(req.body)
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

exports.updateOpinion= (req, res, next )=> {
    const presId = req.params.opinionId;
    opiniaRepository.updateOpinionId(presId,req.body)
        .then(result =>{
            res.status(200).json({message: 'Update Prescription!', prescription: result});
        }).catch(err => {
        if(!err.statusCode){
            err.statusCode=500;
        }
        res.status(500).json(err.details);
        next(err);
    });

};
exports.deleteOpinion = (req, res, next )=> {
    const opinionId= req.params.opinionId;
    opiniaRepository.deleteOpinion(opinionId).then(result =>{
        res.status(200).json({message: 'Removed user!', opinion: result});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    });
};