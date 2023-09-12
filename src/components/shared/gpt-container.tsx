import * as React from "react";
import { fetchChatGPTResponse } from "@/lib/fetchChatGPTResponse";
import { useQuery } from "@tanstack/react-query";
import GPTSecretForm from "@/components/forms/secret-form";
import GPTQueryForm from "@/components/forms/query-form";

type GPTChoice = {
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
  index: number;
};

export type GPTResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: GPTChoice[];
};

const GPTContainer = () => {
  const [gptType, setGptType] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [secret, setSecret] = React.useState("");
  const { isFetching, error, data, refetch } = useQuery<GPTResponse, Error>({
    queryKey: ["test", query],
    queryFn: () => fetchChatGPTResponse(query, secret, gptType),
    enabled: false,
    refetchOnMount: false,
  });

  React.useEffect(() => {
    if (query.length > 0) {
      refetch();
    }
  }, [query]);

  return (
    <div className="flex h-auto w-screen items-center flex-col justify-start gap-5">
      {secret === "" && <GPTSecretForm setSecret={setSecret} />}
      {secret && (
        <div className="mb-12 flex items-center flex-col">
          <GPTQueryForm setQuery={setQuery} setGptType={setGptType} />
          {query.length === 0 && !isFetching && (
            <p className="text-base text-foreground text-center">
              Type a query!
            </p>
          )}
          {query.length > 0 && (
            <p className="flex flex-col gap-3 max-w-6xl text-center">
              <span className="text-muted-foreground">ChatGPT's response:</span>
              <span>
                {isFetching
                  ? "He thinking..."
                  : error
                  ? `Snap, an error! ${error.message}`
                  : data?.choices[0]?.message?.content}
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GPTContainer;
