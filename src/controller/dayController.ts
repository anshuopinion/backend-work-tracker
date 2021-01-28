import { RequestHandler, response } from "express";
import createHttpError from "http-errors";
import Day from "src/model/Day";
import Work from "src/model/Work";

export const addDay: RequestHandler = async (req, res, next) => {
  const workId = req.params.wid;
  const date = req.params.date;
  try {
    const work = await Work.findById(workId);
    if (!work) return next(createHttpError(404, "work not found"));
    const day = new Day({ date });
    try {
      work.days.push(day);
      await work.save();
    } catch (error) {
      return next(createHttpError(501, error));
    }
    res.status(201).json({ work });
  } catch (error) {
    return next(createHttpError(501, error));
  }
};
