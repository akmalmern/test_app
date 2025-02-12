const testModel = require("../../model/testModel");
const userModel = require("../../model/userModel");
const ErrorResponse = require("../../utils/errorResponse");

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

// mavjud savollarga yangi savol qoshish;

const addQuesTions = async (req, res, next) => {
  try {
    const { testId } = req.params;
    const { question, options, correctAnswer } = req.body;

    // Yangi savol obyekti
    const newQuestion = {
      question,
      options,
      correctAnswer,
    };

    // Testni bazadan topamiz va savol qo‘shamiz
    const updatedTest = await testModel.findByIdAndUpdate(
      testId,
      { $push: { questions: newQuestion } }, // Yangi savol qo‘shish
      { new: true } // Yangilangan testni qaytarish
    );

    if (!updatedTest) {
      return next(new ErrorResponse("test topilmadi", 404));
    }
    const test = await testModel.findById(testId);

    if (test.questions.length !== 30) {
      return next(
        new ErrorResponse("Test uchun faqat 30 ta savol bo‘lishi kerak", 400)
      );
    }

    const savollar_soni = test.questions.length;

    res.status(200).json({
      message: "Yangi savol qo‘shildi",
      savollar_soni,
      updatedTest,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

// test ichidagi savolni o'zgartirish
const updateQuestion = async (req, res, next) => {
  try {
    const { testId, questionId } = req.params;
    const { question, options, correctAnswer } = req.body;

    // Validatsiya
    if (!question || !options || !correctAnswer) {
      return res.status(400).json({ message: "Barcha maydonlarni to'ldiring" });
    }

    // Test va savolni yangilash
    const updatedTest = await testModel.findOneAndUpdate(
      { _id: testId, "questions._id": questionId },
      {
        $set: {
          "questions.$.question": question,
          "questions.$.options": options,
          "questions.$.correctAnswer": correctAnswer,
        },
      },
      { new: true }
    );

    if (!updatedTest) {
      return res.status(404).json({ message: "Test yoki savol topilmadi" });
    }

    res.status(200).json({
      message: "Savol tahrirlandi",
      updatedTest,
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

const deleteQuestion = async (req, res, next) => {
  try {
    const { testId, questionId } = req.params;
    const test = await testModel.findById(testId);
    const savol = await testModel.findById(questionId);
    if (!test || !savol) {
      return next(new ErrorResponse("test yoki savol topilmadi", 404));
    }
    // Testni topish va savolni o'chirish
    const updatedTest = await testModel.findByIdAndUpdate(
      testId,
      { $pull: { questions: { _id: questionId } } },
      { new: true }
    );

    res.status(200).json({
      message: "Savol muvaffaqiyatli o'chirildi",
      testlar_soni: updatedTest.questions.length,
    });
  } catch (error) {
    next(new Error(`Savolni o'chirishda xatolik yuz berdi: ${error.message}`));
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();
    if (!users) {
      return next(new ErrorResponse("Foydalanuvchilar topilmadi", 404));
    }
    res.status(200).json({
      success: true,
      message: "Batcha foydalanuvchilar",
      users,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};
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

module.exports = {
  createTest,
  addQuesTions,
  updateQuestion,
  deleteTest,
  deleteQuestion,
  editTest,
  getUsers,
  deleteUser,
};
