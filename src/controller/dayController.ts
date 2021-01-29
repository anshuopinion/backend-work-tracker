import { createHash } from "crypto";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
// import { startSession } from "mongoose";
import Day from "../model/Day";
import Work from "../model/Work";

export const addDay: RequestHandler = async (req, res, next) => {
  const workId = req.params.wid;
  try {
    const date = new Date().toLocaleDateString().split("/").join("-");
    const work = await Work.findById(workId);
    if (!work) return next(createHttpError(404, "work not found"));
    const dayExist = work.days.filter((day) => day.date !== date);
    if (dayExist) return next(createHttpError(407, "day already exist"));
    const day = new Day({ date });
    await day.save();
    work.days.push(day);
    work.save();
    res.status(201).json(day);
  } catch (error) {
    return next(createHttpError(501, error));
  }
};
