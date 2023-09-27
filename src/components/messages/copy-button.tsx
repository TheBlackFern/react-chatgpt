import * as React from "react";
import { Copy, CopyCheck } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type CopyButtonProps = {
  textToCopy: string;
} & React.HTMLAttributes<HTMLButtonElement>;

const CopyButton = ({ textToCopy, className }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = React.useState(false);

  async function copyTextToClipboard(text: string) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  function handleCopyClick() {
    copyTextToClipboard(textToCopy)
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
    <Button
      variant={"outline"}
      onClick={handleCopyClick}
      className={cn("px-1 py-1 h-fit w-fit", className)}
    >
      {isCopied ? <CopyCheck size={18} /> : <Copy size={18} />}
    </Button>
  );
};

export default CopyButton;
