import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { startSession } from "mongoose";
import User, { IUser } from "../model/User";
import Work, { IWork } from "../model/Work";
export const getWorksByUserId: RequestHandler = async (req, res, next) => {
  const userId = req.params.uid;
  let user: IUser | null;

  try {
    user = await User.findById(userId).populate("works");
  } catch (error) {
    return next(
      createHttpError(501, "Something went wrong | Unable to find user")
    );
  }
  if (!user) return next(createHttpError(404, "User not found | Invalid user"));

  return res.status(200).json(user.works);
};

export const addNewWork: RequestHandler = async (req, res, next) => {
  const userId = req.params.uid;
  const { work_name, work_color, work_complete_date }: IWork = req.body;

  //Calculate Date Difference
  const currentDate: any = new Date();
  const recivedDate: any = new Date(work_complete_date);
  const diffTime = Math.abs(recivedDate - currentDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let user: IUser | null;

  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(
      createHttpError(501, "Something went wrong | Unable to find user")
    );
  }

  if (!user) return next(createHttpError(404, "User not found | Invalid user"));

  const newWork = new Work({
    work_name,
    work_color,
    work_complete_date,
    total_days: diffDays,
  });

  try {
    const sess = await startSession();
    sess.startTransaction();
    await newWork.save({ session: sess });
    user.works.push(newWork);
    await user.save();
    await sess.commitTransaction();
  } catch (error) {
    return next(createHttpError(500, error));
  }
  res.status(201).json(newWork);
};

export const deleteWork: RequestHandler = async (req, res, next) => {
  const workId = req.params.wid;
  try {
    await Work.findByIdAndDelete(workId);
  } catch (error) {
    return next(
      createHttpError(501, "Something went wrong | Unable to delele work")
    );
  }
  res.status(200).json({ message: "deleted SuccessFully" });
};

export const getWorkById: RequestHandler = async (req, res, next) => {
  const workId = req.params.wid;
  try {
    const work = await Work.findById(workId);
    if (!work) return next(createHttpError(404, "Work Not found"));
    res.status(200).json(work);
  } catch (error) {
    return next(
      createHttpError(501, "Something went wrong ! Unable to find work")
    );
  }
};
