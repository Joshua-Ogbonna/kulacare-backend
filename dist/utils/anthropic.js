"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.amlClient = exports.api = exports.anthropicClient = void 0;
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const axios_1 = __importDefault(require("axios"));
const openai_1 = require("openai");
const baseURL = "https://api.aimlapi.com/v1";
const apiKey = process.env.API_KEY;
const systemPrompt = "You are a travel agent. Be descriptive and helpful";
const userPrompt = "Tell me about San Francisco";
exports.anthropicClient = new sdk_1.default({
    apiKey: process.env.ANTHROPIC_API_KEY,
});
exports.api = new openai_1.OpenAI({
    apiKey,
    baseURL,
});
exports.amlClient = axios_1.default.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
    },
});
