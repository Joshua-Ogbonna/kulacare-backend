import { Document } from "mongoose";

interface IUSer extends Document {
  name: string;
  phoneNumber: string;
  healthInfo: {
    age: number;
    weight: number;
    height: number;
    dietaryRestrictions: Array<string>;
  };
  code: string;
  isActivated: boolean;
  healthCategory: string;
  // goals: Array<string>;
}

interface IMessage {
  content: string;
  isFromUser: boolean;
  timestamp: Date;
}

export interface IChat extends Document {
  userId: mongoose.Types.ObjectId;
  messages: IMessage[];
}
