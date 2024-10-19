import { Request, Response } from "express";
import { amlClient, anthropicClient } from "../utils/anthropic";
import { User } from "../models/User";
import { Chat } from "../models/Chat";

export const processMessage = async (req: Request, res: Response) => {
  try {
    console.log("running");
    const { message, phoneNumber } = req.body as {
      message: string;
      phoneNumber: string;
    };

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      res.status(404).json({ message: "User not found!" });

      return;
    }

    if (!user.isActivated) {
      if (user.code !== message) {
        res.status(400).json({
          message:
            "Invalid activation code. Please generate a code on the web app",
        });
        return;
      }

      user.isActivated = true;
      await user.save();

      res.status(200).json({ message: "Code successfully activated!" });

      return;
    }

    let chat = await Chat.findOne({ userId: user._id });

    const systemPrompt = `You are an expert AI nutrition consultant providing personalized meal plans and cooking advice. User health info: Age: ${23}, Weight: ${80}kg, Height: ${60}cm, Dietary Restrictions: ${["Lactose intolerant"].join(", ")}, Health condition is ${"Overweight"} and has goals of ${["Lose weight, be fit"].join(", ")}

    Your responses should be direct and professional, focusing on:
    1. Detailed daily meal plans with specific portions tailored to the user's health profile, health category, and health goals.
    2. Precise recipes and cooking instructions for each meal.
    3. Nutritional rationale behind each recommendation.
    4. Adaptations based on the user's dietary restrictions and health conditions.
    5. NO APOLOGIES.
    6. Be a professional dietitian
    7. Go straight to the point with the answers
    8. GO STRAIGHT TO THE POINT
    9. STRAIGHT TO THE POINT. NO PRELUDE.
    10. FOOD CONTENT SHOULD BE WITHIN THE NIGERIAN FOOD FAMILY AND TRY TO USE FOOD ACCESSIBLE EASILY
    11. TRY TO USE FOOD AND SNACKS FAMILIAR WITH THE NIGERIAN LOCAL CONTEXT
    12. FOOD SHOULD BE TAILORED TO THE NIGERIAN GEOGRAPHY
    13. USE THE NIGERIAN TONE AND FOOD NAMES AS MUCH AS POSSIBLE`;

    if (!chat) {
      chat = new Chat({ userId: user._id, messages: [] });
    }

    chat.messages.push({
      content: message,
      isFromUser: true,
      timestamp: new Date(),
    });

    // const response = await anthropicClient.messages.create({
    //   max_tokens: 1024,
    //   temperature: 0.7,
    //   system: systemPrompt,
    //   messages: [
    //     ...chat.messages.map(
    //       (msg) =>
    //         ({
    //           role: msg.isFromUser ? "user" : "assistant",
    //           content: msg.content,
    //         }) as const
    //     ),
    //     { role: "user" as const, content: message },
    //   ],
    //   model: "claude-3-5-sonnet-20240620",
    // });

    // const aiResponse = response.content[0];

    const conversationHistory = chat.messages.map((msg) => ({
      role: msg.isFromUser ? "user" : "assistant",
      content: msg.content,
    }));

    fetch("https://api.aimlapi.com/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer a38f71fe48a84b88801e5d6a9aa65874",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
        messages: [
          {
            role: "user",
            content: message,
          },
          ...conversationHistory,
          { role: "system", content: systemPrompt },
        ],
        max_tokens: 512,
        stream: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.choices);
        res.json({ data });
      });

    // chat.messages.push({
    //   content: aiResponse.type === "text" ? aiResponse.text : "",
    //   isFromUser: false,
    //   timestamp: new Date(),
    // });

    // await chat.save();

    // res.json({ message: response.content });

    // Prepare conversation history
   

    //     // Chat with LLAMA
    //     const {data} = await amlClient.post("/chat/completions", {
    //       model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
    //       messages: [
    //         {
    //           role: "system",
    //           content: systemPrompt,
    //         },
    //         ...conversationHistory,
    //         { role: "user", content: message },
    //       ],
    //       temperature: 0.7,
    //       frequency_penalty: 1,
    //       top_k: 50,
    //       top_p: 0.7,
    //     });
    //     console.log(data)
    //     res.json({data})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
