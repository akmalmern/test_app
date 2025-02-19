const express = require("express");
const router = express.Router();

const {
  createTest,
  deleteTest,
  editTest,
  getUsers,
  deleteUser,
  AdminGetUserResult,
  getUsersByTest,
} = require("../controller/admin/adminController");
const { isAuthenticated, isAdmin } = require("../middlware/isAuth");

router.post("/create-test", isAuthenticated, isAdmin, createTest);

// testni o'chirish
router.delete("/delete/test/:testId", isAuthenticated, isAdmin, deleteTest);

// edit test
router.put("/edit/test/:id", isAuthenticated, isAdmin, editTest);
// barcha userlar
router.get("/users", isAuthenticated, isAdmin, getUsers);
router.delete("/user/delete/:id", isAuthenticated, isAdmin, deleteUser);
router.get(
  "/user/user-results/:id",
  isAuthenticated,
  isAdmin,
  AdminGetUserResult
);
router.get("/test-users/:testId", isAuthenticated, isAdmin, getUsersByTest);
module.exports = router;
