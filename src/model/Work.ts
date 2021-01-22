import { Schema, model, Document, Types } from "mongoose";

export interface IWork extends Document {
  work_name: string;
  work_color: string;
  work_complete_date: Date;
  total_days: number;
}

const WorkSchmea = new Schema(
  {
    work_name: { type: String, required: true },
    work_color: { type: String, required: true },
    work_complete_date: { type: Date, required: true },
    total_days: { type: Number, required: true },
    per_day: { type: Types.ObjectId, ref: "PerDay" },
  },
  { timestamps: true }
);

export default model<IWork>("Work", WorkSchmea);
