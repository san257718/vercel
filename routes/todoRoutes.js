const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// 獲取所有 To-Do 項目
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 創建新的 To-Do 項目
router.post("/", async (req, res) => {
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
router.patch("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

module.exports = router;
