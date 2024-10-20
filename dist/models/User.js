"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
    // goals: { type: Array<String>, required: true },
});
exports.User = mongoose_1.default.model("User", userSchema);
