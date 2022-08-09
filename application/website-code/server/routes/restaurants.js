const express = require("express");
const router = express.Router();
const {
  getAllRestaurants,
  getAllCuisineType,
  restaurantInfoUpload,
  uploadRestaurantMenu,
  getAllMenuItems,
  removeRestaurantMenuItem,
  checkRestaurantApproval,
  getRestaurantByOwner,
} = require("../controller/restaurantController");

const { restrictTo } = require("../controller/authController");

router.get("/getAllRestaurants", getAllRestaurants);

router.get("/getAllCuisineType", getAllCuisineType);

// restrict users to only restaurant
router.use(restrictTo("restaurant"));

router.post("/restaurantInfoUpload", restaurantInfoUpload);

router.post("/uploadRestaurantMenu", uploadRestaurantMenu);

router.get("/getAllMenuItems", getAllMenuItems);

router.get("/removeRestaurantMenuItem",removeRestaurantMenuItem);

router.get("/getRestaurantByID",checkRestaurantApproval);


router.get("/getRestaurantByOwner",getRestaurantByOwner);


module.exports = router;
