const Test = require("../../model/testModel");
const ErrorResponse = require("../../utils/errorResponse");

// // Test yaratish
// exports.createTest1 = async (req, res) => {
//   try {
//     const { title, category, duration, questions } = req.body;

//     const test = new Test({ title, category, duration, questions });
//     if (test.questions.length >= 30) {
//       return res
//         .status(400)
//         .json({ message: "Test uchun savollar soni cheklangan (30 ta)." });
//     }
//     await test.save();

//     res.status(201).json({ message: "Test muvaffaqiyatli yaratildi", test });
//   } catch (err) {
//     res.status(500).json({ message: "Xatolik yuz berdi", error: err.message });
//   }
// };

const createTest = async (req, res, next) => {
  try {
    const { title, category, duration, questions } = req.body;
    const test = new Test({ title, category, duration, questions });

    if (!title || !category || !duration || !questions) {
      return next(new ErrorResponse("Maydonlarni toliq to'ldiring", 400));
    }
    if (test.questions.length !== 30) {
      return next(
        new ErrorResponse("Test uchun faqat 30 ta savol bo‘lishi kerak", 400)
      );
    }

    await test.save();
    // Testdagi savollar sonini olish
    const savollar_soni = test.questions.length;

    res
      .status(201)
      .json({ message: "Test muvaffaqiyatli yaratildi", savollar_soni, test });
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
    const updatedTest = await Test.findByIdAndUpdate(
      testId,
      { $push: { questions: newQuestion } }, // Yangi savol qo‘shish
      { new: true } // Yangilangan testni qaytarish
    );

    if (!updatedTest) {
      return next(new ErrorResponse("test topilmadi", 404));
    }
    const test = await Test.findById(testId);
    if (test.questions.length >= 30) {
      return res.status(400).send({
        message: "savollar soni cheklanga 30ta",
      });
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
    const updatedTest = await Test.findOneAndUpdate(
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
    const deletedTest = await Test.findByIdAndDelete(testId);

    if (!deletedTest) {
      return res.status(404).json({ message: "Test topilmadi" });
    }

    res.status(200).json({
      message: "Test muvaffaqiyatli o'chirildi",
      deletedTest,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    const { testId, questionId } = req.params;

    // Testni topish va savolni o'chirish
    const updatedTest = await Test.findByIdAndUpdate(
      testId,
      { $pull: { questions: { _id: questionId } } },
      { new: true }
    );

    if (!updatedTest) {
      return res.status(404).json({ message: "Test yoki savol topilmadi" });
    }

    res.status(200).json({
      message: "Savol muvaffaqiyatli o'chirildi",
      updatedTest,
    });
  } catch (error) {
    next(new Error(`Savolni o'chirishda xatolik yuz berdi: ${error.message}`));
  }
};

module.exports = {
  createTest,
  addQuesTions,
  updateQuestion,
  deleteTest,
  deleteQuestion,
};
