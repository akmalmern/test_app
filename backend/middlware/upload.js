const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const sanitizedName = file.originalname.replace(/\s+/g, "-").toLowerCase();
    cb(null, Date.now() + "-" + sanitizedName);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Rasm formati noto'g'ri. Faqat jpeg yoki png formatidagi rasmlar qabul qilinadi."
      )
    );
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // Maksimal fayl hajmi: 3 MB
  fileFilter: fileFilter,
});

module.exports = upload;
