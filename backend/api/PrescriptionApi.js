const receptaRepository = require('../repository/mysql2/PrescriptionRepository');



exports.getPerDisease = (req,res,next) => {
    receptaRepository.getPerDisease().then(choroby => {
        res.status(200).json(choroby);
    }).catch(err => {
        console.log(err);
    });

}

exports.getPerId = (req,res,next) => {
    console.log("api");
    const idpres = req.params.idpres;

    receptaRepository.getPerId(idpres)
        .then(user => {
            if(!user){
                res.status(404).json({
                    message: 'Prescription with id: '+idpres+' not found'
                })
            }else {
                res.status(200).json(user);
            }
        });
};
exports.getPerIdRecepta = (req,res,next) => {
    const userDiseaseId = req.params.idpres;
    console.log(userDiseaseId);
    receptaRepository.getPerIdRecepta(userDiseaseId)
        .then(user => {
            if(!user){
                res.status(404).json({
                    message: 'Prescription with id: '+userDiseaseId+' not found'
                })
            }else {
                res.status(200).json(user);
            }
        });
};

exports.createPre = (req, res, next )=> {
    console.log(req.body)
    receptaRepository.createPre(req.body)
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

exports.updatePre = (req, res, next )=> {
    console.log(req.body)
    const presId = req.params.presId;
    console.log(presId)
    receptaRepository.updatePreId(presId,req.body)
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
exports.deletePres = (req, res, next )=> {
    const presId = req.params.presId;
    console.log(presId);
    receptaRepository.deletepres(presId).then(result =>{
        res.status(200).json({message: 'Removed prescription!', pres: result});
    }).catch(err => {
        if(!err.statusCode){
            console.log("wchodzi apidddd");
            err.statusCode=500;
        }
        next(err);
    });
};
