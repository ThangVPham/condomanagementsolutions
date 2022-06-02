const express = require('express');
const parkingController = require('../Controllers/parkingController');
const isAuth = require('../../authentication').isAuth;

const router = express.Router();

router.get('/parking', isAuth,parkingController.parkingFormDisplay);
router.post('/parking', isAuth,parkingController.parkingFormProcess)

module.exports = router;