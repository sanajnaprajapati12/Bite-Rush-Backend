// routes/otpRoutes.js
import express from "express";

import otpController from "../Controllers/otpController.js";
const router = express.Router();

router.post("/send-otp", otpController.sendOtp);
router.post("/verify-otp", otpController.verifyOtp);

export default router;
