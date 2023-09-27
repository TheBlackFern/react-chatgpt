import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";

type ScrollButtonProps = {
  targetRef: React.MutableRefObject<HTMLDivElement | null>;
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
