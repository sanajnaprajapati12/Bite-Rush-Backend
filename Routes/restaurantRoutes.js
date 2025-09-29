import express from "express";
import restaurantController from "../Controllers/restaurantController.js";
import parser from "../Config/cloundarnymulter.js";
import auth from "../middlewares/authMiddleware.js";

const { verifyToken, checkRole } = auth;
const router = express.Router();

router.post(
  "/createrestaurant",
  verifyToken,
  checkRole(["owner", "admin"]),
  parser.array("images", 5), // allow up to 5 images
  restaurantController.createRestaurant
);

// 👉 Get all restaurants
router.post("/getrestaurants", restaurantController.getRestaurants);

// 👉 Get restaurant by ID
router.get("/getrestaurants/:id", restaurantController.getRestaurantById);

// 👉 Update restaurant
router.put(
  "/update/:id",
  verifyToken,
  checkRole(["owner", "admin"]),
  parser.array("images", 5),
  restaurantController.updateRestaurant
);

// 👉 Delete restaurant
router.delete(
  "/delete/:id",
  verifyToken,
  checkRole(["owner", "admin"]),
  restaurantController.deleteRestaurant
);

export default router;
//oDER TABLE JISME CREATE ODER -RETSURENT ID
// ITEMS ID-NAME-PRICE-JO // QUNTITY ADD TO CARD KIYE VO JANA CHAIYE
// USER-ID
// PAYMENT MODE
// PAID  OR UNPAID
// QUNTITY---PLACE ODER PE LCIK KRNE PE-
// GET ODER BY RESTURENT ID SE