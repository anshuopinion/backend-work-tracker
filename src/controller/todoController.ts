import { RequestHandler } from "express";

import createHttpError from "http-errors";
import { startSession } from "mongoose";
import PerDay from "src/model/PerDay";
import Todo from "src/model/Todo";

export const getTodoLists: RequestHandler = async (req, res, next) => {
  const perDayId = req.params.pid;
  try {
    const perDay = await PerDay.findById(perDayId);
    if (!perDay) return next(createHttpError(404, "Day not found"));
    res.status(200).json(perDay.todo);
  } catch (error) {
    return next(createHttpError(501, error));
  }
};
export const getTodo: RequestHandler = async (req, res, next) => {
  const todoId = req.params.tid;
  try {
    const todo = await Todo.findById(todoId);
    if (!todo) return next(createHttpError(404, "todo not found"));
    res.status(200).json(todo);
  } catch (error) {
    return next(createHttpError(501, error));
  }
};
export const addTodo: RequestHandler = async (req, res, next) => {
  const perDayId = req.params.pid;
  const { name } = req.body;
  try {
    const perDay = await PerDay.findById(perDayId);
    if (!perDay) return next(createHttpError(404, "Day not found"));
    const todo = new Todo({ name, done: false });
    try {
      const sess = await startSession();
      sess.startTransaction();
      await todo.save({ session: sess });
      perDay.todo.push(todo);
      await perDay.save();
      await sess.commitTransaction();
    } catch (error) {
      return next(createHttpError(500, error));
    }

    res.status(200).json(todo);
  } catch (error) {
    return next(createHttpError(501, error));
  }
};
export const updateTodo: RequestHandler = async (req, res, next) => {
  const todoId = req.params.tid;
  const { done, name } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(todoId, { done, name });
    if (!todo)
      return next(createHttpError(404, "todo not found, Cannot upate"));
    res.status(200).json({ todo });
  } catch (error) {
    return next(createHttpError(501, error));
  }
};
export const removeTodo: RequestHandler = async (req, res, next) => {
  const todoId = req.params.tid;

  try {
    const todo = await Todo.findByIdAndDelete(todoId);
    if (!todo)
      return next(createHttpError(404, "todo not found, Cannot delete"));
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    return next(createHttpError(501, error));
  }
};
