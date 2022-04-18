const express = require('express');
const router = express.Router();

const  opiniaController= require('../../api/OpinionApi');
const isAuth = require("../../middleware/isAuth");
const isOnlyUser = require("../../middleware/IsOnlyUser");

router.get('/',isAuth, opiniaController.getUser);
router.get('/:doctorId',isAuth, opiniaController.getUserDoctor);
router.get('/details/:doctorId',isAuth, opiniaController.getOpinion);
router.get('/opinion/:opinionId',isAuth, opiniaController.getOpinionId);
router.post('/', isAuth, opiniaController.createOpinion);
router.put('/:opinionId',isAuth, opiniaController.updateOpinion);
router.delete('/:opinionId',isAuth, opiniaController.deleteOpinion);

module.exports=router;

