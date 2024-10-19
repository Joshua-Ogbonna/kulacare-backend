import { Router } from "express";

import {
  createUser,
  generateCode,
  getUserByPhone,
  signin,
} from "../controllers/authController";

export const router = Router();

router.post("/create-user", createUser);
router.post("/generate-code", generateCode);
router.post("/signin", signin);
router.get("/user/:phoneNumber", getUserByPhone)