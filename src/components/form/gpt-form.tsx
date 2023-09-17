import * as React from "react";
import { infer as zodInfer } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { TMessage, TModel, gptSchema } from "@/lib/types";

import GPTFormStep1 from "./gpt-form-step-1";
const GPTFormStep2 = React.lazy(() => import("./gpt-form-step-2"));
const GPTFormStep3 = React.lazy(() => import("./gpt-form-step-3"));

type GPTFormProps = {
  setQuery: React.Dispatch<
    React.SetStateAction<{
      secret: string;
      model: TModel;
      prompt: string;
      temperature: number;
    }>
  >;
  setMessages: React.Dispatch<React.SetStateAction<TMessage[]>>;
};

function GPTForm({ setQuery, setMessages }: GPTFormProps) {
  const [step, setStep] = React.useState(1);

  const form = useForm<zodInfer<typeof gptSchema>>({
    resolver: zodResolver(gptSchema),
    defaultValues: {
      secret: "",
      model: "gpt-4",
      temperature: 0.7,
      prompt: "",
    },
  });

  function onFirstNext() {
    form.trigger("secret");
    const secretState = form.getFieldState("secret");
    if (!secretState.isDirty || secretState.invalid) return;
    setStep((prev) => prev + 1);
  }

  function onSecondNext() {
    setStep((prev) => prev + 1);
  }

  function onBack() {
    setStep((prev) => prev - 1);
  }

  function onSubmit(values: zodInfer<typeof gptSchema>) {
    setQuery({
      model: values.model,
      secret: values.secret,
      prompt: values.prompt,
      temperature: values.temperature,
    });
    setMessages((prev) => [
      ...prev,
      {
        content: values.prompt,
        role: "user",
      },
    ]);
    console.log(values);
    form.resetField("prompt");
    // form.resetField("temperature");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative w-[400px] min-h-[400px] overflow-x-hidden"
      >
        <GPTFormStep1 form={form} step={step} onFirstNext={onFirstNext} />
        <GPTFormStep2
          form={form}
          step={step}
          onSecondNext={onSecondNext}
          onBack={onBack}
        />
        <GPTFormStep3 form={form} step={step} onBack={onBack} />
      </form>
    </Form>
  );
}

export default GPTForm;
