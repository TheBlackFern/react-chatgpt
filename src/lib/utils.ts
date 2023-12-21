import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DEFAULT_CONTEXT } from "./fetchChatGPTResponse";
import type { TModel } from "@/@types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function callWithRetry(
  fn: (...args: unknown[]) => Promise<Response>,
  depth = 10
): Promise<Response> {
  let retryCounter = 0;
  let res;
  while (retryCounter < depth) {
    res = await fn();
    if (res.ok) return res;
    await sleep(2 ** retryCounter * 100);
    retryCounter++;
  }
  return res!;
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
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
