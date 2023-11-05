import * as React from "react";
import GPTFormStep1 from "./gpt-form-step-1";
const GPTFormStep2 = React.lazy(() => import("./gpt-form-step-2"));
const GPTFormStep3 = React.lazy(() => import("./gpt-form-step-3"));
const GPTFormStep4 = React.lazy(() => import("./gpt-form-step-4"));
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TPrompt, gptSchema } from "@/@types";

type GPTFormProps = {
  makeQuery(prompt: TPrompt): void;
  addMessage(messageText: string): void;
  children: React.ReactNode;
};

function GPTForm({ makeQuery, addMessage, children }: GPTFormProps) {
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
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative min-h-[400px] mt-1 overflow-x-hidden"
      >
        <GPTFormStep1 form={form} step={step}>
          <Button
            data-testid="form-next-1"
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
              data-testid="form-next-2"
              type="button"
              onClick={() => setStep((prev) => prev + 1)}
              disabled={step !== 2}
            >
              {t("next")}
            </Button>
            <Button
              data-testid="form-back-2"
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
              data-testid="form-next-3"
              type="button"
              disabled={step !== 3}
              onClick={onThirdNext}
            >
              {t("next")}
            </Button>
            <Button
              data-testid="form-back-3"
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
            <Button
              data-testid="form-submit"
              type="submit"
              disabled={step !== 4}
            >
              {t("submit")}
            </Button>
            <Button
              data-testid="form-back-4"
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
