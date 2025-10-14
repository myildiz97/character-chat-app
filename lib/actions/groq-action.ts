"use server"

import Groq from "groq-sdk";
import { MODEL } from '../constants/chat';
import { IChatMessageCore } from '../types/chat';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

interface IGetGroqChatCompletionProps {
  messages: IChatMessageCore[];
}

export async function getGroqChatCompletion({ messages }: IGetGroqChatCompletionProps) {
  return groq.chat.completions.create({
    messages,
    model: MODEL,
  });
}
