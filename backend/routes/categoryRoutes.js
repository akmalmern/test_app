const { isAdmin, isAuthenticated } = require("../middlware/isAuth");

const {
  addCategory,
  getCategory,
  deletCategory,
  editCategory,
} = require("../controller/admin/categoryController");

const express = require("express");
const router = express.Router();

router.post("/create-category", isAuthenticated, isAdmin, addCategory);
router.get("/categories", getCategory);
router.delete("/delete/:id", deletCategory);
router.put("/edit/:id", editCategory);
module.exports = router;
