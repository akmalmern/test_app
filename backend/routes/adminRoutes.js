const express = require("express");
const router = express.Router();

const {
  createTest,
  addQuesTions,
  updateQuestion,
  deleteTest,
  deleteQuestion,
} = require("../controller/admin/adminController");
const { isAuthenticated } = require("../middlware/isAuth");

router.post("/create-test", isAuthenticated, createTest);
// PUT /api/admin/add-question/:testId
router.put("/add-question/:testId", isAuthenticated, addQuesTions);

// PUT /api/admin/update-question/:testId/:questionId
router.put(
  "/update-question/:testId/:questionId",
  isAuthenticated,
  updateQuestion
);

// testni o'chirish
router.delete("/test/:testId", isAuthenticated, deleteTest);
// testni ichidagi savolni o'chirish
router.delete("/test/:testId/:questionId", isAuthenticated, deleteQuestion);

module.exports = router;

// testni yakunlash natijalarni ko'rish.
// const TestYakunlash = async (req, res, next) => {
//   try {
//     const { testId } = req.params;
//     const { answers } = req.body;
//     const userId = req.user.id; // Middleware orqali foydalanuvchi ID
//     console.log("Kelgan answers:", answers);

//     const test = await testModel.findById(testId);
//     if (!test) {
//       return next(new ErrorResponse("Test topilmadi", 404));
//     }

//     const endTime = Date.now();
//     let correctAnswers = 0;

//     test.questions.forEach((q) => {
//       const userAnswer = answers[q._id]; // answers dan tanlangan javobni olish
//       if (q.correctAnswer === userAnswer) {
//         correctAnswers++;
//       }
//     });

//     // Test natijalarini saqlash yoki yangilash
//     const result = await UserTestResult.findOneAndUpdate(
//       { userId, testId },
//       { correctAnswers, completedAt: endTime },
//       { new: true, upsert: true }
//     )
//       .populate("userId", "userName email") // Foydalanuvchi ismini olish
//       .populate("testId", "title category"); // Test sarlavhasi va kategoriyasini olish

//     if (!result) {
//       return next(new ErrorResponse("Test natijalarini saqlab bo'lmadi", 500));
//     }

//     // Foydalanuvchiga natijalarni qaytarish
//     res.status(200).json({
//       message: "Test natijalari saqlandi",
//       result,
//     });
//   } catch (error) {
//     next(new ErrorResponse(error.message, 500));
//   }
// };

// const TestYakunlash = async (req, res, next) => {
//   try {
//     const { testId } = req.params;
//     const { answers } = req.body;
//     const userId = req.user.id; // Middleware orqali foydalanuvchi ID

//     console.log("Kelgan answers:", answers);

//     // Testni olish
//     const test = await testModel.findById(testId);
//     if (!test) {
//       return next(new ErrorResponse("Test topilmadi", 404));
//     }

//     // Foydalanuvchi uchun test natijasini olish
//     const userResult = await UserTestResult.findOne({ userId, testId });
//     if (!userResult) {
//       return next(new ErrorResponse("Foydalanuvchi natijalari topilmadi", 404));
//     }

//     // Agar ajratilgan vaqt tugagan bo'lsa
//     const currentTime = new Date();
//     if (currentTime > new Date(userResult.endTime)) {
//       return res.status(400).json({
//         message: "Test uchun ajratilgan vaqt tugagan",
//         result: userResult, // Avvalgi natijalarni qaytarish
//       });
//     }

//     let correctAnswers = 0;

//     // To'g'ri javoblarni hisoblash
//     test.questions.forEach((q) => {
//       const userAnswer = answers[q._id]; // `answers` obyektidan foydalanuvchi javobini olish
//       if (q.correctAnswer === userAnswer) {
//         correctAnswers++;
//       }
//     });

//     // Test natijalarini yangilash
//     userResult.correctAnswers = correctAnswers;
//     userResult.completedAt = currentTime;
//     await userResult.save();

//     res.status(200).json({
//       message: "Test natijalari saqlandi",
//       result: userResult,
//     });
//   } catch (error) {
//     next(new ErrorResponse(error.message, 500));
//   }
// };

// const TestYakunlash = async (req, res, next) => {
//   try {
//     const { testId } = req.params;
//     const { answers } = req.body;
//     const userId = req.user.id; // Middleware orqali foydalanuvchi ID

//     console.log("Kelgan answers:", answers);

//     // Testni olish
//     const test = await testModel.findById(testId);
//     if (!test) {
//       return next(new ErrorResponse("Test topilmadi", 404));
//     }

//     // Foydalanuvchi uchun test natijasini olish
//     const userResult = await UserTestResult.findOne({ userId, testId });
//     if (!userResult) {
//       return next(new ErrorResponse("Foydalanuvchi natijalari topilmadi", 404));
//     }

//     // Agar ajratilgan vaqt tugagan bo'lsa
//     const currentTime = new Date();
//     const endTime = new Date(userResult.endTime); // endTime ni to'g'ri formatda olish

//     // Vaqtni tekshirish
//     if (currentTime > endTime) {
//       return res.status(400).json({
//         message: "Test uchun ajratilgan vaqt tugagan",
//         result: userResult, // Avvalgi natijalarni qaytarish
//       });
//     }

//     let correctAnswers = 0;

//     // To'g'ri javoblarni hisoblash
//     test.questions.forEach((q) => {
//       const userAnswer = answers[q._id]; // `answers` obyektidan foydalanuvchi javobini olish
//       if (q.correctAnswer === userAnswer) {
//         correctAnswers++;
//       }
//     });

//     // Test natijalarini yangilash
//     userResult.correctAnswers = correctAnswers;
//     userResult.completedAt = currentTime;
//     await userResult.save();

//     res.status(200).json({
//       message: "Test natijalari saqlandi",
//       result: userResult,
//     });
//   } catch (error) {
//     next(new ErrorResponse(error.message, 500));
//   }
// };
