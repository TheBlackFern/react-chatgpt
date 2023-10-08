import * as React from "react";
import { AnimatePresence, m } from "framer-motion";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";

type GPTFormStep3Props = {
  step: number;
  form: UseFormReturn<{
    secret: string;
    model: "gpt-3.5-turbo" | "gpt-4";
    temperature: number;
    prompt: string;
  }>;
  submitted: boolean;
  children: React.ReactNode;
};

const CURRENT_STEP = 3;

const GPTFormStep3 = ({
  step,
  form,
  submitted,
  children,
}: GPTFormStep3Props) => {
  const { t } = useTranslation(["form"]);
  const tempComment = (val: number) => {
    if (val < 0.4) return t("degree.bland");
    if (val < 0.6) return t("degree.certain");
    if (val < 0.8) return t("degree.creative");
    if (val <= 1.0) return t("degree.random");
  };

  return (
    <m.div
      className="flex absolute p-1 left-0 right-0 top-0 flex-col"
      animate={{
        translateX: `${-(step - CURRENT_STEP) * 400}px`,
      }}
      style={{
        translateX: `${-(step - CURRENT_STEP) * 400}px`,
      }}
      transition={{
        ease: "easeInOut",
      }}
    >
      <AnimatePresence>
        {!submitted && (
          <m.div
            initial={{ opacity: 1, height: "auto", marginBottom: "12px" }}
            exit={{ opacity: 0, height: 0, marginBottom: "0px" }}
            transition={{ duration: 1, delay: 1 }}
          >
            <h1 className="font-medium text-xl">{t("step3.heading")}</h1>
          </m.div>
        )}
      </AnimatePresence>
      <FormField
        control={form.control}
        name="prompt"
        render={({ field }) => (
          <FormItem className="space-y-0">
            <FormLabel className="text-md block mb-1.5">
              {t("step3.title1")}
            </FormLabel>
            <AnimatePresence>
              {!submitted && (
                <m.div
                  initial={{
                    opacity: 1,
                    height: "auto",
                    marginBottom: "6px",
                  }}
                  exit={{ opacity: 0, height: 0, marginBottom: "0px" }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <FormDescription>{t("step3.description1")}</FormDescription>
                </m.div>
              )}
            </AnimatePresence>
            <FormControl>
              <Textarea
                data-testid="form-textarea"
                rows={2}
                placeholder={t("step3.placeholder")}
                {...field}
                disabled={step !== CURRENT_STEP}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="temperature"
        render={({ field }) => (
          <FormItem className="mt-3 space-y-0">
            <FormLabel className="text-md block mb-1.5">
              {t("step3.title2")}
            </FormLabel>
            <AnimatePresence>
              {!submitted && (
                <m.div
                  initial={{
                    opacity: 1,
                    height: "auto",
                    marginBottom: "12px",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    marginBottom: "0px",
                  }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <FormDescription>{t("step3.description2")}</FormDescription>
                </m.div>
              )}
            </AnimatePresence>
            <div className="flex flex-row gap-3 w-auto">
              <FormControl className="w-48">
                <Slider
                  data-testid="form-slider"
                  disabled={step !== CURRENT_STEP}
                  min={0.2}
                  max={1.0}
                  step={0.05}
                  defaultValue={[field.value]}
                  onValueChange={(vals) => {
                    field.onChange(vals[0]);
                  }}
                />
              </FormControl>
              <span className="font-medium w-8">{field.value.toFixed(2)}</span>
              <span className="font-thin">{tempComment(field.value)}</span>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      {children}
    </m.div>
  );
};

export default GPTFormStep3;
