require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  `mongodb+srv://nokelove1111:` +
    `${process.env.JWT_SECRETKEY}` +
    `@cluster0.fragl.mongodb.net/`
);

app.use("/todos", todoRoutes);

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
