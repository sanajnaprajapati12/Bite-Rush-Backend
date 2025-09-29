import Order from "../Models/orderModel.js";
import mongoose from "mongoose";

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { restaurantId, userId, items, paymentMode, deliveryAddress } =
      req.body;

    if (!restaurantId || !userId || !items?.length || !deliveryAddress) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order = new Order({
      restaurantId, // Mongoose will cast string → ObjectId
      userId,
      items,
      totalAmount,
      paymentMode,
      paymentStatus: paymentMode === "COD" ? "Unpaid" : "Paid",
      deliveryAddress,
    });

    await order.save();

    res
      .status(201)
      .json({ success: true, message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders of a specific userconst getUserOrders = async (req, res) => {
   const getUserOrders = async (req, res) => {
  try {
    const { id: userId } = req.params; // user ID from route

    // ✅ Fetch all orders for the user
    const orders = await Order.find({ userId })
      .populate("restaurantId", "name")
      .populate("userId", "name email")
      .populate("items.itemId", "name price");

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for this user" });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  };

   }

// Get all orders of a restaurant
const getRestaurantOrders = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid restaurant ID" });
    }

    const orders = await Order.find({ restaurantId })
      .populate("userId", "name email")
      .populate("items.itemId", "name price");

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "Pending",
      "Confirmed",
      "Delivered",
      "Cancelled",
      "Out of delivery",
    ];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res.json({ success: true, message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Confirm order by user
const confirmOrderByUser = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId } = req.body;

    const order = await Order.findOneAndUpdate(
      { _id: orderId, userId },
      { confirmByUser: true },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found or not authorized" });
    }

    res.json({ success: true, message: "Order confirmed by user", order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Cancel order
const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId, reason } = req.body;

    const order = await Order.findOneAndUpdate(
      { _id: orderId, userId },
      { status: "Cancelled", cancellationReason: reason },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found or not authorized" });
    }

    res.json({ success: true, message: "Order cancelled successfully", order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get order statistics
const getOrderStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    res.json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default {
  createOrder,
  getUserOrders,
  getRestaurantOrders,
  updateOrderStatus,
  confirmOrderByUser,
  cancelOrder,
  getOrderStats,
};
