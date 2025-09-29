import express from "express";

import orderController from "../Controllers/orderController.js";
const router = express.Router();
import auth from "../middlewares/authMiddleware.js";

const { verifyToken, checkRole } = auth;

router.post("/create-order", orderController.createOrder);

// Get all orders for a user

router.get(
  "/user/:id",
  verifyToken,
  checkRole(["customer", "user", "admin"]),
  orderController.getUserOrders
);

// Get all orders for a restaurant
router.get("/restaurant-order/:restaurantId", orderController.getRestaurantOrders);

router.patch(
  
  "/orders/:orderId/status",
  verifyToken,
  checkRole(["owner", "admin"]),
  orderController.updateOrderStatus
);

router.patch(
  "/orders/:orderId/confirm",
  verifyToken,
  checkRole(["customer","user"]), // ✅ only customers can confirm
 orderController.confirmOrderByUser
);
router.patch(
  "/orders/:orderId/cancel",
  verifyToken,
  checkRole(["customer","user"]),
  orderController.cancelOrder
);
router.get(
  "/orders/stats",
  verifyToken,
  checkRole(["admin", "owner"]), // ✅ only admin/owner dashboard
  orderController.getOrderStats
);


export default router;
