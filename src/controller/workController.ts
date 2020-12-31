import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { startSession } from "mongoose";
// import { startSession } from "mongoose";
import User, { IUser } from "../model/User";
import Work, { IWork } from "../model/Work";

export const addNewWork: RequestHandler = async (req, res, next) => {
  const userId = req.params.uid;
  const { work_name, work_color, work_complete_date }: IWork = req.body;
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
  });

  try {
    const sess = await startSession();
    sess.startTransaction();
    await newWork.save({ session: sess });
    user.work.push(newWork);
    await user.save();
    await sess.commitTransaction();
  } catch (error) {
    return next(
      createHttpError(500, "Unable to create place, Try Again later.")
    );
  }
  res.status(201).json(newWork);
};
