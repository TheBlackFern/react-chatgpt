import * as React from "react";
import { motion } from "framer-motion";
import { GPTResponse, TMessage, TModel } from "@/lib/types";
import { fetchChatGPTResponse } from "@/lib/fetchChatGPTResponse";
import { useQuery } from "@tanstack/react-query";

import GPTForm from "./form/gpt-form";
const GPTMessages = React.lazy(() => import("./messages/gpt-messages"));

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
  }, [query.prompt, refetch]);

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
    if (messagesRef.current) {
      setTranslationHeight(messagesRef.current.offsetHeight);
      // messagesRef.current.scrollIntoView();
    }
  }, [messages]);

  React.useEffect(() => {
    function handleWindowResize() {
      if (messagesRef.current) {
        setTranslationHeight(messagesRef.current.clientHeight);
      }
    }
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

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
