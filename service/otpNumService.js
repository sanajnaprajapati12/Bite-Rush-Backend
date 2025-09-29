import client from "../Config/twilio.js";
// otpNumService.js
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000);
}

async function sendOtp(mobile) {
  const otp = generateOtp();
  const message = await client.messages.create({
    body: `Your verification code is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: mobile,
  });
  return { sid: message.sid, otp };
}

export default { sendOtp };
