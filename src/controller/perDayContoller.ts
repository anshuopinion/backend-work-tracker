import { RequestHandler } from "express";

import createHttpError from "http-errors";
import PerDay from "src/model/PerDay";

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
export const getTodo: RequestHandler = async (req, res, next) => {};
export const addTodo: RequestHandler = async (req, res, next) => {};
export const updateTodo: RequestHandler = async (req, res, next) => {};
export const removeTodo: RequestHandler = async (req, res, next) => {};
