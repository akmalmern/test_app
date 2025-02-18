const testModel = require("../../model/testModel");
const userModel = require("../../model/userModel");
const UserTestResult = require("../../model/testNatijalarModel");
const ErrorResponse = require("../../utils/errorResponse");
const { userTestsResult } = require("../testYechishController");

const createTest = async (req, res, next) => {
  try {
    const { title, categoryId, duration, questions, savollar_soni } = req.body;

    if (!title || !categoryId || !duration || !questions) {
      return next(new ErrorResponse("Maydonlarni toliq to'ldiring", 400));
    }

    if (questions.length !== savollar_soni) {
      return next(
        new ErrorResponse(
          `Test uchun faqat ${savollar_soni} ta savol bo‘lishi kerak`,
          400
        )
      );
    }

    const test = await testModel.create({
      title,
      categoryId,
      duration,
      questions,
      savollar_soni,
    });

    res.status(201).json({ message: "Test muvaffaqiyatli yaratildi", test });
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(error.message, 500));
  }
};

const editTest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const test0 = await testModel.findById(id);
    if (!test0) {
      return next(new ErrorResponse("test topilmadi", 404));
    }
    const test1 = await testModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Test Muvofaqiyatli o'zgartirildi",
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

const deleteTest = async (req, res, next) => {
  try {
    const { testId } = req.params;

    // Testni topib o'chirish
    const deletedTest = await testModel.findByIdAndDelete(testId);

    if (!deletedTest) {
      return res.status(404).json({ message: "Test topilmadi" });
    }

    res.status(200).json({
      success: true,
      message: "Test muvaffaqiyatli o'chirildi",
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};
const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // URL'dan sahifa raqamini olish
    const limit = parseInt(req.query.limit) || 30; // Nechta foydalanuvchi chiqarish
    const skip = (page - 1) * limit;

    // userName orqali qidiruv
    const userNameQuery = req.query.userName
      ? { userName: { $regex: req.query.userName, $options: "i" } }
      : {};

    const users = await userModel
      .find(userNameQuery) // qidiruv shartini qo'shish
      .select("userName email")
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await userModel.countDocuments(userNameQuery); // qidiruvga mos ravishda jami foydalanuvchilar soni

    if (!users || users.length === 0) {
      return next(new ErrorResponse("Foydalanuvchilar topilmadi", 404));
    }

    res.status(200).json({
      success: true,
      message: "Batcha foydalanuvchilar",
      userlar: total,
      page,
      totalPages: Math.ceil(total / limit),
      users,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

// const getUsers = async (req, res, next) => {
//   try {
//     const page = parseInt(req.query.page) || 1; // URL'dan sahifa raqamini olish
//     const limit = parseInt(req.query.limit) || 30; // Nechta foydalanuvchi chiqarish
//     const skip = (page - 1) * limit;

//     const users = await userModel
//       .find()
//       .select("userName email")
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     const total = await userModel.countDocuments();

//     if (!users) {
//       return next(new ErrorResponse("Foydalanuvchilar topilmadi", 404));
//     }
//     res.status(200).json({
//       success: true,
//       message: "Batcha foydalanuvchilar",
//       userlar: total,
//       page,
//       totalPages: Math.ceil(total / limit),
//       users,
//     });
//   } catch (error) {
//     next(new ErrorResponse(error.message, 500));
//   }
// };
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await userModel.findById(id);
    if (!user) {
      return next(new ErrorResponse("Foydalanuvchilar topilmadi", 404));
    }

    await userModel.findOneAndDelete({ _id: id }); // userModeldagi Middleware avtomatik chaqiriladi

    res.status(200).json({
      success: true,
      message: "Foydalanuvchi  o‘chirildi",
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

const AdminGetUserResult = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Foydalanuvchining test natijalarini olish
    const userResult = await UserTestResult.find({ userId: id })
      .populate({
        path: "testId",
        select: "title categoryId",
        populate: {
          path: "categoryId",
          select: "name title daraja",
        },
      })
      .sort({ date: -1 });

    // Konsolga tekshirish uchun chiqaramiz
    console.log("User Test Results:", userResult);

    // Agar natijalar bo‘lmasa, xatolik qaytarish
    if (!userResult || userResult.length === 0) {
      return next(
        new ErrorResponse("Ushbu foydalanuvchi test ishlamagan", 404)
      );
    }

    // Natijalarni JSON formatda qaytarish
    res.status(200).json({
      message: "Admin uchun foydalanuvchi test natijalari",
      userId: id,
      totalTests: userResult.length,
      results: userResult
        .filter((result) => result.testId) // testId null bo‘lsa, olib tashlaymiz
        .map((result) => ({
          score: (
            (result.correctAnswers / result.totalQuestions) *
            100
          ).toFixed(2),
          testTitle: result.testId.title,
          category: result.testId.categoryId.name,
          daraja: result.testId.categoryId.daraja,
          categoryTitle: result.testId.categoryId.title,
          correctAnswers: result.correctAnswers,
          totalQuestions: result.totalQuestions,
          completedAt: new Date(result.completedAt).toLocaleString(),
        })),
    });
  } catch (error) {
    console.error("Xatolik:", error);
    next(new ErrorResponse("Server xatosi", 500));
  }
};

module.exports = {
  createTest,
  deleteTest,
  editTest,
  getUsers,
  deleteUser,
  AdminGetUserResult,
};
