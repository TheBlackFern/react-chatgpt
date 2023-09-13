import { TMessage, TModel } from "./types";

export async function fetchChatGPTResponse(
  model: TModel,
  secret: string,
  messages: TMessage[]
) {
  console.log(prompt);

  const apiRequestBody = {
    model: model,
    messages: [{ role: "system", content: prompt }, ...messages],
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

  return response.json();
}
