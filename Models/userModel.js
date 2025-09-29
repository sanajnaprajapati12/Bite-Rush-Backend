import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Basic user details
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },

    role: {
      type: String,
      enum: ["user", "admin", "owner"],
      default: "user",
    },

    // Restaurant details
    category: { type: String }, // Fast Food
    cuisine: { type: String }, // Italian
    restaurantName: { type: String }, // Jain shree
    deliveryTime: { type: String }, // 30 mins

    timing: {
      open: { type: String }, // 10:00 AM
      close: { type: String }, // 11:00 PM
    },

    location: {
      address: { type: String },
      city: { type: String },
      pincode: { type: String },
    },

    offers: [{ type: String }], // ["10% OFF", "Free Coke"]

    images: [{ type: String }], // store image URLs

    tags: { type: String }, // ki ki
    featured: { type: String }, // hhh
    popularDishes: { type: String }, // maggi pasta
    isPureVeg: { type: String, enum: ["veg", "non-veg"] }, // veg
    type: { type: String }, // Veg,NonVeg
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
