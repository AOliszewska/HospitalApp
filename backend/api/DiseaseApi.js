const chorobyRepository = require('../repository/mysql2/DiseaseRepository');

exports.getDisease = (req,res,next) => {
    chorobyRepository.getDisease().then(choroby => {
        res.status(200).json(choroby);
    }).catch(err => {
        console.log(err);
    });

}

exports.getDiseaseId = (req,res,next) => {
    const diseaseId = req.params.diseaseId;
    chorobyRepository.getDiseasebyId(diseaseId)
        .then(choroby => {
        if(!choroby){
            res.status(404).json({
                message: 'Disease with id: '+diseaseId+' not found'
            })
        }else {
            res.status(200).json(choroby);
        }
        });
};

exports.createDisease = (req, res, next )=> {
    chorobyRepository.createDisease(req.body)
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
exports.updateDisease = (req, res, next )=> {
    const diseaseId = req.params.diseaseId;
    chorobyRepository.updateDisease(diseaseId,req.body)
        .then(result =>{
        res.status(201).json({message: 'Disease updated!', disease: result});
        }).catch(err => {
        if(!err.statusCode){
            err.statusCode=500;
        }
        res.status(500).json(err.details);
        next(err);
    });

};
exports.deleteDisease = (req, res, next )=> {
    const diseaseId = req.params.diseaseId;
    chorobyRepository.deleteDisease(diseaseId).then(result =>{
        res.status(200).json({message: 'Removed disease!', disease: result});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    });
};