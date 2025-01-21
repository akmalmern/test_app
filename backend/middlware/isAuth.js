const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const ErrorResponse = require("../utils/errorResponse");

const isAuthenticated = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return next(new ErrorResponse("Login dan o'tishingiz kerak 00", 401));
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
    console.log(decoded);
    req.user = await userModel.findById(decoded.id);
    if (!req.user) {
      return next(new ErrorResponse("Foydalanuvchi topilmadi", 404));
    }

    next();
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Admin bo'lishingiz kerak", 403));
  }
  next();
};

module.exports = { isAuthenticated, isAdmin };
