import express from "express";
const router = express.Router();

import ItemsController from "../Controllers/ItemsController.js";


import auth from "../middlewares/authMiddleware.js";

const { verifyToken, checkRole } = auth;
import parser from "../Config/cloundarnymulter.js";
// 👉 Create Item for a Restaurant
router.post(
  "/:restaurantId/items",
  parser.array("images", 5),
  verifyToken,
  checkRole(["owner", "admin"]),

  ItemsController.createItem
);

// 👉 Get all items
router.get("/getAllItems", ItemsController.getAllItems);

// 👉 Get single item by ID
router.post(
  "/getItemById/:restaurantId",
  ItemsController.getItemsByRestaurantId
);

// 👉 Update item
router.put(
  "/updateItem/:id",
  verifyToken,
  checkRole(["owner", "admin"]),
  parser.single("image"),
  ItemsController.updateItem
);

// 👉 Delete item
router.delete(
  "/items/:itemId",
  verifyToken,
  checkRole(["owner", "admin"]),
  ItemsController.deleteItem
);

export default router;
