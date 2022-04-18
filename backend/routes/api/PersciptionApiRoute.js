const express = require('express');
const router = express.Router();

const prescriptionApiController = require('../../api/PrescriptionApi');
const isAuth = require("../../middleware/isAuth");
const IsDoctor = require("../../middleware/IsDoctor");
const IsUser = require("../../middleware/IsUser");

router.get('/',isAuth, prescriptionApiController.getPerDisease);
router.get('/:idpres',isAuth, prescriptionApiController.getPerId);
router.get('/:userDiseaseId/:idpres',isAuth,prescriptionApiController.getPerIdRecepta);
router.post('/',IsDoctor, prescriptionApiController.createPre);
router.put('/:presId',IsDoctor, prescriptionApiController.updatePre);
router.delete('/:presId',IsDoctor, prescriptionApiController.deletePres);

/*
router.get('/one/:userDiseaseId', prescriptionApiController.getUserDiseaseSingle);
router.put('/:userDiseaseId', prescriptionApiController.updateUserDisease);
*/

module.exports=router;

