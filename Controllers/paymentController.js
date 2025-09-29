

import razorpay from "../Config/razorpay.js";

import Payment from "../Models/paymentModel.js";
import User from "../Models/userModel.js";
import crypto from "crypto"
// ✅ Create Razorpay Order
const createOrder = async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    const userId = req.user.id; // from auth middleware

    // Fetch user info
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // Create Razorpay order
    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt:` order_rcptid_${orderId}`,
    };

    const order = await razorpay.orders.create(options);

    // Save Payment record
    const payment = new Payment({
      orderId,
      userId,
      razorpayOrderId: order.id,
      amount,
      status: "Created",
      email: user.email,
      contact: user.phone,
      history: [{ status: "Created", description: "Payment order created" }],
    });

    await payment.save();

    res.status(201).json({
      success: true,
      order,
      user: { name: user.name, email: user.email, contact: user.phone },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Verify Payment Signature
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const payment = await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: "Paid",
          $push: {
            history: { status: "Paid", description: "Payment successful" },
          },
        },
        { new: true }
      ).populate("userId", "name email phone");

      res.json({ success: true, message: "Payment verified", payment });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Payment History (per order or per user)
const getPaymentHistory = async (req, res) => {
  try {
    const { orderId } = req.params;
    const payments = await Payment.find({ orderId })
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Payments for a User
const getUserPayments = async (req, res) => {
  try {
    const userId = req.user.id;
    const payments = await Payment.find({ userId })
      .populate("orderId")
      .sort({ createdAt: -1 });

    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  createOrder,
  verifyPayment,
  getPaymentHistory,
  getUserPayments,
};
