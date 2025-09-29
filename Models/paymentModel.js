import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema(
  {
    // orderId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Order",
    //   required: true,
    // },
    
    orderId: {
      type: String, // <-- change to String
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },

    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },

    status: {
      type: String,
      enum: ["Created", "Paid", "Failed", "Refunded"],
      default: "Created",
    },

    method: { type: String },
    email: { type: String },
    contact: { type: String },

    history: [
      {
        status: { type: String },
        date: { type: Date, default: Date.now },
        description: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;  
