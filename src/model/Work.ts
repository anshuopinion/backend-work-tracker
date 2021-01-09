import { Schema, model, Document } from "mongoose";

export interface IWork extends Document {
  work_name: string;
  work_color: string;
  work_complete_date: Date;
}

const WorkSchmea = new Schema(
  {
    work_name: { type: String, required: true },
    work_color: { type: String, required: true },
    work_complete_date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default model<IWork>("Work", WorkSchmea);
