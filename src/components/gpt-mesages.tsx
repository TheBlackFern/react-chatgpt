// import { fetchChatGPTResponse } from "@/lib/fetchChatGPTResponse";
// import { useQuery } from "@tanstack/react-query";

import { TMessage } from "@/lib/types";

// type GPTChoice = {
//   message: {
//     role: string;
//     content: string;
//   };
//   finish_reason: string;
//   index: number;
// };

// export type GPTResponse = {
//   id: string;
//   object: string;
//   created: number;
//   model: string;
//   usage: {
//     prompt_tokens: number;
//     completion_tokens: number;
//     total_tokens: number;
//   };
//   choices: GPTChoice[];
// };

type GPTMessagesProps = {
  messages: TMessage[];
};

const GPTMessages = ({ messages }: GPTMessagesProps) => {
  return (
    <div className="flex flex-col gap-4 my-6">
      {messages.length > 0 &&
        messages.map((msg, i) => <pre key={i}>{msg.content}</pre>)}
    </div>
  );
};

export default GPTMessages;
