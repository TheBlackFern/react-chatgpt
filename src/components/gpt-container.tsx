import * as React from "react";
import ScrollButton from "@/components/messages/scroll-button";
import { m } from "framer-motion";

import { useComponentHeight } from "@/hooks/useComponentHeight";
import { useMessages } from "@/hooks/useMessages";

const GPTForm = React.lazy(() => import("./form/gpt-form"));
const GPTMessages = React.lazy(() => import("./messages/gpt-messages"));

const GPTContainer = () => {
  const { messages, addMessage, resetMessages, isFetching, error, makeQuery } =
    useMessages();

  const formRef = React.useRef<HTMLDivElement | null>(null);
  const messagesRef = React.useRef<HTMLDivElement | null>(null);
  const { translationHeight, resetTranslationHeight } = useComponentHeight(
    messagesRef,
    [messages, error]
  );

  function reset() {
    resetTranslationHeight();
    resetMessages();
  }

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
        <GPTForm makeQuery={makeQuery} addMessage={addMessage} reset={reset} />
      </m.div>
    </div>
  );
};

export default GPTContainer;
