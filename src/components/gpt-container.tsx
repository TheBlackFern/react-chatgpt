import * as React from "react";
import GPTForm from "./gpt-form";
import { GPTResponse, TMessage, TModel } from "@/lib/types";
import { fetchChatGPTResponse } from "@/lib/fetchChatGPTResponse";
import { useQuery } from "@tanstack/react-query";
import GPTMessages from "./gpt-mesages";

const initialQuery = {
  secret: "",
  model: "gpt-4" as TModel,
  prompt: "",
};

const GPTContainer = () => {
  const [messages, setMessages] = React.useState<TMessage[]>([]);
  const [query, setQuery] = React.useState<typeof initialQuery>(initialQuery);
  const { isFetching, data, refetch } = useQuery<GPTResponse, Error>({
    queryKey: ["test", query],
    queryFn: () => fetchChatGPTResponse(query.model, query.secret, messages),
    enabled: false,
    refetchOnMount: false,
  });

  React.useEffect(() => {
    if (query.prompt.length > 0) {
      refetch();
    }
  }, [query.prompt]);

  React.useEffect(() => {
    if (data && data.choices[0]?.message?.content.length > 0) {
      setMessages((prev) => [
        ...prev,
        {
          content: data.choices[0]?.message?.content,
          role: "assistant",
        },
      ]);
    }
  }, [data]);

  return (
    <div className="flex h-auto w-screen items-center flex-col justify-start gap-5">
      <GPTForm setQuery={setQuery} setMessages={setMessages} />
      <GPTMessages messages={messages} isFetching={isFetching} />
    </div>
  );
};

export default GPTContainer;
