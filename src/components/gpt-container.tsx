import * as React from "react";
import GPTQueryForm from "@/components/gpt-query";
import { fetchChatGPTResponse } from "@/lib/fetchChatGPTResponse";
import { useQuery } from "@tanstack/react-query";

type GPTChoice = {
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
  index: number;
};

export type GPTResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: GPTChoice[];
};

const GPTContainer = () => {
  const [query, setQuery] = React.useState("");
  const [secret, setSecret] = React.useState("");
  const { isFetching, error, data, refetch } = useQuery<GPTResponse, Error>({
    queryKey: ["test", query],
    queryFn: () => fetchChatGPTResponse(query, secret),
    enabled: false,
    refetchOnMount: false,
  });

  React.useEffect(() => {
    if (query.length > 0) {
      refetch();
    }
  }, [query]);

  return (
    <div className="flex h-auto w-screen items-center flex-col justify-start gap-5">
      <GPTQueryForm setQuery={setQuery} setSecret={setSecret} />
      <div className="mb-12">
        {query.length === 0 && !isFetching && (
          <p className="text-base text-foreground">Type a query!</p>
        )}
        {query.length > 0 && (
          <p className="flex flex-col gap-3 text-start max-w-6xl ">
            <span className="text-muted-foreground text-center">
              ChatGPT's response:
            </span>
            <span>
              {isFetching
                ? "He thinking..."
                : error
                ? `Snap, an error! ${error.message}`
                : data?.choices[0]?.message?.content}
            </span>
            {/* a text for testing */}
            {/* <span>
              Once upon a time, in a peaceful forest, there lived a curious and
              ambitious beaver named Benny. Benny was known for his exceptional
              woodworking skills. He could build dams and lodges with remarkable
              precision. However, his true passion lay beyond his beaver world -
              he yearned to learn the art of coding. One sunny morning, as Benny
              surveyed his latest dam, he noticed a peculiar sight. A group of
              humans had gathered around a campfire, their fingers tapping away
              on shiny rectangular objects. Intrigued, Benny cautiously
              approached, trying to get a glimpse of what they were doing. "What
              are you all doing?" Benny inquired, his eyes filled with
              curiosity. One of the humans, named Alex, noticed Benny and
              smiled. "We're coding! We're creating websites, apps, and all
              sorts of cool things using computer languages." Benny's eyes
              sparkled with excitement. "That sounds amazing! Can I learn how to
              code too?" Alex chuckled, impressed by Benny's enthusiasm. "Sure,
              Benny! With determination and some guidance, you can learn
              anything. Let's start with the basics." And so, Benny embarked on
              his coding journey. Alex introduced him to HTML, the language used
              to create the structure and content of web pages. Benny quickly
              grasped the concepts and eagerly moved on to CSS, which allowed
              him to add style and visual appeal to his creations. Days turned
              into weeks, and weeks turned into months. Benny spent countless
              hours practicing, writing lines of code, and experimenting with
              different designs. He discovered JavaScript, a powerful language
              that enabled him to add functionality and interactivity to his
              projects. As Benny's skills grew, so did his ambitions. He dreamed
              of creating a website that showcased the beauty of his forest home
              while raising awareness about the importance of conserving nature.
              With unwavering determination, he set out to build his
              masterpiece. Late into the night, Benny worked tirelessly. He
              meticulously crafted each line of code, ensuring that every detail
              reflected the splendor of the forest. He chose vibrant colors
              reminiscent of the flowers and leaves, and he incorporated
              interactive elements that brought the animals of the forest to
              life. Finally, after months of hard work, Benny completed his
              website. It was a true masterpiece, capturing the essence of his
              beloved forest. He felt a sense of accomplishment and knew that he
              had achieved something remarkable. Excited to share his creation
              with the world, Benny invited Alex and the other humans to see his
              website. They were in awe of his talent and marveled at his
              ability to combine coding with his natural instincts. Word of
              Benny's incredible coding skills spread far and wide. People from
              all over the world visited his website, amazed by the beaver who
              had defied expectations and created a digital wonderland. Benny's
              success not only brought him recognition but also inspired other
              animals in the forest to explore their own passions. Some started
              painting, while others discovered a love for storytelling or
              music. Benny's coding journey had awakened a world of creativity
              within the forest, fostering an environment where every talent was
              celebrated. And so, Benny the beaver, the master of coding,
              continued to inspire others with his passion and determination. He
              proved that with dedication and an open mind, anyone could learn
              to code and create wonders, no matter how unexpected their
              background may be.
            </span> */}
          </p>
        )}
      </div>
    </div>
  );
};

export default GPTContainer;
