import express from "express";
import { addTodo, getTodos } from "../data.js";

// simplify the process of defining routes that can be handled by Express
const router = express.Router();

router.get("/todos", (req, res) => {
  const todos = getTodos();

  res.json({ todos });
});

router.post("/todos", (req, res) => {
  const text = req.body.text;

  const addedTodo = addTodo(text);

  res.json({ message: "Todo Added!", todo: addedTodo });
});

export default router;
