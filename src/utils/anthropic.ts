import Anthropic from "@anthropic-ai/sdk";
import axios from "axios";
import { OpenAI } from "openai";

const baseURL = "https://api.aimlapi.com/v1";
const apiKey = process.env.API_KEY;
const systemPrompt = "You are a travel agent. Be descriptive and helpful";
const userPrompt = "Tell me about San Francisco";

export const anthropicClient = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const api = new OpenAI({
  apiKey,
  baseURL,
});

export const amlClient = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
});
