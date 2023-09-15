import { TMessage } from "@/lib/types";
import GPTMessage from "./gpt-message";
import { ScrollArea } from "@/components/ui/scroll-area";

type GPTMessagesProps = {
  messages: TMessage[];
  isFetching: boolean;
};

const GPTMessages = ({ messages, isFetching }: GPTMessagesProps) => {
  if (messages.length > 0)
    return (
      <ScrollArea className="w-screen h-[40vh] border-t">
        <div className="flex flex-col gap-4 py-2 pl-2 pr-5">
          {messages.map((msg, i) => (
            <GPTMessage message={msg} key={i} />
          ))}
          {isFetching && (
            <p className="font-sans px-3 py-1.5 rounded-xl w-fit self-end shadow-md bg-background border-2 ml-5">
              Typing...
            </p>
          )}
        </div>
      </ScrollArea>
    );
  return null;
};

export default GPTMessages;
