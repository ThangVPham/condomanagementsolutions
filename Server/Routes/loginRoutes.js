const express = require('express');
const router = express.Router();
const loginController = require('../Controllers/loginController');
const isAuth = require('../../authentication').isAuth;
router.get('/login', loginController.displayLoginPage);
router.post('/login',loginController.processLoginPage)
router.get('/register', loginController.displayRegisterPage);
router.post('/register',loginController.processRegisterPage);
router.get('/logout', loginController.processLogOut);
module.exports = router;