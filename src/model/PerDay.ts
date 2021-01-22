import { Schema, model, Document, Types } from "mongoose";
import { ITodo } from "./Todo";

export interface IPerDay extends Document {
  todo: [ITodo];
}

const PerDay = new Schema(
  {
    todo: [{ type: Types.ObjectId, required: true, ref: "todo" }],
  },
  { timestamps: true }
);

export default model<IPerDay>("perday", PerDay);
