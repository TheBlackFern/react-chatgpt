import { TMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import CopyButton from "./copy-button";

type GPTMessageProps = {
  message: TMessage;
};

const GPTMessage = ({ message }: GPTMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-row gap-1.5 w-auto max-w-[66vw] px-3 py-1.5 rounded-xl shadow-md even:bg-background even:border-2 odd:bg-primary odd:text-primary-foreground odd:self-start even:self-end"
    >
      <pre
        className={cn(
          "whitespace-pre-line break-words",
          message.role === "assistant" &&
            "after:h-[1em] after:tracking-[1rem] after:content-['\x000a0']"
        )}
      >
        {message.content}
      </pre>
      <CopyButton
        textToCopy={message.content}
        className={cn({
          hidden: message.role === "user",
        })}
      />
    </motion.div>
  );
};

export default GPTMessage;
