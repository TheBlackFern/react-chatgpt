import * as React from "react";
import { infer as zodInfer } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "../ui/button";

import { useTranslation } from "react-i18next";
import { TMessage, TPrompt, gptSchema } from "@/lib/types";

import GPTFormStep1 from "./gpt-form-step-1";
const GPTFormStep2 = React.lazy(() => import("./gpt-form-step-2"));
const GPTFormStep3 = React.lazy(() => import("./gpt-form-step-3"));
const GPTFormStep4 = React.lazy(() => import("./gpt-form-step-4"));

type GPTFormProps = {
  setQuery: React.Dispatch<React.SetStateAction<TPrompt>>;
  setMessages: React.Dispatch<React.SetStateAction<TMessage[]>>;
  children: React.ReactNode;
};

function GPTForm({ setQuery, setMessages, children }: GPTFormProps) {
  const [step, setStep] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);

  const { t } = useTranslation(["form"]);

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
    // console.log(!secretState.isDirty, secretState.invalid);
    // TODO: this sometimes fails to correctly check
    if (!secretState.isDirty || secretState.invalid) {
      return;
    }
    setStep((prev) => prev + 1);
  }

  function onSubmit(values: zodInfer<typeof gptSchema>) {
    setSubmitted(true);
    setQuery({
      model: values.model,
      secret: values.secret,
      context: values.context,
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
    // console.log(values);
    form.resetField("prompt");
    // form.resetField("temperature");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative min-h-[400px] mt-1 overflow-x-hidden"
      >
        <GPTFormStep1 form={form} step={step}>
          <Button
            data-testid="next-step-1"
            type="button"
            className="flex gap-3 mt-3"
            disabled={step !== 1}
            onClick={onFirstNext}
          >
            {t("next")}
          </Button>
        </GPTFormStep1>
        <GPTFormStep2 form={form} step={step}>
          <div className="flex gap-3 mt-3">
            <Button
              data-testid="next-step-2"
              type="button"
              onClick={() => setStep((prev) => prev + 1)}
              disabled={step !== 2}
            >
              {t("next")}
            </Button>
            <Button
              data-testid="back-step-2"
              type="button"
              variant={"ghost"}
              onClick={() => setStep((prev) => prev - 1)}
              disabled={step !== 2}
            >
              {t("back")}
            </Button>
          </div>
        </GPTFormStep2>
        <GPTFormStep3 form={form} step={step}>
          <div className="flex gap-3 mt-3">
            <Button
              data-testid="next-step-3"
              type="button"
              disabled={step !== 3}
              onClick={() => setStep((prev) => prev + 1)}
            >
              {t("next")}
            </Button>
            <Button
              data-testid="back-step-2"
              type="button"
              variant={"ghost"}
              onClick={() => setStep((prev) => prev - 1)}
              disabled={step !== 3}
            >
              {t("back")}
            </Button>
          </div>
        </GPTFormStep3>
        <GPTFormStep4 form={form} step={step} submitted={submitted}>
          <div className="flex gap-3 mt-3">
            <Button data-testid="submit" type="submit" disabled={step !== 4}>
              {t("submit")}
            </Button>
            <Button
              data-testid="back-step-3"
              type="button"
              variant={"ghost"}
              onClick={() => setStep((prev) => prev - 1)}
              disabled={step !== 4}
            >
              {t("back")}
            </Button>
            {submitted && step === 4 && children}
          </div>
        </GPTFormStep4>
      </form>
    </Form>
  );
}

export default GPTForm;
