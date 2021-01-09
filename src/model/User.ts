import { Schema, model, Document, Types } from "mongoose";
import { IWork } from "./Work";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  data?: any;
  works: [IWork];
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    data: {},
    works: [{ type: Types.ObjectId, required: true, ref: "Work" }],
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
