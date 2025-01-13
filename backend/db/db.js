const mongoose = require("mongoose");

const DB = () => {
  try {
    mongoose.connect(process.env.DB);
    console.log("db ga ulandi");
  } catch (error) {
    console.log(error);
  }
};

module.exports = DB;
