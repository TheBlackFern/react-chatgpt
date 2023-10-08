import { TMessage, TModel } from "./types";

const CONTEXT = [
  {
    role: "system",
    content: "I am a student making research using chatgpt",
  },
];

export async function fetchChatGPTResponse(
  model: TModel,
  secret: string,
  context: string,
  messages: TMessage[]
) {
  console.log(messages);
  const finalContext = context || CONTEXT;

  const apiRequestBody = {
    model: model,
    messages: [...finalContext, ...messages],
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
