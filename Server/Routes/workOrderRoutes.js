const express = require('express');
const workOrderController = require('../Controllers/workOrderController');
const isAuth = require('../../authentication').isAuth;
const router = express.Router();

router.get('/workorder', isAuth,workOrderController.workOrderDisplay);
router.get('/create-ticket', isAuth,workOrderController.workOrderCreateTicketFormDisplay);//Display new ticket form from Create New Ticket button
router.post('/create-ticket', isAuth,workOrderController.workOrderCreateNewProcess); //Create new ticket from Create New Ticket button
router.get('/create-ticket/:request_id', isAuth,workOrderController.workOrderDetailsFormDisplay); //Display New Work Order form from Create New W.O button in Request Page
router.post('/create-ticket/:request_id', isAuth,workOrderController.workOrderAssignWorkerProcess);//Create new ticket from Request Page

router.get('/edit-ticket/:ticket_id', isAuth,workOrderController.workOrderEditTicketFormDisplay); //Display edit form from Work Orders Page
router.post('/edit-ticket/:ticket_id', isAuth,workOrderController.workOrderEditTicketProcess);//Update ticket information
router.get('/edit-ticket/delete/:ticket_id', isAuth,workOrderController.workOrderTicketDeleteProcess)

module.exports = router;