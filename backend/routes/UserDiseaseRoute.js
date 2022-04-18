const express = require('express');
const router = express.Router();
const pacjentChorobaControler= require ('../controllers/UserDiseaseController');


router.get('/', pacjentChorobaControler.showDiseasePatientList);


router.get('/add', pacjentChorobaControler.showAddDiseasePatientForm );
router.post('/add', pacjentChorobaControler.addPatientDisease );


router.get('/details/:userId', pacjentChorobaControler.showDiseasePatientDetails);


router.get('/modify/:userId', pacjentChorobaControler.showModifyDiseasePatient);
router.post('/modify', pacjentChorobaControler.modifyPatient);

router.get('/details/modify/:userId', pacjentChorobaControler.showModifyDiseasePatient1 );
router.post('/details/:userId', pacjentChorobaControler.modifyPatient1);

// router.get('/details/modifyPatient/:userId', pacjentChorobaControler.showEditPatient);
// router.post('/:userId', pacjentChorobaControler.modifyProfile);

router.get('/delete/:userId', pacjentChorobaControler.deletePatientDisease);

module.exports=router;
