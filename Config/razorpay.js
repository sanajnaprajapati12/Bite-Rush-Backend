import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // .env में रखो
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpay;
