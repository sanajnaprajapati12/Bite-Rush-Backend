import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    images: [{ type: String }],
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    discount: {
      type: Number,
      default: 0, // discount percentage
    },
    itemRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    size: {
      type: [String], // e.g. ["Small", "Medium", "Large"]
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
