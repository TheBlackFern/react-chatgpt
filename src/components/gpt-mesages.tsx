import { TMessage } from "@/lib/types";
import GPTMessage from "./gpt-message";

type GPTMessagesProps = {
  messages: TMessage[];
  isFetching: boolean;
};

const GPTMessages = ({ messages, isFetching }: GPTMessagesProps) => {
  if (messages.length > 0)
    return (
      <div className="w-screen flex flex-col mt-[350px] gap-4 my-6 border-t-2 pl-3 pr-5 ml-5 py-2">
        {messages.map((msg, i) => (
          <GPTMessage message={msg} key={i} />
        ))}
        {isFetching && (
          <pre className="font-sans px-3 py-1.5 rounded-xl w-fit self-end shadow-md bg-background border-2 ml-5">
            Typing...
          </pre>
        )}
      </div>
    );
  return null;
};

export default GPTMessages;
