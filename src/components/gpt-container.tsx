import * as React from "react";
import { m } from "framer-motion";
import ScrollButton from "@/components/messages/scroll-button";
import ButtonReset from "@/components/form/reset-button";

import { useComponentHeight } from "@/hooks/useComponentHeight";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { fetchChatGPTResponse } from "@/lib/fetchChatGPTResponse";
import type { GPTResponse, TMessage, TModel, TPrompt } from "@/@types";

const GPTForm = React.lazy(() => import("./form/gpt-form"));
const GPTMessages = React.lazy(() => import("./messages/gpt-messages"));

const initialQuery = {
  secret: "",
  model: "gpt-4" as TModel,
  context: "I am a student using ChatGPT for research",
  prompt: "",
  temperature: 0.7,
};

const GPTContainer = () => {
  const [messages, setMessages] = React.useState<TMessage[]>([]);
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
    enabled: messages.length > 0,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const { toast } = useToast();
  const { t } = useTranslation(["messages"]);
  React.useEffect(() => {
    if (
      data &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content.length > 0
    ) {
      setMessages((prev) => [
        ...prev,
        {
          content: data.choices[0]?.message?.content,
          role: "assistant",
        },
      ]);
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

  const formRef = React.useRef<HTMLDivElement | null>(null);

  const messagesRef = React.useRef<HTMLDivElement | null>(null);
  const { translationHeight, resetTranslationHeight } = useComponentHeight(
    messagesRef,
    [messages, error]
  );

  return (
    <div className="flex relative h-auto w-full items-center flex-col justify-start p-7">
      <ScrollButton
        targetRef={formRef}
        className="fixed bottom-3 right-3 md:bottom-8 md:right-8"
      />
      <GPTMessages
        ref={messagesRef}
        messages={messages}
        isFetching={isFetching}
      />
      <m.div
        ref={formRef}
        className="max-w-[400px] p-5 w-screen"
        animate={{
          translateY: `${translationHeight}px`,
        }}
        transition={{
          ease: "easeInOut",
        }}
      >
        <GPTForm setQuery={setQuery} setMessages={setMessages}>
          <ButtonReset
            className="ml-auto"
            setMessages={setMessages}
            resetTranslationHeight={resetTranslationHeight}
          />
        </GPTForm>
      </m.div>
    </div>
  );
};

export default GPTContainer;
