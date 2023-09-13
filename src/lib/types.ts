import * as z from "zod";

const modelSchema = z.union([z.literal("gpt-3.5-turbo"), z.literal("gpt-4")]);

export const gptSchema = z.object({
  secret: z.string().min(10),
  model: modelSchema.default("gpt-4"),
  prompt: z.string().min(10),
});

export type TModel = z.infer<typeof modelSchema>;

type TModels = {
  readonly label: string;
  readonly value: TModel;
};

export const models: TModels[] = [
  { label: "GPT-3.5 Turbo", value: "gpt-3.5-turbo" },
  { label: "GPT-4", value: "gpt-4" },
];

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

export type TMessage = {
  content: string;
  role: "assistant" | "user";
};
