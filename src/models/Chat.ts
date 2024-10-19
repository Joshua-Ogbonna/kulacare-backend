import mongoose, { Schema } from "mongoose";
import { IChat } from "../types";

const ChatSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    messages: [
      {
        content: { type: String, required: true },
        isFromUser: { type: Boolean, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Chat = mongoose.model<IChat>("Chat", ChatSchema);
