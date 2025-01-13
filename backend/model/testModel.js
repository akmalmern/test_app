const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: Number, required: true },
    questions: [questionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("testModel", testSchema);
// PORT = 5000
// DB = mongodb://localhost:27017/test_app1
// JWT_REFRESH_TOKEN = 0921aaaa
// JWT_ACCESS_TOKEN = aaaa0921
