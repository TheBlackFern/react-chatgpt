import { TMessage, TModel } from "../@types";
import { DEFAULT_CONTEXT } from "./const";
import { callWithRetry } from "./utils";

function fetchResponse(
  apiRequestBody: {
    model: TModel;
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
      role: "system" as const,
      content: context || DEFAULT_CONTEXT,
    },
  ];

  const apiRequestBody = {
    model: model,
    messages: [...contextMessage, ...messages],
    temperature: temperature,
  };

  const response = await callWithRetry(() =>
    fetchResponse(apiRequestBody, secret)
  );

  if (response.ok) {
    // console.log(`It's okay with ${response.status}`);
    return response.json();
  } else throw new Error(`${response.status}`);
  // } catch (error) {
  //   console.log(`It's not okay with ${getErrorMessage(error)}`);
  //   throw new Error(`${getErrorMessage(error)}`);
  // }
}
