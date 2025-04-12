"use server";

import { NextApiRequest, NextApiResponse } from "next";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Securely access the API key on the server
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { messages, model } = req.body;

      // Call the Groq API
      const chatCompletion = await groq.chat.completions.create({
        messages,
        model,
      });

      // Return the response to the client
      res.status(200).json(chatCompletion);
    } catch (error) {
      res.status(500).json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
