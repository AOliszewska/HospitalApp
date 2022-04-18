const express = require('express');
const router = express.Router();
const pacjenciControler= require ('../controllers/UserController');

router.get('/', pacjenciControler.showPatientList);

router.get('/add', pacjenciControler.showAddPatientForm);
router.post('/add', pacjenciControler.addPatient);

router.get('/details/:userId', pacjenciControler.showPatientDetails);


router.get('/modify/:userId', pacjenciControler.showModifyPatient);
router.post('/modify', pacjenciControler.modifyPatient);


router.get('/delete/:userId', pacjenciControler.deletePatient);



module.exports=router;
