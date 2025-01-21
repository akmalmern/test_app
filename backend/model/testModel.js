const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categoryModel",
      required: [true, "category id ni kiritishingiz kerak"],
    },
    duration: { type: Number, required: true },
    savollar_soni: { type: Number, required: true },
    questions: [questionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("testModel", testSchema);
