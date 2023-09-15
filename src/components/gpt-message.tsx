import React from "react";
import { TMessage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Copy, CopyCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type GPTMessageProps = {
  message: TMessage;
};

async function copyTextToClipboard(text: string) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}

const GPTMessage = ({ message }: GPTMessageProps) => {
  const [isCopied, setIsCopied] = React.useState(false);

  function handleCopyClick() {
    copyTextToClipboard(message.content)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-row gap-1.5 w-auto max-w-[66vw] px-3 py-1.5 rounded-xl shadow-md even:bg-background even:border-2 odd:bg-primary odd:text-primary-foreground odd:self-start even:self-end"
    >
      <pre
        className={
          message.role === "assistant"
            ? "after:h-[1em] whitespace-pre-line after:tracking-[1rem] break-words after:content-['\x000a0']"
            : ""
        }
      >
        {message.content}
      </pre>
      <Button
        variant={"outline"}
        onClick={handleCopyClick}
        className={cn("px-1 py-1 h-fit w-fit", {
          hidden: message.role === "user",
        })}
      >
        {isCopied ? <CopyCheck size={18} /> : <Copy size={18} />}
      </Button>
    </motion.div>
  );
};

export default GPTMessage;
