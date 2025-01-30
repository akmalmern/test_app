const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "ismni kiritishingiz shart"],
    },
    email: {
      type: String,
      required: [true, "E-mailingizni kiritishjingiz shart"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "bu email emas tekshirib koring",
      ],
    },
    password: {
      type: String,
      required: [true, "parolni kiritishingiz shart"],
      match: [
        /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
        "Parolda kamida 1 ta katta harf, 1 ta kichik harf, 1 ta raqam va maxsus belgi boʻlishi kerak.",
      ],
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"], // Faqat ruxsat etilgan qiymatlar
        message: "role faqat 'user', yoki 'admin' bo'lishi mumkin", // Maxsus xabar
      },
      default: "user",
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// encrypting password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 15);
});

// verify password
userSchema.methods.comparePassword = async function (yourPassword) {
  try {
    return await bcrypt.compare(yourPassword, this.password);
  } catch (error) {
    console.log("Parolni tekshirishda xato:", error);
  }
};
// Access Token yaratish (1 soat amal qiladi)
userSchema.methods.jwtGenerateToken = function () {
  return jwt.sign(
    { id: this.id, role: this.role }, // Role qo'shildi
    process.env.JWT_ACCESS_TOKEN,
    { expiresIn: "1h" }
  );
};

// Refresh Token yaratish (7 kun amal qiladi)
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { id: this.id, role: this.role }, // Role qo'shildi
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: "7d" }
  );
};
const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
