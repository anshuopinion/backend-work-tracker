import { Schema, model, Document, Types } from "mongoose";
import { IDay } from "./Day";

export interface IWork extends Document {
  work_name: string;
  work_color: string;
  work_complete_date: Date;
  total_days: number;
  days: [IDay];
}

const WorkSchmea = new Schema(
  {
    work_name: { type: String, required: true },
    work_color: { type: String, required: true },
    work_complete_date: { type: Date, required: true },
    days: [{ type: Types.ObjectId, ref: "day" }],
  },
  { timestamps: true }
);

export default model<IWork>("Work", WorkSchmea);
