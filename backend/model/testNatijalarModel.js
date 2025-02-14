const mongoose = require("mongoose");

const userTestResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: [true, "Foydalanuvchi ID kerak"],
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "testModel",
      required: [true, "Test ID kerak"],
    },

    correctAnswers: {
      type: Number,
      required: [true, "To‘g‘ri javoblar soni kerak"],
      default: 0,
    },
    totalQuestions: {
      type: Number,
      required: [true, "Savollar soni kerak"],
    },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date }, // Tugash vaqtini biz to'g'ri hisoblaymiz
    completedAt: {
      type: Date,
    },
    isCompleted: { type: Boolean, default: false }, // Test yakunlanganligini bildiradi
    isTestboshlash: { type: Boolean, default: false }, // Test yakunlanganligini bildiradi
  },
  { timestamps: true } // createdAt va updatedAt avtomatik maydonlari
);

module.exports = mongoose.model("UserTestResult", userTestResultSchema);
