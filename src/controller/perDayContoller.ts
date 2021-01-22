import { RequestHandler } from "express";

export const getTodoLists: RequestHandler = (req, res, next) => {
  const perDayId = req.params.pid;
};
export const getTodo: RequestHandler = (req, res, next) => {};
export const addTodo: RequestHandler = (req, res, next) => {};
export const updateTodo: RequestHandler = (req, res, next) => {};
export const removeTodo: RequestHandler = (req, res, next) => {};
