const express = require('express');
const router = express.Router();
const pacjentControler= require ('../controllers/UserController');

router.get('/', pacjentControler.showMyProfil);

module.exports=router;
