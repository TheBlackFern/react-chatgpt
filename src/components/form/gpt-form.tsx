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

type GPTFormProps = {
  makeQuery(prompt: TPrompt): void;
  addMessage(messageText: string): void;
  reset(): void;
};

function GPTForm({ makeQuery, addMessage, reset }: GPTFormProps) {
  const { t } = useTranslation(["form"]);
  const [step, setStep] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);

  const form = useForm<TPrompt>({
    resolver: zodResolver(gptSchema),
    defaultValues: {
      secret: "",
      model: "gpt-4",
      temperature: 0.7,
      prompt: "",
    },
  });

  async function onFirstNext() {
    await form.trigger("secret");
    const secretState = form.getFieldState("secret");
    const isSecretValid = secretState.isDirty && !secretState.invalid;
    if (isSecretValid) {
      setStep((prev) => prev + 1);
    }
  }

  async function onThirdNext() {
    await form.trigger("context");
    const contextState = form.getFieldState("context");
    if (!contextState.invalid) {
      setStep((prev) => prev + 1);
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
      nextFunction: () => setStep((prev) => prev + 1),
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
        {formSteps.map(({ Component, nextFunction }, index) => (
          <Component
            step={step}
            form={form}
            submitted={submitted}
            children={
              <div className="flex gap-3 mt-3">
                {index !== 3 && (
                  <Button
                    data-testid={`form-next-${index + 1}`}
                    type="button"
                    disabled={step !== index + 1}
                    onClick={nextFunction}
                  >
                    {t("next")}
                  </Button>
                )}
                {index === formSteps.length - 1 && (
                  <Button
                    data-testid="form-submit"
                    type="submit"
                    disabled={step !== index + 1}
                  >
                    {t("submit")}
                  </Button>
                )}
                {index !== 0 && (
                  <Button
                    data-testid={`form-back-${index + 1}`}
                    type="button"
                    variant={"ghost"}
                    onClick={() => setStep((prev) => prev - 1)}
                    disabled={step !== index + 1}
                  >
                    {t("back")}
                  </Button>
                )}
                {submitted && step === formSteps.length && (
                  <ResetButton reset={reset} />
                )}
              </div>
            }
          />
        ))}
      </form>
    </Form>
  );
}

export default GPTForm;
