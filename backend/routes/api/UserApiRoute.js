const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');
const diseaseApiController= require('../../api/UserAPI');
const IsDoctor = require("../../middleware/IsDoctor");
const IsUser = require("../../middleware/IsUser");

router.get('/',IsDoctor, diseaseApiController.getUser);
router.get('/:userId',isAuth, diseaseApiController.getUserId);
router.post('/',IsDoctor,diseaseApiController.createUser);
router.put('/:userId',IsUser, diseaseApiController.updateUser);
router.delete('/:userId', IsDoctor ,diseaseApiController.deleteUser);

module.exports=router;

