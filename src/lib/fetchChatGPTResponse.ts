import { TMessage, TModel } from "./types";

export const DEFAULT_CONTEXT = "I am a student making research using chatgpt";

export async function fetchChatGPTResponse(
  model: TModel,
  secret: string,
  temperature: number,
  messages: TMessage[],
  context?: string
) {
  // console.log(messages);

  const CONTEXT = [
    {
      role: "system",
      content: context || DEFAULT_CONTEXT,
    },
  ];

  const apiRequestBody = {
    model: model,
    messages: [...CONTEXT, ...messages],
    temperature: temperature,
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + secret,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiRequestBody),
  });
  if (response.ok) {
    return response.json();
  } else throw new Error(`${response.status}`);
}
