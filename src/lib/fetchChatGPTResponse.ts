export async function fetchChatGPTResponse(query: string, secret: string) {
  console.log(query);

  const apiRequestBody = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: query }],
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
