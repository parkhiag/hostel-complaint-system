let otpStore = {}; // temporary memory

export const sendFakeOtp = (phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore[phone] = otp;

  console.log("OTP for", phone, "is:", otp); // 👈 THIS IS YOUR SMS

  return true;
};

export const verifyFakeOtp = (phone, enteredOtp) => {
  if (otpStore[phone] === enteredOtp) {
    delete otpStore[phone];
    return true;
  }
  return false;
};