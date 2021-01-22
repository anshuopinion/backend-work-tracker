import { Schema, model, Document } from "mongoose";

export interface IPerDay extends Document {
  todoList: [{ name: string; done: boolean }];
}

const PerDay = new Schema(
  {
    todo: [
      {
        name: { type: String, required: true },
        done: { type: Boolean, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default model<IPerDay>("PerDay", PerDay);
