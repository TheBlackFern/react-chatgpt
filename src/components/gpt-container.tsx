import * as React from "react";
import { motion } from "framer-motion";
import GPTForm from "./gpt-form";
import { GPTResponse, TMessage, TModel } from "@/lib/types";
import { fetchChatGPTResponse } from "@/lib/fetchChatGPTResponse";
import { useQuery } from "@tanstack/react-query";
import GPTMessages from "./gpt-messages";

const initialQuery = {
  secret: "",
  model: "gpt-4" as TModel,
  prompt: "",
  temperature: 0.7,
};

const GPTContainer = () => {
  const messagesRef = React.useRef<HTMLDivElement | null>(null);
  const [translationHeight, setTranslationHeight] = React.useState(0);
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

  React.useLayoutEffect(() => {
    messagesRef.current &&
      setTranslationHeight(messagesRef.current.offsetHeight);
  }, [messages]);

  return (
    <div className="flex h-auto w-screen items-center flex-col justify-start p-7">
      <GPTMessages
        ref={messagesRef}
        messages={messages}
        isFetching={isFetching}
      />
      <motion.div
        animate={{
          translateY: `${translationHeight}px`,
        }}
        transition={{
          ease: "easeInOut",
        }}
      >
        <GPTForm setQuery={setQuery} setMessages={setMessages} />
      </motion.div>
    </div>
  );
};

export default GPTContainer;
