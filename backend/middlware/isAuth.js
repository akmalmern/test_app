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
// module.exports = { isAuthenticated };

// const isAuthenticated = (req, res, next) => {
//   try {
//     // Tokenni Cookie yoki Authorization headerdan olish
//     const { token } = req.cookies;
//     console.log(token);
//     if (!token) {
//       // Token topilmasa, xatolik yuboriladi
//       return res
//         .status(401)
//         .json({ message: "Logindan o'tishingiz kerak +++" });
//     }

//     // Tokenni tekshirish
//     const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
//     req.user = decoded; // Foydalanuvchi ma'lumotlarini so'rovga qo'shish
//     next();
//   } catch (error) {
//     // Token noto'g'ri yoki muddati tugagan
//     return res
//       .status(401)
//       .json({ message: "Noto'g'ri yoki muddati tugagan token" });
//   }
// };

module.exports = { isAuthenticated };
