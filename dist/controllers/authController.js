"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByPhone = exports.signin = exports.generateCode = exports.createUser = void 0;
const User_1 = require("../models/User");
const helpers_1 = require("../utils/helpers");
const createUser = async (req, res) => {
    try {
        const { name, phoneNumber, healthInfo, healthCategory } = req.body;
        const existingUser = await User_1.User.findOne({ phoneNumber });
        if (existingUser) {
            res
                .status(400)
                .json({ message: "User with this phone number already exists" });
            return;
        }
        const newUser = new User_1.User({
            name,
            phoneNumber,
            healthInfo,
            healthCategory,
        });
        await newUser.save();
        res
            .status(201)
            .json({ message: "User created successfully", user: newUser });
    }
    catch (error) {
        console.error("Error creating User:", error);
        res.status(500).json({ message: "Error creating user" });
    }
};
exports.createUser = createUser;
const generateCode = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User_1.User.findById(userId);
        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        const code = (0, helpers_1.generateUniqueCode)();
        user.code = code;
        await user.save();
        res.status(200).json({ message: "User code generated successfully", code });
    }
    catch (error) {
        console.error("Error generating code:", error);
        res.status(500).json({ message: "Error generating code" });
    }
};
exports.generateCode = generateCode;
const signin = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const user = await User_1.User.findOne({ phoneNumber });
        if (!user) {
            res.status(404).json({ message: "User not found", success: false });
            return;
        }
        res.status(200).json({
            message: "Signin successful",
            success: true,
            user: {
                id: user._id,
                name: user.name,
                phoneNumber: user.phoneNumber,
                healthCategory: user.healthCategory,
            },
        });
    }
    catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ message: "Error signing in", success: false });
    }
};
exports.signin = signin;
const getUserByPhone = async (req, res) => {
    try {
        const { phoneNumber } = req.params;
        const user = await User_1.User.findOne({ phoneNumber });
        if (!user) {
            res.status(404).json({ message: "User not found", success: false });
            return;
        }
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                phoneNumber: user.phoneNumber,
                healthInfo: user.healthInfo,
                healthCategory: user.healthCategory,
                isActivated: user.isActivated,
                code: user.code
            }
        });
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            message: "Error fetching user details",
            success: false
        });
    }
};
exports.getUserByPhone = getUserByPhone;
