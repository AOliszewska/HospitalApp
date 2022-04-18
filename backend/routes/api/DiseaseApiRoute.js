const express = require('express');
const router = express.Router();

const diseaseApiController= require('../../api/DiseaseApi');
const isAuth = require("../../middleware/isAuth");
const IsDoctor = require("../../middleware/IsDoctor");

router.get('/', diseaseApiController.getDisease);
router.get('/:diseaseId', diseaseApiController.getDiseaseId);
router.post('/',IsDoctor, diseaseApiController.createDisease);
router.put('/:diseaseId',IsDoctor, diseaseApiController.updateDisease);
router.delete('/:diseaseId',IsDoctor, diseaseApiController.deleteDisease);

module.exports=router;


