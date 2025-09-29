import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import userRoutes from "./Routes/userRoutes.js";
import otpRoutes from "./Routes/otpRoutes.js"
import restaurantRoutes from "./Routes/restaurantRoutes.js";
import cookieParser from "cookie-parser";
import itemsRoute from "./Routes/itemsRoutes.js"
import orderRoute from "./Routes/orderRoutes.js";
import paymentRoutes from "./Routes/paymentRoutes.js";
dotenv.config();

const app = express();
app.use(cookieParser()); // ✅ this makes req.cookies available
// ✅ CORS should be at the top
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Optional but recommended if using cookies
  })
);

// ✅ Express JSON middleware
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use("/v1/api", userRoutes);
app.use("/v1/api", otpRoutes);
app.use("/v1/api", restaurantRoutes);
 app.use("/v1/api",itemsRoute)
 app.use("/v1/api", orderRoute);
 app.use("/v1/api/payments", paymentRoutes);
// Optional base test route
 app.get("/", (req, res) => {
    res.send("✅ Backend is live now");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
// ✅ Global Error Handler Middleware
