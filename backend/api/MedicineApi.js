const medicineRepository = require('../repository/mysql2/MedicineRepository');
const chorobyRepository = require("../repository/mysql2/DiseaseRepository");


exports.getMedicines = (req,res,next) => {
    medicineRepository.getMedicine().then(med => {
        res.status(200).json(med);
    }).catch(err => {
        console.log(err);
    });

}

exports.getMedicineId = (req,res,next) => {
    const id = req.params.medicineId;
    console.log(id);
    medicineRepository.getMedicineId(id)
        .then(med => {
            if(!med){
                res.status(404).json({
                    message: 'Med with id: '+id+' not found'
                })
            }else {
                res.status(200).json(med);
            }
        });
};

exports.createMedicine = (req, res, next )=> {
    medicineRepository.createMedicine(req.body)
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
exports.updateMedicine = (req, res, next )=> {
    const medicineId = req.params.medicineId;
    console.log(medicineId);
    console.log(req.body);
    medicineRepository.updateMedicine(medicineId,req.body).then(result =>{
        res.status(201).json({message: 'Update medicine!', user: result});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode=500;
        }
        res.status(500).json(err.details);
        next(err);
    });

};

exports.deleteMedicine = (req, res, next )=> {
    const medicineId = req.params.medicineId;
    medicineRepository.deleteMedicine(medicineId).then(result =>{
        res.status(200).json({message: 'Removed disease!', disease: result});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    });
};
