const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "categoriyani kiritishingiz shart"],
    },

    daraja: {
      type: String,
      enum: {
        values: ["oson", "o'rta", "qiyin"],
        message: "Daraja faqat 'oson', 'o'rta', yoki 'qiyin' bo'lishi mumkin",
      },
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("categoryModel", categorySchema);
