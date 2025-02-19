const userModel = require("../model/userModel");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const signUp = async (req, res, next) => {
  const { userName, email, password, role } = req.body;
  console.log(req.body);

  const userExist = await userModel.findOne({ email });

  if (userExist) {
    return next(new ErrorResponse("Bu email royxatdan otgan", 400));
  }

  if (!userName || !email || !password) {
    return next(new ErrorResponse("Maydonni toliq toldiring", 400));
  }

  if (password.length < 4) {
    return next(
      new ErrorResponse("Parol kamida 4 ta belgidan iborat bolish kk", 400)
    );
  }

  try {
    const image = req.file ? req.file.filename : null; // Faqat fayl nomini saqlaymiz

    const user = await userModel.create({
      userName,
      email,
      password,
      image,
      role,
    });
    // Access va Refresh tokenlarni yaratish
    const accessToken = await user.jwtGenerateToken();

    const refreshToken = await user.generateRefreshToken();

    // Refresh tokenni cookie'da yuborish
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 kun
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 60 * 1000,
    });
    res.status(201).json({
      success: true,
      message: "Royxatdan otdingiz",

      accessToken,
      user,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessages = Object.values(error.errors).map(
        (val) => val.message
      );
      next(new ErrorResponse(errorMessages[0], 500));
    } else {
      next(new ErrorResponse(error.message, 500));
    }
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorResponse("maydonni toliq toldiring", 400));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Bu odam tzimda yo'q", 404));
    }
    // parolni tekshirish
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new ErrorResponse("paro'l xato"), 401);
    }

    // Access va Refresh tokenlarni yaratish
    const accessToken = await user.jwtGenerateToken();

    const refreshToken = await user.generateRefreshToken();

    // Refresh tokenni cookie'da yuborish
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 kun
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Tizimga muvaffaqiyatli kirdingiz",
      user,
      accessToken,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
    console.log(error);
  }
};

const userProfile = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return next(new ErrorResponse("Foydalanuvchi topilmadi", 404));
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

const refreshAccessToken = async (req, res, next) => {
  try {
    // Refresh tokenni cookie yoki body orqali olish
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return next(new ErrorResponse("Refresh token topilmadi", 401));
    }

    // Refresh tokenni tekshirish
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);

    // Foydalanuvchini tekshirish
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return next(new ErrorResponse("Foydalanuvchi topilmadi", 404));
    }

    // Yangi access token yaratish
    const newAccessToken = user.jwtGenerateToken();

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 401));
  }
};

const logOut = (req, res, next) => {
  try {
    // Refresh tokenni cookie'dan olib tashlash
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({
      success: true,
      message: "Tizimdan muvaffaqiyatli chiqdingiz",
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};
module.exports = { signUp, signIn, userProfile, refreshAccessToken, logOut };
