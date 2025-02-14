const testModel = require("../model/testModel");
const ErrorResponse = require("../utils/errorResponse");
const UserTestResult = require("../model/testNatijalarModel");

// Barcha testlarni va savollarni olish
const AllTests = async (req, res, next) => {
  try {
    const tests = await testModel
      .find()
      .populate("categoryId", "name title daraja");

    if (!tests || tests.length === 0) {
      return next(new ErrorResponse("Testlar topilmadi", 404));
    }

    const testlar_soni = tests.length;

    res.status(200).json({
      success: true,
      message: "Barcha testlar va savollar ro'yxati",
      testlar_soni,
      tests,
      // tests: tests.map((test) => ({
      //   id: test.id,
      //   title: test.title,
      //   category: test.category,
      //   questions: test.questions.length,
      // })),
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};
// "/:testId" bitta testni ko'rish
const OneTest = async (req, res, next) => {
  try {
    const { testId } = req.params;

    const test = await testModel.findById(testId);
    if (!test) {
      return next(new ErrorResponse("test topilmadi", 404));
    }

    res.status(200).json({
      success: true,
      message: "Test topildi",
      test,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};
// testni katego'ryasi bo'yicha ko'rish
const getTestCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const tests = await testModel.find({ category });
    if (!tests) {
      return next(new ErrorResponse("bu categoriya topilmadi", 404));
    }
    res.status(200).json({
      success: true,
      message: "categoriya get",
      tests,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

// testni ishlashga tushish
const getTestBoshlash = async (req, res, next) => {
  try {
    const { testId } = req.params;

    const test = await testModel.findById(testId);
    if (!test) {
      return next(new ErrorResponse("Test topilmadi", 404));
    }

    if (!test.duration || test.duration <= 0) {
      return next(
        new ErrorResponse("Test davomiyligi noto‘g‘ri belgilangan", 400)
      );
    }

    // Foydalanuvchining test natijalarini tekshiramiz
    let userTestsResult = await UserTestResult.findOne({
      userId: req.user._id,
      testId,
    });

    // Agar test allaqachon yakunlangan bo‘lsa, xabar qaytariladi
    if (userTestsResult && userTestsResult.isCompleted) {
      return next(
        new ErrorResponse("Siz testni allaqachon topshirib bo‘lgansiz", 400)
      );
    }

    // Agar foydalanuvchining test natijalari mavjud bo'lmasa, yangi natija yaratamiz
    if (!userTestsResult) {
      const startTime = new Date();
      const endTime = new Date(startTime.getTime() + test.duration * 60000);

      userTestsResult = await UserTestResult.create({
        userId: req.user._id,
        testId,
        startTime,
        endTime,
        correctAnswers: 0,
        totalQuestions: test.questions.length,
      });
    }

    res.status(200).json({
      message: "Test boshlandi",
      success: true,
      test: {
        title: test.title,
        duration: test.duration,
        startTime: userTestsResult.startTime,
        endTime: userTestsResult.endTime,
        questions: test.questions.map((q) => ({
          question: q.question,
          options: q.options,
          questionId: q._id,
        })),
      },
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

const TestYakunlash = async (req, res, next) => {
  try {
    const { testId } = req.params;
    const { answers } = req.body;

    // Javoblar formatini tekshirish va kerak bo'lsa massivga aylantirish
    const answersArray = Array.isArray(answers)
      ? answers // Agar allaqachon massiv bo'lsa, o'zgarmaydi
      : Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer,
        }));

    // Test va foydalanuvchi natijasini topamiz
    const test = await testModel.findById(testId);
    if (!test) {
      return next(new ErrorResponse("Test topilmadi", 404));
    }

    const userTestsResult = await UserTestResult.findOne({
      userId: req.user._id,
      testId,
    });
    if (!userTestsResult) {
      return next(new ErrorResponse("Test natijasi topilmadi", 404));
    }

    // Tekshiruv: Test oldin yakunlanganmi?
    if (userTestsResult.isCompleted) {
      return res.status(400).json({
        success: false,
        message: "Siz testni allaqachon topshirib bo‘lgansiz.",
      });
    }

    // Vaqtlarni tekshiramiz
    const currentTime = new Date();
    const endTime = new Date(userTestsResult.endTime);

    if (currentTime > endTime) {
      console.log("Vaqt tugagan. Test avtomatik yakunlanmoqda...");

      // To‘g‘ri javoblarni hisoblash
      let correctAnswers = 0;
      test.questions.forEach((question) => {
        const userAnswer = answersArray.find(
          (a) => a.questionId === question._id.toString()
        );
        if (userAnswer && userAnswer.answer === question.correctAnswer) {
          correctAnswers++;
        }
      });

      const updatedResult = await UserTestResult.findOneAndUpdate(
        { userId: req.user._id, testId },
        {
          $set: {
            correctAnswers,
            completedAt: currentTime,
            isCompleted: true,
          },
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Test vaqti tugaganligi sababli avtomatik yakunlandi",
        updatedResult,
        result: {
          totalQuestions: test.questions.length,
          correctAnswers,
          score: ((correctAnswers / test.questions.length) * 100).toFixed(2),
          completedAt: updatedResult.completedAt,
        },
      });
    }

    // To‘g‘ri javoblarni hisoblash
    let correctAnswers = 0;
    test.questions.forEach((question) => {
      const userAnswer = answersArray.find(
        (a) => a.questionId === question._id.toString()
      );
      if (userAnswer && userAnswer.answer === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const updatedResult = await UserTestResult.findOneAndUpdate(
      { userId: req.user._id, testId },
      {
        $set: {
          correctAnswers,
          completedAt: currentTime,
          isCompleted: true,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Test muvaffaqiyatli yakunlandi",
      updatedResult,
      result: {
        totalQuestions: test.questions.length,
        correctAnswers,
        score: ((correctAnswers / test.questions.length) * 100).toFixed(2),
        completedAt: updatedResult.completedAt,
      },
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

const userTestsResult = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const results = await UserTestResult.find({ userId })
      .populate({
        path: "testId",
        select: "title categoryId",
        populate: {
          path: "categoryId",
          select: "name title daraja",
        },
      })
      .sort({ date: -1 });
    console.log(
      results.map((r) => ({
        testId: r.testId,
        categoryId: r.testId?.categoryId,
      }))
    );

    if (!results || results.length === 0) {
      return next(new ErrorResponse("Natijalar topilmadi", 404));
    }

    res.status(200).json({
      message: "Foydalanuvchi test natijalari",
      yechganTestlarSoni: results.length,
      // results,
      results: results
        .filter((result) => result.testId) // testId null bo‘lsa, natijadan chiqarib tashlaymiz
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
    next(new ErrorResponse(error.message, 500));
  }
};

module.exports = {
  AllTests,
  OneTest,
  getTestCategory,
  getTestBoshlash,
  TestYakunlash,
  userTestsResult,
};
