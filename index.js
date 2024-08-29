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

app.get("todos/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 創建新的 To-Do 項目
app.post("todos/", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 更新 To-Do 項目
app.patch("todos/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const todo = await Todo.findByIdAndUpdate(userId, req.body.title);

    if (!todo) return res.status(404).json({ message: "To-Do not found" });

    if (req.body.title != null) {
      todo.title = req.body.title;
    }
    if (req.body.completed != null) {
      todo.completed = req.body.completed;
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 刪除 To-Do 項目
app.delete("todos/:id", async (req, res) => {
  try {
    const userId = req.params.id
    const deletedUser = await Todo.findByIdAndDelete(userId);

    console.log(userId);
    

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User successfully deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user" });
  }
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
