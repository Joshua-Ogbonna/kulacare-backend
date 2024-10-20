import { Request, Response } from "express";
import { User } from "../models/User";
import { IUSer } from "../types";
import { generateUniqueCode } from "../utils/helpers";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, phoneNumber, healthInfo, healthCategory } = req.body as Pick<
      IUSer,
      "name" | "phoneNumber" | "healthInfo" | "healthCategory"
    >;

    const existingUser = await User.findOne({ phoneNumber });

    if (existingUser) {
      res
        .status(400)
        .json({ message: "User with this phone number already exists" });
      return;
    }

    const code = generateUniqueCode();

    const newUser = new User({
      name,
      phoneNumber,
      healthInfo,
      healthCategory,
      code
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating User:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const generateCode = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body as { userId: string };

    const user = await User.findById(userId);

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const code = generateUniqueCode();

    user.code = code;
    await user.save();

    res.status(200).json({ message: "User code generated successfully", code });
  } catch (error) {
    console.error("Error generating code:", error);
    res.status(500).json({ message: "Error generating code" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body as { phoneNumber: string };

    const user = await User.findOne({ phoneNumber });

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
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "Error signing in", success: false });
  }
};

export const getUserByPhone = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.params;

    const user = await User.findOne({ phoneNumber });

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
    
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ 
      message: "Error fetching user details", 
      success: false 
    });
  }
};