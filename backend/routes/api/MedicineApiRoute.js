const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');
const IsDoctor = require('../../middleware/IsDoctor');

const medicineApiController = require('../../api/MedicineApi');

router.get('/', medicineApiController.getMedicines);
router.get('/:medicineId', medicineApiController.getMedicineId);
router.post('/',IsDoctor, medicineApiController.createMedicine);
router.put('/:medicineId', IsDoctor, medicineApiController.updateMedicine);
router.delete('/:medicineId',IsDoctor, medicineApiController.deleteMedicine);

module.exports=router;

