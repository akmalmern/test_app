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
      enum: ["oson", "o'rta", "qiyin"], // Faqat belgilangan qiymatlar
      required: true, // Daraja majburiy bo‘lsin
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("categoryModel", categorySchema);
