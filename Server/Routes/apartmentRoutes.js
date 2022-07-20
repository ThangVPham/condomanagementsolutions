const express = require('express');
const apartmentController = require('../Controllers/apartmentController')
const router = express.Router();
const isAuth = require('../../authentication').isAuth

//View list of apartments
router.get('/apartment', isAuth,apartmentController.apartmentDisplay)
//Create new apartment unit
router.get('/new-unit', isAuth,apartmentController.apartmentAddForm);
router.post('/apartment-add', isAuth,apartmentController.apartmentAddProcess)
//View Individual Apartment
// router.get('/apartment/:id', isAuth,apartmentController.apartmentUnitDisplay)
//Delete Apartment profile
router.get('/apartment/delete/:id', isAuth,apartmentController.apartmentDeleteProcess)
//Edit apartment
router.get('/apartment/edit/:id', isAuth,apartmentController.apartmentEditForm)
router.post('/apartment/edit/:id', isAuth,apartmentController.apartmentEditProcess)

module.exports = router;