const express = require('express');
const router = express.Router();
const chorobyControler= require ('../controllers/DiseaseController');
const authUtils = require ('../util/authUtils');



router.get('/', chorobyControler.showDiseaseList);

router.get('/add', authUtils.permitAuthenticatedUser3, chorobyControler.showAddDiseaseForm);
router.post('/add', authUtils.permitAuthenticatedUser3, chorobyControler.addDisease);

router.get('/details/:diseaseId', authUtils.permitAuthenticatedUser3, chorobyControler.showDiseaseDetails);


router.get('/modify/:diseaseId', authUtils.permitAuthenticatedUser3, chorobyControler.showModifyDisease);
router.post('/modify', authUtils.permitAuthenticatedUser3, chorobyControler.modifyDisease);

router.get('/delete/:diseaseId', authUtils.permitAuthenticatedUser3, chorobyControler.deleteDisease);


module.exports=router;
