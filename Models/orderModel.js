import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ["COD", "UPI", "Card"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Delivered",
        "Cancelled",
        "out of delivery",
      ],
      default: "Pending",
    },
    deliveryAddress: {
      house: { type: String, required: true },
      street: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      pincode: { type: String, required: false },
    },
    confirmByUser: {
      type: Boolean,
      default: false,
    },
    cancellationReason: {
      type: String,
      default: "",
    },
  },

  { timestamps: true }
);
      



const Order = mongoose.model("Order", orderSchema);
export default Order;
// Change status of order by orderID
// oderId
// user api-confirm buutton-schema add key confim -Tru/false-veriefyusrSide
// Cancel oder vali api-userid/oderid/resone-satus cancelled  ho jaye
// Mai DAshboard-
// Chart Dashbaord
// Raser-pay-stripe