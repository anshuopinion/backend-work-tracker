import { Schema, model, Document, Types } from "mongoose";
import { ITodo } from "./Todo";

export interface IDay extends Document {
  date: String;
  todo: [ITodo];
}

const Day = new Schema({
  date: { type: String, required: true },
  todo: [{ type: Types.ObjectId, ref: "todo" }],
});

export default model<IDay>("day", Day);
