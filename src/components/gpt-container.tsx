import * as React from "react";
import { m } from "framer-motion";
import { GPTResponse, TMessage, TModel } from "@/lib/types";
import { fetchChatGPTResponse } from "@/lib/fetchChatGPTResponse";
import { useQuery } from "@tanstack/react-query";
import ScrollButton from "./messages/scroll-button";

const GPTForm = React.lazy(() => import("./form/gpt-form"));
const GPTMessages = React.lazy(() => import("./messages/gpt-messages"));

const initialQuery = {
  secret: "",
  model: "gpt-4" as TModel,
  prompt: "",
  temperature: 0.7,
};

const GPTContainer = () => {
  const messagesRef = React.useRef<HTMLDivElement | null>(null);
  const formRef = React.useRef<HTMLDivElement | null>(null);
  const [translationHeight, setTranslationHeight] = React.useState(0);
  const [messages, setMessages] = React.useState<TMessage[]>([]);
  const [query, setQuery] = React.useState<typeof initialQuery>(initialQuery);
  const { isFetching, data } = useQuery<GPTResponse, Error>({
    queryKey: ["test", query.prompt],
    queryFn: () => fetchChatGPTResponse(query.model, query.secret, messages),
    enabled: messages.length > 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

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
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
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
        <GPTForm setQuery={setQuery} setMessages={setMessages} />
      </m.div>
    </div>
  );
};

export default GPTContainer;
