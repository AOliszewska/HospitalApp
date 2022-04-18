
const uzytChorobaRepository = require('../repository/mysql2/UserDiseaseRepository');
const uzytkownikRepository = require("../repository/mysql2/UserRepository");
const chorobaRepository = require("../repository/mysql2/DiseaseRepository");

exports.showDiseasePatientList = (req, res, next ) => {
    uzytChorobaRepository.getUserDisease().then(usersdisease => {
        res.render('pages/PacjentChoroba/list', {
            usersdisease: usersdisease,
            navLocation: 'userdisease'
        });
    });
}


exports.showAddDiseasePatientForm  = (req, res, next ) => {
    let allPatient, allDiseases;
    uzytkownikRepository.getUser().then(uzytkownik => {
        allPatient=uzytkownik;
        return chorobaRepository.getDisease();
    }).then(choroba => {
        allDiseases=choroba;
    res.render('pages/PacjentChoroba/form', {
        users : {},
        allPatient: allPatient,
        allDiseases: allDiseases,
        pageTitle: req.__('patientdisease.list.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('patientdisease.list.addNew'),
        formAction: '/PacjentChoroba/add',
        navLocation: 'userdisease',
        dataServer: true,
        validationErrors: []
    });
    });
}
exports.addPatientDisease= (req,res,next) => {
    const userdiseaseData = {...req.body};
    if (userdiseaseData._idChoroba === 'null')
        userdiseaseData._idChoroba=null;
    if (userdiseaseData._idUzytkownik === 'null')
        userdiseaseData._idUzytkownik=null;
    let allPatient, allDiseases;
    uzytkownikRepository.getUser().then(uzytkownik => {
        allPatient = uzytkownik;
        return chorobaRepository.getDisease();
    }).then(choroba => {
        allDiseases = choroba;
        uzytChorobaRepository.createUserDisease(userdiseaseData).then(result => {
                res.redirect('/PacjentChoroba');
            }).catch(err => {
            console.log(err);
            res.render('pages/PacjentChoroba/form', {
                users: userdiseaseData,
                allPatient: allPatient,
                allDiseases: allDiseases,
                pageTitle: req.__('patientdisease.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('patientdisease.form.add.btnLabel'),
                formAction: '/PacjentChoroba/add',
                navLocation: 'userdisease',
                dataServer: false,
                validationErrors: err.details
            });
        });
    });
}


exports.showModifyDiseasePatient  = (req, res, next ) => {
    const userId = req.params.userId;
    let user;
    let allPatient, allDiseases;
    console.log("modifybez1")
    uzytkownikRepository.getUser().then(uzytkownik => {
        allPatient=uzytkownik;
        return chorobaRepository.getDisease();
    }).then(choroba => {
        allDiseases = choroba;
        return uzytChorobaRepository.getUserDiseaseId(userId);
    }).then( users => {
        user=users;
        res.render('pages/PacjentChoroba/form', {
            users: users,
            allPatient: allPatient,
            allDiseases: allDiseases,
            formMode: 'edit',
            pageTitle: req.__('patientdisease.form.edit.pageTitle'),
            btnLabel: req.__('patientdisease.form.edit.btnLabel'),
            formAction: '/PacjentChoroba/modify',
            navLocation: 'users',
            dataServer: true,
            validationErrors: []
        });
    });

}
exports.modifyPatient = (req,res, next) => {
    const userId = req.body._idUzytkownikChoroba;
    const userData = {...req.body};
    let allPatient, allDiseases;
    if (userData._idChoroba === 'null')
        userData._idChoroba=null;
    if (userData._idUzytkownik === 'null')
        userData._idUzytkownik=null;
    console.log(userId + "modify");
    uzytkownikRepository.getUser().then(uzytkownik => {
        allPatient=uzytkownik;
        return chorobaRepository.getDisease();
    }).then(choroba => {
        allDiseases = choroba
        uzytChorobaRepository.updateUserDisease(userId, userData).then(
            result => {
                res.redirect('/PacjentChoroba');
            }).catch(err => {
                console.log(userData);
            res.render('pages/PacjentChoroba/form', {
                users: userData,
                allPatient: allPatient,
                allDiseases: allDiseases,
                formMode: 'edit',
                pageTitle: req.__('patientdisease.form.edit.pageTitle'),
                btnLabel: req.__('patientdisease.form.edit.btnLabel'),
                formAction: '/PacjentChoroba/modify',
                navLocation: 'users',
                dataServer: false,
                validationErrors: err.details
            });
        });
    });
}
exports.showDiseasePatientDetails  = (req, res, next ) => {
    const userId = req.params.userId;
    console.log(userId + "tuttutuut");
    uzytChorobaRepository.getUserDiseaseId(userId).then(user => {
        console.log(user);
        res.render('pages/PacjentChoroba/list-details', {
            users: user,
            pageTitle: req.__('patientdisease.form.details.information'),
            formMode: 'showDetails',
            formAction: '',
            navLocation: 'user'
        });
    });
}

exports.showModifyDiseasePatient1  = (req, res, next ) => {
    console.log("modify1")
    const userId = req.params.userId;
    console.log("wchodzi");
    console.log(userId);
    let user;
    let allPatient, allDiseases;
    uzytkownikRepository.getUser().then(uzytkownik => {

        allPatient=uzytkownik;
        return chorobaRepository.getDisease();
    }).then(choroba => {
        allDiseases = choroba;
        return uzytChorobaRepository.getUserDiseaseId(userId);
    }).then( users => {
        res.render('pages/PacjentChoroba/form', {
            users: users,
            allPatient: allPatient,
            allDiseases: allDiseases,
            formMode: 'modify',
            pageTitle: req.__('patientdisease.form.edit.pageTitle'),
            btnLabel: req.__('patientdisease.form.edit.btnLabel'),
            formAction: '/PacjentChoroba/details/modify',
            navLocation: 'users',
            dataServer: true,
            validationErrors: []
        });
    });
}

exports.modifyPatient1 = (req,res, next) => {
    const userId = req.body._idUzytkownik;
    const userData = {...req.body};
    let allPatient, allDiseases;
    if (userData._idChoroba === 'null')
        userData._idChoroba=null;
    if (userData._idUzytkownik === 'null')
        userData._idUzytkownik=null;
    console.log(userId + "modify");
    uzytkownikRepository.getUser().then(uzytkownik => {
        allPatient=uzytkownik;
        return chorobaRepository.getDisease();
    }).then(choroba => {
        allDiseases = choroba
        uzytChorobaRepository.updateUserDisease(userId, userData).then(
            result => {
                res.redirect('/PacjentChoroba/details/'+ userData._idUzytkownikChoroba);
            }).catch(err => {
            console.log(userData);
            res.render('pages/PacjentChoroba/form', {
                users: userData,
                allPatient: allPatient,
                allDiseases: allDiseases,
                formMode: 'edit',
                pageTitle: req.__('patientdisease.form.edit.pageTitle'),
                btnLabel: req.__('patientdisease.form.edit.btnLabel'),
                formAction: '/PacjentChoroba/modify',
                navLocation: 'users',
                dataServer: false,
                validationErrors: err.details
            });
        });
    });
}


exports.showEditPatient  = (req, res, next ) => {
    const userId = req.params.userId;
    console.log(userId);
    uzytkownikRepository.getUserId(userId).then(users => {
        res.render('pages/PacjentChoroba/form-edit1', {
            users: users,
            formMode: 'edit',
            pageTitle: req.__('patien.form.edit.pageTitle') + userId,
            btnLabel: req.__('patien.form.edit.btnLabel') ,
            formAction: '/'+userId,
            navLocation: 'user'
        });
    });
}
exports.modifyProfile  = (req, res, next ) => {
    const userId = req.body._idUzytkownik;
    const userData = {...req.body};
    console.log(userId + "modify");
    uzytkownikRepository.updateUser(userId,userData)
        .then ( result =>{
            res.redirect('/');
        });
}

exports.deletePatientDisease = (req, res, next ) =>{
    const userId = req.params.userId;
    console.log(userId);
    uzytChorobaRepository.deleteUserDisease(userId).then ( ()=> {
        res.redirect('/PacjentChoroba');
    });
}