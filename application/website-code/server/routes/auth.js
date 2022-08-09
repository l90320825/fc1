const express = require("express");
const router = express.Router();

const {
  restaurantRegister,
  delivererRegister,
  approvedUserRegister,
  restaurantLogin,
  delivererLogin,
  approvedUserLogin,
} = require("../controller/authController");

// Register Route
router.post("/registerRestaurant", restaurantRegister);
router.post("/registerDeliverer", delivererRegister);
router.post("/registerApprovedUser", approvedUserRegister);

// Login Routes
router.post("/restaurantLogin", restaurantLogin);
router.post("/delivererLogin", delivererLogin);
router.post("/userLogin", approvedUserLogin);
module.exports = router;
