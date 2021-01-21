import { Schema, model, Document } from "mongoose";

export interface IWork extends Document {
  work_name: string;
  work_color: string;
  work_complete_date: Date;
  total_days: number;
  per_day: [{ date: string; todoList: [{ name: string; done: boolean }] }];
}

const WorkSchmea = new Schema(
  {
    work_name: { type: String, required: true },
    work_color: { type: String, required: true },
    work_complete_date: { type: Date, required: true },
    total_days: { type: Number, required: true },
    per_day: [
      {
        date: { type: String, required: true },
        todoList: [
          {
            name: { type: String, required: true },
            done: { type: Boolean, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default model<IWork>("Work", WorkSchmea);
