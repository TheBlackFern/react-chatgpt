import React from "react";
import { TMessage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Copy, CopyCheck } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="flex flex-row gap-0.5 font-sans w-auto[text-wrap:balance] max-w-[50vw] px-3 py-1.5 rounded-xl shadow-md even:bg-background even:border-2 odd:bg-primary odd:text-primary-foreground odd:self-start even:self-end">
      <p
        className={
          message.role === "assistant"
            ? "after:h-[1em] after:tracking-[1rem] after:content-['\x000a0']"
            : ""
        }
      >
        {message.content}
      </p>
      <Button
        variant={"outline"}
        onClick={handleCopyClick}
        className={cn("px-1 py-1 h-fit w-fit", {
          hidden: message.role === "user",
        })}
      >
        {isCopied ? <CopyCheck size={18} /> : <Copy size={18} />}
      </Button>
    </div>
  );
};

export default GPTMessage;
