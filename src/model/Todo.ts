import { Schema, model, Document } from "mongoose";

export interface ITodo extends Document {
  name: string;
  done: boolean;
}

const Todo = new Schema({
  name: { type: String, required: true },
  done: { type: Boolean, required: true },
});

export default model<ITodo>("todo", Todo);
