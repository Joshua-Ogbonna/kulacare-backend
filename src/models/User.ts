import mongoose, { Schema } from "mongoose";
import { IUSer } from "../types";

const userSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  healthInfo: {
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    dietaryRestrictions: [{ type: String }],
  },
  code: { type: String, unique: true },
  isActivated: { type: Boolean, default: false },
  healthCategory: { type: String, required: true },
  goals: { type: Array<String>, required: true },
});

export const User = mongoose.model<IUSer>("User", userSchema);
