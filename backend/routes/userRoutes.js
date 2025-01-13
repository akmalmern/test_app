const express = require("express");
const router = express.Router();
const upload = require("../middlware/upload");
const {
  signUp,
  signIn,
  userProfile,
  refreshAccessToken,
  logOut,
} = require("../controller/userController");
const { isAuthenticated } = require("../middlware/isAuth");

const User = require("../model/userModel");
const Test = require("../model/testModel");
const UserTestResult = require("../model/testNatijalarModel");
const {
  AllTests,
  getTestCategory,
  OneTest,
  getTestBoshlash,
  TestYakunlash,
  userTestsResult,
} = require("../controller/testYechishController");

router.post("/signup", upload.single("image"), signUp);
router.post("/signin", signIn);
router.get("/user-profile", isAuthenticated, userProfile);
router.post("/refresh-token", refreshAccessToken);
router.get("/logout", logOut);
// +++++++++++++++++++++++++++++++++++++++++++
// barcha testlarni ko'rish
router.get("/all-tests", AllTests);

// GET /api/tests/:testId
router.get("/one-test/:testId", OneTest);

// Kategoriya bo‘yicha testlarni olish
router.get("/tests/:category", getTestCategory);
// Testni boshlash API
router.get("/start-test/:testId", isAuthenticated, getTestBoshlash);

// testni yakunlash natijalarini qaytarish
router.post("/submit-test/:testId", isAuthenticated, TestYakunlash);

// foydalanuvchini ishlagan testlari va natijalari:
router.get("/results", isAuthenticated, userTestsResult);

router.post("/submit-test1/:testId", async (req, res) => {
  try {
    const { testId } = req.params;
    const { userId, answers, startTime } = req.body;

    // Agar startTime bo'lmasa, hozirgi vaqtni olish
    const actualStartTime = startTime || Date.now();

    // Testni topamiz
    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: "Test topilmadi" });

    let correctAnswersCount = 0;
    const results = [];

    // Har bir savolni tekshiramiz
    test.questions.forEach((q) => {
      const userAnswer = answers[q._id] || ""; // Javob mavjudligini tekshiramiz
      const isCorrect = userAnswer === q.correctAnswer; // Solishtirish

      if (isCorrect) correctAnswersCount++;

      results.push({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        userAnswer,
        isCorrect,
      });
    });
    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ message: "Foydalanuvchining test natijalari topilmadi." });
    }

    // Testni tugash vaqtini hisoblash
    const endTime = actualStartTime + test.duration * 60000; // Test davomiyligi minutlarda

    // Foydalanuvchi natijasini saqlash
    const result = new UserTestResult({
      userId,
      testId,
      correctAnswers: correctAnswersCount,
      totalQuestions: test.questions.length,
      startTime: actualStartTime,
      endTime,
    });
    await result.save();

    // Natijalarni foydalanuvchiga qaytaramiz
    res.status(200).json({
      message: "Test yakunlandi",
      correctAnswersCount,
      totalQuestions: test.questions.length,
      results,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Xatolik yuz berdi 7", error: err.message });
  }
});

module.exports = router;
