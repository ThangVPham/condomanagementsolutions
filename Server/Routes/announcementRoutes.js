const express = require('express');
const announcementController = require('../Controllers/announcementController');
const isAuth = require('../../authentication').isAuth

const router = express.Router();

//Read
router.get('/announcement', isAuth,announcementController.announcementDisplay)
router.get('/create-announcement', isAuth,announcementController.announcementAddForm)
//Add
<<<<<<< HEAD
router.post('/create-announcement', isAuth,announcementController.announcementAddProcess)
=======
router.post('/announcement/add', isAuth,announcementController.announcementAddProcess)
>>>>>>> 17174505b80d5ba118da070e1e97c5ef8c749744
//Edit
router.get('/announcement/edit/:id', isAuth,announcementController.announcementEditForm)
router.post('/announcement/edit/:id', isAuth,announcementController.announcementEditProcess)
//Delete
router.get('/announcement/delete/:id', isAuth,announcementController.announcementDeleteProcess)


module.exports = router;