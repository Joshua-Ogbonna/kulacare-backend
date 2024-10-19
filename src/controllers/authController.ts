import { Request, Response } from "express";
import { User } from "../models/User";
import { IUSer } from "../types";
import { generateUniqueCode } from "../utils/helpers";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, phoneNumber, healthInfo, healthCategory, goals } = req.body as Pick<
      IUSer,
      "name" | "phoneNumber" | "healthInfo" | "healthCategory" | "goals"
    >;

    const existingUser = await User.findOne({ phoneNumber });

    if (existingUser) {
      res
        .status(400)
        .json({ message: "User with this phone number already exists" });
      return;
    }

    const newUser = new User({
      name,
      phoneNumber,
      healthInfo,
      healthCategory,
      goals
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
