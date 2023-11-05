import * as React from "react";
import GPTMessage from "@/components/messages/gpt-message";
import { AnimatePresence, m } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { TMessage } from "@/@types";
import ScrollButton from "./scroll-button";

type GPTMessagesProps = {
  messages: TMessage[];
  isFetching: boolean;
  targetRef: React.MutableRefObject<HTMLElement | null>;
};

const GPTMessages = React.forwardRef<HTMLDivElement, GPTMessagesProps>(
  ({ messages, isFetching, targetRef }, ref) => {
    const { t } = useTranslation(["messages"]);

    if (messages.length > 0)
      return (
        <>
          <ScrollButton
            targetRef={targetRef}
            className="fixed bottom-3 right-3 md:bottom-8 md:right-8"
          />
          <div
            ref={ref}
            className="absolute flex flex-col gap-4 w-full max-w-[1000px] px-3 md:px-20 pb-10 pt-7 z-10"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <GPTMessage message={msg} key={i} />
              ))}
              {isFetching && (
                <m.div
                  className="self-end"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <p className="font-sans px-3 py-1.5 rounded-xl w-fit shadow-md bg-background border-2 ml-5">
                    {t("typing")}
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </>
      );
    return null;
  }
);

export default GPTMessages;
