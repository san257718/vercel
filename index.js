require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./connectMongo");

const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/todos", todoRoutes);

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
