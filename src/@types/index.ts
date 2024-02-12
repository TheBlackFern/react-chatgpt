import * as z from "zod";
import type { UseFormReturn } from "react-hook-form";
import { createUnionSchema } from "@/lib/zodFromUnion";
import { MODELS } from "@/lib/const";

const modelSchema = createUnionSchema(MODELS);

const emptyStringToUndefined = z.literal("").transform(() => undefined);

export const gptSchema = z.object({
  secret: z
    .string()
    .min(10, { message: "Key must be at least 10 characters long" }),
  model: modelSchema.default(MODELS[0]),
  context: z
    .string()
    .min(10, { message: "Context must be at least 10 characters long" })
    .optional()
    .or(emptyStringToUndefined),
  temperature: z.number().min(0.2).max(1.0).default(0.7),
  prompt: z
    .string()
    .min(10, { message: "Prompt must be at least 10 characters long" }),
});

export type TModel = z.infer<typeof modelSchema>;
export type TPrompt = z.infer<typeof gptSchema>;

export type GPTChoice = {
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

export type GPTFormStepProps = {
  step: number;
  form: UseFormReturn<TPrompt>;
  renderButtons(nextFunction: () => void): React.ReactNode;
  incrementStep(): void;
};
