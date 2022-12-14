const express = require("express");
const router = express.Router();
const isAuth = require("../../authentication").isAuth;

const {
  searchMaintenanceRequest,
  searchWorkOrder,
  searchApartment,
  searchAnnouncement,
} = require("../Controllers/searchController.js");

router.post("/myrequest/", isAuth, searchMaintenanceRequest);
router.post("/workorder/", isAuth, searchWorkOrder);
router.post("/apartment/", isAuth, searchApartment);
router.post("/announcement/", isAuth, searchAnnouncement);

module.exports = router;
