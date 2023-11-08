import * as React from "react";
import GPTFormStep1 from "./gpt-form-step-1";
const GPTFormStep2 = React.lazy(() => import("./gpt-form-step-2"));
const GPTFormStep3 = React.lazy(() => import("./gpt-form-step-3"));
const GPTFormStep4 = React.lazy(() => import("./gpt-form-step-4"));
import ResetButton from "./reset-button";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TPrompt, gptSchema } from "@/@types";
import { getInitialQueryFromStorage } from "@/lib/utils";

type GPTFormProps = {
  makeQuery(prompt: TPrompt): void;
  addMessage(messageText: string): void;
  reset(): void;
  isSubmitted: boolean;
};

function GPTForm({ makeQuery, addMessage, reset, isSubmitted }: GPTFormProps) {
  const { t } = useTranslation(["form"]);
  const [step, setStep] = React.useState(isSubmitted ? 4 : 1);
  const [submitted, setSubmitted] = React.useState(isSubmitted);

  const initialQuery = getInitialQueryFromStorage();
  const form = useForm<TPrompt>({
    resolver: zodResolver(gptSchema),
    defaultValues: {
      secret: initialQuery.secret,
      model: initialQuery.model,
      context: initialQuery.context,
      temperature: initialQuery.temperature,
      prompt: initialQuery.prompt,
    },
  });

  async function onFirstNext() {
    await form.trigger("secret");
    const secretState = form.getFieldState("secret");
    if (!secretState.invalid) {
      setStep((prev) => prev + 1);
      localStorage.setItem("secret", form.getValues("secret"));
    }
  }

  async function onSecondNext() {
    setStep((prev) => prev + 1);
    localStorage.setItem("model", form.getValues("model"));
  }

  async function onThirdNext() {
    await form.trigger("context");
    const contextState = form.getFieldState("context");
    if (!contextState.invalid) {
      setStep((prev) => prev + 1);
      localStorage.setItem("context", form.getValues("context") || "");
    }
  }

  function onSubmit(values: TPrompt) {
    setSubmitted(true);
    makeQuery(values);
    addMessage(values.prompt);
    form.resetField("prompt");
  }

  const formSteps = [
    {
      Component: GPTFormStep1,
      nextFunction: onFirstNext,
    },
    {
      Component: GPTFormStep2,
      nextFunction: onSecondNext,
    },
    {
      Component: GPTFormStep3,
      nextFunction: onThirdNext,
    },
    {
      Component: GPTFormStep4,
      nextFunction: () => {},
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative min-h-[400px] mt-1 overflow-x-hidden"
      >
        {formSteps.map(({ Component, nextFunction }, index) => {
          const isLast = index === formSteps.length - 1;
          const currentStep = index + 1;
          return (
            <Component
              key={index}
              step={step}
              form={form}
              submitted={submitted}
              children={
                <div className="flex gap-3 mt-3">
                  {!isLast && (
                    <Button
                      data-testid={`form-next-${currentStep}`}
                      type="button"
                      disabled={step !== currentStep}
                      onClick={nextFunction}
                    >
                      {t("next")}
                    </Button>
                  )}
                  {isLast && (
                    <Button
                      data-testid="form-submit"
                      type="submit"
                      disabled={step !== currentStep}
                    >
                      {t("submit")}
                    </Button>
                  )}
                  {index !== 0 && (
                    <Button
                      data-testid={`form-back-${currentStep}`}
                      type="button"
                      variant={"ghost"}
                      onClick={() => setStep((prev) => prev - 1)}
                      disabled={step !== currentStep}
                    >
                      {t("back")}
                    </Button>
                  )}
                  {submitted && isLast && (
                    <ResetButton
                      className="ml-auto"
                      reset={() => {
                        reset();
                        localStorage.setItem("messages", JSON.stringify([]));
                        setStep(4);
                      }}
                    />
                  )}
                </div>
              }
            />
          );
        })}
      </form>
    </Form>
  );
}

export default GPTForm;
