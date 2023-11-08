import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DEFAULT_CONTEXT } from "./fetchChatGPTResponse";
import type { TModel } from "@/@types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMessagesFromStorage() {
  const msgs = localStorage.getItem("messages");
  return msgs ? JSON.parse(msgs) : [];
}

export function getInitialQueryFromStorage() {
  const savedSecret = localStorage.getItem("secret");
  const savedContext = localStorage.getItem("context");
  const savedModel = localStorage.getItem("model");

  return {
    secret: savedSecret || "",
    model: (savedModel || "gpt-4") as TModel,
    context: savedContext || DEFAULT_CONTEXT,
    prompt: "",
    temperature: 0.7,
  };
}
