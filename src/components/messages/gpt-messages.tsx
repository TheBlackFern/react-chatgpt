import * as React from "react";
import { TMessage } from "@/lib/types";
import GPTMessage from "./gpt-message";
import { AnimatePresence, m } from "framer-motion";
import { useTranslation } from "react-i18next";

type GPTMessagesProps = {
  messages: TMessage[];
  error: Error | null;
  isFetching: boolean;
};

const GPTMessages = React.forwardRef<HTMLDivElement, GPTMessagesProps>(
  ({ messages, error, isFetching }, ref) => {
    const { t } = useTranslation(["messages"]);

    if (messages.length > 0)
      return (
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
          {error && (
            <p className="text-destructive font-medium text-lg">{t("error")}</p>
          )}
        </div>
      );
    return null;
  }
);

export default GPTMessages;
