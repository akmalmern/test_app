const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dataDB = require("./db/db");
const path = require("path");
const userRouter = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const errorHandler = require("./middlware/error");
// *****
dataDB();
app.use(express.json());
app.use(cookieParser());

// uploads papkasini statik fayl sifatida taqdim etish
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// CORS sozlamalari
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL (Vite bilan ishlayotgan bo'lsangiz)
    credentials: true, // Cookie'larni uzatishga ruxsat beradi
  })
);
// *****
app.use("/", userRouter);
app.use("/", adminRoutes);
app.use("/category", categoryRoutes);
// *****

app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`${port}-portda ishladi`);
});
