import { RequestHandler } from "express";
import createHttpError from "http-errors";
// import { startSession } from "mongoose";
import Day from "../model/Day";
import Work from "../model/Work";

export const addDay: RequestHandler = async (req, res, next) => {
  const workId = req.params.wid;
  try {
    const work = await Work.findById(workId);
    const date = new Date().toDateString();
    if (!work) return next(createHttpError(404, "work not found"));
    const existingDate = await Work.find({ date });
    if (existingDate) {
      return next(createHttpError(409, "already exist"));
    }
    const day = new Day({ date });
    await day.save();
    work.days.push(day);
    work.save();
    res.status(201).json({ day });
  } catch (error) {
    return next(createHttpError(501, error));
  }
};
