const express = require("express");
const amenitybookingController = require("../Controllers/amenitybookingController");
const router = express.Router();
const isAuth = require("../../authentication").isAuth;

router.get("/amenity", isAuth, amenitybookingController.amenityDisplay);
router.post("/amenity", isAuth, amenitybookingController.amenityBookingProcess);
router.get("/moving", isAuth, amenitybookingController.movingPageDisplay);
router.get(
  "/elevatorbooking",
  isAuth,
  amenitybookingController.elevatorBookingFormDisplay
);
router.post(
  "/elevatorbooking",
  isAuth,
  amenitybookingController.elevatorBookingProcess
);
router.get(
  "/myreservation",
  isAuth,
  amenitybookingController.myreservationDisplay
);
router.get(
  "/myreservation/:id",
  isAuth,
  amenitybookingController.myreservationDelete
);
module.exports = router;
