import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assumes you have a User model
      required: true,
    },
    name: {
      type: String,
      required: [true, "Restaurant name is required"],
    },
    description: {
      type: String,
    },
    images: [{ type: String }],
    location: {
      address: { type: String, required: true },
      area: { type: String },
      city: { type: String, required: true },
      pincode: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    cuisine: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    category: { type: String, required: true },
    deliveryTime: { type: String, required: true },
    timing: {
      open: { type: String, required: true },
      close: { type: String, required: true },
    },
    offers: [{ type: String }],
    isPureVeg: { type: Boolean, default: false },
    isOpen: { type: Boolean, default: true },
    isClose: { type: Boolean, default: false },
    popularDishes: { type: String },
   
    tags: [{ type: String }],

    // ✅ Yeh add karna hoga
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
