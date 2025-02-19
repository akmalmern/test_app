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

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
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
