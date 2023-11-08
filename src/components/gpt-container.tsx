import * as React from "react";
const GPTForm = React.lazy(() => import("@/components/form/gpt-form"));
const GPTMessages = React.lazy(
  () => import("@/components/messages/gpt-messages")
);
import { m } from "framer-motion";
import { useComponentHeight } from "@/hooks/useComponentHeight";
import { useMessages } from "@/hooks/useMessages";
import { getInitialQueryFromStorage } from "@/lib/utils";

const GPTContainer = () => {
  const { messages, addMessage, resetMessages, isFetching, error, makeQuery } =
    useMessages(getInitialQueryFromStorage());

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
      <GPTMessages
        ref={messagesRef}
        targetRef={formRef}
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
        <GPTForm
          makeQuery={makeQuery}
          addMessage={addMessage}
          reset={reset}
          isSubmitted={messages.length > 0}
        />
      </m.div>
    </div>
  );
};

export default GPTContainer;
