const express = require('express')
const router = express.Router();

const apiAuthController = require('../../api/AuthApi');

router.post('/login', apiAuthController.login);

module.exports=router;