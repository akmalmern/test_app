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

const {
  AllTests,
  getTestCategory,
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

// Kategoriya bo‘yicha testlarni olish
router.get("/tests/:category", getTestCategory);
// Testni boshlash API
router.get("/start-test/:testId", isAuthenticated, getTestBoshlash);

// testni yakunlash natijalarini qaytarish
router.post("/submit-test/:testId", isAuthenticated, TestYakunlash);

// foydalanuvchini ishlagan testlari va natijalari:
router.get("/results", isAuthenticated, userTestsResult);

module.exports = router;
