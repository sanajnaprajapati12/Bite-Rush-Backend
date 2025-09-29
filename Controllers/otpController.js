import twilio from "twilio";
import dotenv from "dotenv";
import OTP from "../Models/otpModel.js";

dotenv.config();

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Format mobile number
const formatMobile = (mobile) =>
  mobile.startsWith("+") ? mobile : "+91" + mobile;

// Send OTP
 const sendOtp = async (req, res) => {
  const { mobile } = req.body;
  if (!mobile)
    return res.status(400).json({ message: "Mobile number is required" });

  const formattedMobile = formatMobile(mobile);
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

  try {
    // Save OTP in DB
    await OTP.findOneAndUpdate(
      { mobile: formattedMobile },
      { otp: otpCode, expiresAt },
      { upsert: true, new: true }
    );

    // Send SMS via Twilio
    await client.messages.create({
      body: `Your OTP is ${otpCode}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedMobile,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP
 const verifyOtp = async (req, res) => {
  const { mobile, otp } = req.body;
  if (!mobile || !otp)
    return res.status(400).json({ message: "Mobile & OTP required" });

  const formattedMobile = formatMobile(mobile);

  try {
    const record = await OTP.findOne({ mobile: formattedMobile });
    if (!record)
      return res.status(400).json({ message: "OTP not found or expired" });

    if (record.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    // OTP verified, delete it
    await OTP.deleteOne({ mobile: formattedMobile });

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  verifyOtp,
  sendOtp
}