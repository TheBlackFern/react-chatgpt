import * as React from "react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchChatGPTResponse } from "@/lib/fetchChatGPTResponse";
import type { GPTResponse, TMessage, TPrompt } from "@/@types";
import { getMessagesFromStorage } from "@/lib/utils";

export function useMessages(initialQuery: TPrompt) {
  const { t } = useTranslation(["messages"]);
  const initialMessages = getMessagesFromStorage();
  const [messages, setMessages] = React.useState<TMessage[]>(initialMessages);
  const [query, setQuery] = React.useState<TPrompt>(initialQuery);
  const { isFetching, error, data } = useQuery<GPTResponse, Error>({
    queryKey: ["test", query.prompt],
    queryFn: () =>
      fetchChatGPTResponse(
        query.model,
        query.secret,
        query.temperature,
        messages,
        query.context
      ),
    enabled: messages.length % 2 === 1,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const { toast } = useToast();

  React.useEffect(() => {
    if (
      data &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content.length > 0
    ) {
      setMessages((prev) => {
        const newMessages = [
          ...prev,
          {
            content: data.choices[0]?.message?.content,
            role: "assistant" as const,
          },
        ];
        localStorage.setItem("messages", JSON.stringify(newMessages));
        return newMessages;
      });
    }
  }, [data]);

  React.useEffect(() => {
    if (error) {
      toast({
        title: t("error"),
        description: error?.message === "401" ? t("error-cred") : "",
      });
    }
  }, [error]);

  function makeQuery(prompt: TPrompt) {
    setQuery({
      model: prompt.model,
      secret: prompt.secret,
      context: prompt.context,
      prompt: prompt.prompt,
      temperature: prompt.temperature,
    });
  }

  function resetMessages() {
    setMessages([]);
  }

  function addMessage(messageText: string) {
    setMessages((prev) => [
      ...prev,
      {
        content: messageText,
        role: "user",
      },
    ]);
  }

  return { messages, addMessage, resetMessages, isFetching, error, makeQuery };
}
