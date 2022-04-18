const chorobaRepository = require('../repository/mysql2/DiseaseRepository');

exports.showDiseaseList = (req, res, next ) => {
    chorobaRepository.getDisease().then(diseases => {
        res.render('pages/Disease/list', {
            diseases: diseases,
            navLocation: 'disease'
        });
    });

}

exports.showAddDiseaseForm  = (req, res, next ) => {
    console.log("wchodzi");

    res.render('pages/Disease/form', {
        diseases : {},
        allOptions: [true,false],
        pageTitle: req.__('disease.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('disease.form.add.btnLabel'),
        formAction: '/Disease/add',
        navLocation: 'disease',
        validationErrors: []
    });
};

exports.addDisease= (req,res,next) => {
    console.log("wchodzi");
    const diseaseData = { ...req.body};
    chorobaRepository.createDisease(diseaseData).then(result => {
        res.redirect('/Disease');
    }).catch(err => {
        console.log(diseaseData)
        res.render('pages/Disease/form', {
            diseases : diseaseData,
            allOptions: [true,false],
            pageTitle: req.__('disease.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('disease.form.add.btnLabel'),
            formAction: '/Disease/add',
            navLocation: 'disease',
            validationErrors: err.details

        });
    });
};


exports.showModifyDisease  = (req, res, next ) => {
    const diseaseId = req.params.diseaseId;
    console.log(diseaseId + "controller");
    chorobaRepository.getDiseasebyId(diseaseId).then(disease => {
        res.render('pages/Disease/form', {
            diseases: disease,
            formMode: 'edit',
            allOptions: [true,false],
            pageTitle: req.__('disease.form.edit.pageTitle')  + " " + diseaseId,
            btnLabel: req.__('disease.form.edit.btnLabel'),
            formAction: '/Disease/modify',
            navLocation: 'disease',
            validationErrors: []
        });
    });
};
exports.modifyDisease = (req,res, next) => {
    const diseaseId = req.body._idChoroba;
    const diseaseData = {...req.body};
    chorobaRepository.updateDisease(diseaseId,diseaseData)
        .then ( result =>{
            res.redirect('/Disease');
        }).catch(err => {
        res.render('pages/Disease/form', {
            diseases: diseaseData,
            formMode: 'edit',
            allOptions: [true,false],
            pageTitle: req.__('disease.form.edit.pageTitle')  + " " + diseaseId,
            btnLabel: req.__('disease.form.edit.btnLabel'),
            formAction: '/Disease/modify',
            navLocation: 'disease',
            validationErrors: err.details
        });
    });
}
exports.showDiseaseDetails  = (req, res, next ) => {
    const diseaseId = req.params.diseaseId;
    console.log(diseaseId)
    chorobaRepository.getDiseasebyId(diseaseId).then(diseases => {
        res.render('pages/Disease/list-details', {
            diseases: diseases,
            pageTitle: req.__('disease.details.patientdetails') + " " + diseaseId,
            formMode: 'showDetails',
            formAction: '',
            navLocation: 'disease'
        });
    });
}
exports.deleteDisease  = (req, res, next ) => {
    const diseaseId = req.params.diseaseId;
   chorobaRepository.deleteDisease(diseaseId).then ( ()=> {
        res.redirect('/Disease');
    });
}
