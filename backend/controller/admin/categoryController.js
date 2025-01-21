const categoryModel = require("../../model/categoryModel");
const ErrorResponse = require("../../utils/errorResponse");

const addCategory = async (req, res, next) => {
  try {
    const { name, title, daraja } = req.body;
    if (!name || !title) {
      return next(new ErrorResponse("maydonni to'liq to'ldiring!", 400));
    }
    const category = await categoryModel.create({ name, title, daraja });
    res.status(201).json({
      success: true,
      message: "category qo'shildi",
      category,
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

const getCategory = async (req, res, next) => {
  try {
    const categories = await categoryModel.find();
    if (!categories) {
      return next(new ErrorResponse("categoriyalar topilmadi", 404));
    }
    res.status(200).json({
      success: true,
      message: "Tzimda mavjud categoriyalar",
      categories,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

const deletCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const delCat = await categoryModel.findByIdAndDelete(id);
    if (!delCat) {
      return next(new ErrorResponse("bu id dagi category topilmadi", 404));
    }
    res.status(200).json({
      success: true,
      message: "category o'chirildi",
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

const editCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const editCat = await categoryModel.findById(id);
    if (!editCat) {
      return next(new ErrorResponse("bu id dagi category topilmadi", 404));
    }
    const newCat = await categoryModel.findByIdAndUpdate(editCat, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "category o'zgartrildi",
      newCat,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

module.exports = {
  addCategory,
  getCategory,
  deletCategory,
  editCategory,
};
