import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollButtonProps = {
  targetRef: React.MutableRefObject<HTMLElement | null>;
} & React.HTMLAttributes<HTMLButtonElement>;

const ScrollButton = ({ targetRef, className }: ScrollButtonProps) => {
  const canScroll = useInView(targetRef, { amount: 0.5 });

  function handleClick() {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <Button
      data-testid="scroll-button"
      variant={"outline"}
      onClick={handleClick}
      className={cn(
        "px-1 py-1 h-fit w-fit rounded-full",
        { hidden: canScroll },
        className
      )}
    >
      <ChevronDown size={32} />
    </Button>
  );
};

export default ScrollButton;
