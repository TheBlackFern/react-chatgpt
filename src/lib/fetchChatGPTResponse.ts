import { TMessage, TModel } from "../@types";
import { getErrorMessage } from "./utils";
import { backOff } from "exponential-backoff";

export const DEFAULT_CONTEXT = "I am a student making research using chatgpt";

function fetchResponse(
  apiRequestBody: {
    model: "gpt-3.5-turbo" | "gpt-4" | "gpt-3.5-turbo-16k" | "gpt-4-32k";
    messages: {
      role: string;
      content: string;
    }[];
    temperature: number;
  },
  secret: string
) {
  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + secret,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiRequestBody),
  });
}

export async function fetchChatGPTResponse(
  model: TModel,
  secret: string,
  temperature: number,
  messages: TMessage[],
  context?: string
) {
  const contextMessage = [
    {
      role: "system",
      content: context || DEFAULT_CONTEXT,
    },
  ];

  const apiRequestBody = {
    model: model,
    messages: [...contextMessage, ...messages],
    temperature: temperature,
  };

  try {
    const response = await backOff(() => fetchResponse(apiRequestBody, secret));
    if (response.ok) {
      return response.json();
    } else throw new Error(`${response.status}`);
  } catch (error) {
    throw new Error(`${getErrorMessage(error)}`);
  }
}
