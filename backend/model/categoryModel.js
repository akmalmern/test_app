const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "categoriyani kiritishingiz shart"],
    },
    title: {
      type: String,
      required: [true, "test titlesini kiritishingiz shart"],
    },

    daraja: {
      type: String,
      enum: {
        values: ["oson", "o'rta", "qiyin"], // Faqat ruxsat etilgan qiymatlar
        message: "Daraja faqat 'oson', 'o'rta', yoki 'qiyin' bo'lishi mumkin", // Maxsus xabar
      },
      required: true, // Daraja majburiy bo‘lsin
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("categoryModel", categorySchema);
