const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Rasmni 'uploads' papkasiga saqlaymiz
  },
  filename: (req, file, cb) => {
    const sanitizedName = file.originalname.replace(/\s+/g, "-").toLowerCase();
    const fileName = Date.now() + "-" + sanitizedName;
    cb(null, fileName); // Fayl nomini saqlaymiz
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    cb(null, true); // Faqat rasm fayllarini qabul qilamiz
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
  limits: { fileSize: 3 * 1024 * 1024 }, // Maksimal fayl hajmi 3 MB
  fileFilter: fileFilter,
});

module.exports = upload;
