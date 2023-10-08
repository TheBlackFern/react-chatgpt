import { TMessage, TModel } from "./types";

export async function fetchChatGPTResponse(
  model: TModel,
  secret: string,
  messages: TMessage[],
  context?: string
) {
  // console.log(messages);

  const CONTEXT = [
    {
      role: "system",
      content: context || "I am a student making research using chatgpt",
    },
  ];

  const apiRequestBody = {
    model: model,
    messages: [...CONTEXT, ...messages],
    temperature: 0.7,
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
