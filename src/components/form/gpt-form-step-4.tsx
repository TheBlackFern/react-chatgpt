import * as Form from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";
import { AnimatePresence, m } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { GPTFormStepProps } from "@/@types";

const CURRENT_STEP = 4;

const GPTFormStep4 = ({
  step,
  form,
  submitted,
  children,
}: GPTFormStepProps & { submitted: boolean }) => {
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
            <h1 className="font-medium text-xl">{t("step4.heading")}</h1>
          </m.div>
        )}
      </AnimatePresence>
      <Form.FormField
        control={form.control}
        name="prompt"
        render={({ field }) => (
          <Form.FormItem className="space-y-0">
            <Form.FormLabel className="text-md block mb-1.5">
              {t("step4.title1")}
            </Form.FormLabel>
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
                  <Form.FormDescription>
                    {t("step4.description1")}
                  </Form.FormDescription>
                </m.div>
              )}
            </AnimatePresence>
            <Form.FormControl>
              <Textarea
                data-testid="form-prompt-textarea"
                rows={2}
                placeholder={t("step4.placeholder")}
                {...field}
                disabled={step !== CURRENT_STEP}
              />
            </Form.FormControl>
            <Form.FormMessage />
          </Form.FormItem>
        )}
      />
      <Form.FormField
        control={form.control}
        name="temperature"
        render={({ field }) => (
          <Form.FormItem className="mt-3 space-y-0">
            <Form.FormLabel className="text-md block mb-1.5">
              {t("step4.title2")}
            </Form.FormLabel>
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
                  <Form.FormDescription>
                    {t("step4.description2")}
                  </Form.FormDescription>
                </m.div>
              )}
            </AnimatePresence>
            <div className="flex flex-row gap-3 w-auto">
              <Form.FormControl className="w-48">
                <Slider
                  data-testid="form-temperature-slider"
                  disabled={step !== CURRENT_STEP}
                  min={0.2}
                  max={1.0}
                  step={0.05}
                  defaultValue={[field.value]}
                  onValueChange={(vals) => {
                    field.onChange(vals[0]);
                  }}
                />
              </Form.FormControl>
              <span
                data-testid="form-temperature-value"
                className="font-medium w-8"
              >
                {field.value.toFixed(2)}
              </span>
              <span data-testid="form-temperature-text" className="font-thin">
                {tempComment(field.value)}
              </span>
            </div>
            <Form.FormMessage />
          </Form.FormItem>
        )}
      />
      {children}
    </m.div>
  );
};

export default GPTFormStep4;
