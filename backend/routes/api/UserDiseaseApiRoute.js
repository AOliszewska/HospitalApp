const express = require('express');
const router = express.Router();

const diseaseApiController= require('../../api/UserDisease');
const isAuth = require("../../middleware/isAuth");
const IsDoctor = require("../../middleware/IsDoctor");
const IsUser = require("../../middleware/IsUser");

router.get('/', isAuth, diseaseApiController.getUserDisease);
router.get('/:userDiseaseId',isAuth,diseaseApiController.getUserDiseaseId);
router.get('/one/:userDiseaseId',isAuth, diseaseApiController.getUserDiseaseSingle);
router.post('/', IsDoctor,diseaseApiController.createUserDiseases);
router.put('/:userDiseaseId',IsDoctor, diseaseApiController.updateUserDisease);
router.delete('/:userDiseaseId',IsDoctor, diseaseApiController.deleteUserDiseases);

module.exports=router;

