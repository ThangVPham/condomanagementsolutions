const express = require('express');
const maintenanceRequest = require('../Models/maintenanceRequest');
const maintenanceRequestController = require('../Controllers/maintenanceRequestController');
const isAuth = require('../../authentication').isAuth;

const workOrder = require('../Models/workOrder');
const moment = require('moment');
const router = express.Router();


router.get('/maintenancerequest', isAuth, maintenanceRequestController.maintenanceRequestDisplay);

router.post('/maintenancerequest', isAuth,maintenanceRequestController.maintenanceRequestAdd);

router.get('/myrequest', isAuth, maintenanceRequestController.myrequestDisplay)

router.post('/myrequests-edit/:id', isAuth, maintenanceRequestController.requestsHandlingProcess)

module.exports = router;