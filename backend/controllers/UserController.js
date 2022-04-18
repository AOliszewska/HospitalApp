const uzytkownikRepository = require('../repository/mysql2/UserRepository');

exports.showPatientList = (req, res, next ) => {
    uzytkownikRepository.getUser().then(users => {
        res.render('pages/Patients/list', {
            users: users,
            navLocation: 'user',
            pageTitle: req.__('user.list.title')
        });
    });
}

exports.showAddPatientForm  = (req, res, next ) => {
    res.render('pages/Patients/form', {
        users : {},
        pageTitle: req.__('user.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('user.form.add.btnLabel'),
        formAction: '/Patients/add',
        navLocation: 'user',
        data : false,
        validationErrors: []
    });
}
exports.addPatient= (req,res,next) => {
    const userData = { ...req.body};
    uzytkownikRepository.createUser(userData).then(result => {
        res.redirect('/Patients');
    }).catch(err => {
        console.log(userData.haslo);
        res.render('pages/Patients/form', {
            users : userData,
            pageTitle: req.__('user.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('user.form.add.btnLabel'),
            formAction: '/Patients/add',
            navLocation: 'user',
            data : true,
            validationErrors: err.details
        });
    });
};
exports.showPatientDetails  = (req, res, next ) => {
    const userId = req.params.userId;
    uzytkownikRepository.getUserId(userId).then(user => {
        res.render('pages/Patients/patient-profile', {
            users: user,
            pageTitle: req.__('user.details.patientdetails'),
            formMode: 'showDetails',
            formAction: '',
            navLocation: 'user'
        });
    });
}

exports.showModifyPatient = (req, res, next ) => {
    const userId = req.params.userId;
    console.log(userId + "modify");
    uzytkownikRepository.getUserId(userId).then(users => {
        console.log(users.dataUrodzenia);
        res.render('pages/Patients/form', {
            users: users,
            formMode: 'modify',
            pageTitle: req.__('user.form.edit.pageTitle'),
            btnLabel: req.__('user.form.edit.btnLabel'),
            formAction: '/Patients/modify',
            navLocation: 'user',
            data : false,
            validationErrors: []
        });
    });
}
exports.modifyPatient = (req,res, next) => {
    const userId = req.body._idUzytkownik;
    const userData = {...req.body};
    uzytkownikRepository.updateUser(userId,userData)
        .then ( result =>{
           res.redirect('/Patients');
        }).catch( err => {
            console.log(userData);
        res.render('pages/Patients/form', {
            users: userData,
            formMode: 'modify',
            pageTitle: req.__('user.form.edit.pageTitle'),
            btnLabel: req.__('user.form.edit.btnLabel'),
            formAction: '/Patients/modify',
            navLocation: 'user',
            data : true,
            validationErrors: err.details
        });
    });
}


exports.showMyProfil = (req, res, next ) => {
    const loggedUser= req.session.loggedUser;
    uzytkownikRepository.getUserId(loggedUser._idUzytkownik).then(user => {
        res.render('pages/Patients/doctor-profile', {
            users: user,
            pageTitle: req.__('user.profile.profile'),
            formMode: 'showDetails',
            formAction: '',
            navLocation: 'user'
        });
    });

}
// exports.modifyMyProfile = (req,res, next) => {
//     const userId = req.body._idUzytkownik;
//     console.log(userId)
//     const userData = {...req.body};
//     console.log("wchodzi");
//     uzytkownikRepository.updateUser(userId,userData)
//         .then ( result =>{
//             res.redirect('/Patients');
//         });
// }
// exports.showModifyMyProfil = (req, res, next ) => {
//     const userId = req.params.userId;
//     console.log(userId);
//     uzytkownikRepository.getUserId(userId).then(users => {
//         res.render('pages/Patients/doctor-profile-edit', {
//             users: users,
//             formMode: 'edit',
//             pageTitle: 'Edycja profil ',
//             btnLabel: 'Edytuj profil',
//             formAction: '/Patients/modify',
//             navLocation: 'user'
//         });
//     });
// }

exports.deletePatient = (req, res, next ) =>{
    const userId = req.params.userId;
    uzytkownikRepository.deleteUser(userId).then ( ()=> {
        res.redirect('/Patients');
    });
}
