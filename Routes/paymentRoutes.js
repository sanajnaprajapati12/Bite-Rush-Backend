// routes/paymentRoutes.js
import express from "express";

import paymentController from "../Controllers/paymentController.js";


const router = express.Router();


import auth from "../middlewares/authMiddleware.js";
const { verifyToken, checkRole } = auth;




// Create Razorpay order
router.post("/create-order", verifyToken, paymentController.createOrder);

// Verify payment
router.post("/verify-payment", verifyToken, paymentController.verifyPayment);


router.get(
  "/history/:orderId",
  verifyToken,
  paymentController.getPaymentHistory
);


router.get("/my-payments", verifyToken, paymentController.getUserPayments);

export default router