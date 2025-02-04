const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const ErrorResponse = require("../utils/errorResponse");

const isAuthenticated = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      // return next(new ErrorResponse("Login dan o'tishingiz kerak 00", 401));
      return res
        .status(401)
        .json({ success: false, message: "Login qilishingiz kerak 00" });
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
    console.log(decoded);
    req.user = await userModel.findById(decoded.id);
    if (!req.user) {
      // return next(new ErrorResponse("Foydalanuvchi topilmadi", 404));
      return res
        .status(404)
        .json({ success: false, message: "Foydalanuvchi topilmadi" });
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Token muddati tugagan" });
    }

    // return next(new ErrorResponse(error, 500));
    return res.status(500).json({
      success: false,
      message: `Serverda xatolik yuz berdi: ${error}`,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return next(new ErrorResponse("Login dan o'tishingiz kerak 00", 401));
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
    if (decoded.role !== "admin") {
      return next(new ErrorResponse("Admin bolishingiz kk", 403));
    }
    console.log(decoded.role);
    req.user = await userModel.findById(decoded.id);
    if (!req.user) {
      return next(new ErrorResponse("Foydalanuvchi topilmadi", 404));
    }

    next();
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

module.exports = { isAuthenticated, isAdmin };
