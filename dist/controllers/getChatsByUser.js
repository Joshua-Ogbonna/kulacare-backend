"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatsByUser = void 0;
const User_1 = require("../models/User");
const Chat_1 = require("../models/Chat");
const getChatsByUser = async (req, res) => {
    try {
        const { phoneNumber } = req.params;
        // Find the user by phone number
        const user = await User_1.User.findOne({ phoneNumber });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Fetch chats for the user
        const chats = await Chat_1.Chat.find({ userId: user._id });
        // if (!chats.length) {
        //   res.status(404).json({ message: "No chats found for this user" });
        //   return;
        // }
        // Return the chats
        res.status(200).json({ chats });
    }
    catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getChatsByUser = getChatsByUser;
