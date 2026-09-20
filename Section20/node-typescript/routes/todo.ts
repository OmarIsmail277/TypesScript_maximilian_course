import express from "express";
import { addTodo, getTodos, getTodo, updateTodo, removeTodo } from "../data.js";

// simplify the process of defining routes that can be handled by Express
const router = express.Router();

router.post("/todos", (req, res) => {
  const text = req.body.text;

  const addedTodo = addTodo(text);

  res.json({ message: "Todo Added!", todo: addedTodo });
});

router.get("/todos", (req, res) => {
  const todos = getTodos();

  res.json({ todos });
});

router.get("/todos/:id", (req, res) => {
  try {
    const todo = getTodo(+req.params.id);
    res.json({ todo });
  } catch (error) {
    res.status(404).json({ message: "Todo not found" });
  }
});

router.patch("/todos/:id", (req, res) => {
  try {
    const updatedTodo = updateTodo(+req.params.id, req.body.text);
    res.json({ message: "Todo updated", todo: updatedTodo });
  } catch (error) {
    res.status(404).json({ message: "Todo not found" });
  }
});

router.delete("/todos/:id", (req, res) => {
  removeTodo(+req.params.id);
  res.json({ message: "Todo Deleted" });
});

export default router;
