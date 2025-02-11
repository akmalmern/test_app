const express = require("express");
const router = express.Router();

const {
  createTest,
  addQuesTions,
  updateQuestion,
  deleteTest,
  deleteQuestion,
  editTest,
} = require("../controller/admin/adminController");
const { isAuthenticated, isAdmin } = require("../middlware/isAuth");

router.post("/create-test", isAuthenticated, isAdmin, createTest);
// PUT /api/admin/add-question/:testId
router.put(
  "/add-question/:testId",
  isAuthenticated,
  addQuesTions,
  addQuesTions
);

// PUT /api/admin/update-question/:testId/:questionId
router.put(
  "/update-question/:testId/:questionId",
  isAuthenticated,
  isAdmin,
  updateQuestion
);

// testni o'chirish
router.delete("/delete/test/:testId", isAuthenticated, isAdmin, deleteTest);
// testni ichidagi savolni o'chirish
router.delete(
  "/test/:testId/:questionId",
  isAuthenticated,
  isAdmin,
  deleteQuestion
);

// edit test
router.put("/edit/test/:id", isAuthenticated, isAdmin, editTest);

module.exports = router;
