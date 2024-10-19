import { Request, Response } from "express";
import { User } from "../models/User";
import { Chat } from "../models/Chat";

export const getChatsByUser = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.params;

    // Find the user by phone number
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Fetch chats for the user
    const chats = await Chat.find({ userId: user._id });

    // if (!chats.length) {
    //   res.status(404).json({ message: "No chats found for this user" });
    //   return;
    // }

    // Return the chats
    res.status(200).json({ chats });
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
