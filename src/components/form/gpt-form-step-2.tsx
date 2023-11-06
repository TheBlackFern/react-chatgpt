import * as Form from "@/components/ui/form";
import * as Select from "@/components/ui/select";
import { m } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { GPTFormStepProps } from "@/@types";

const CURRENT_STEP = 2;

const GPTFormStep2 = ({ step, form, children }: GPTFormStepProps) => {
  const { t } = useTranslation(["form"]);
  return (
    <m.div
      className="absolute p-1 top-0 left-0 right-0"
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
      <h1 data-testid="form-step2-heading" className="font-medium text-xl mb-3">
        {t("step2.heading")}
      </h1>
      <Form.FormField
        control={form.control}
        name="model"
        render={({ field }) => (
          <Form.FormItem>
            <Form.FormLabel className="text-md">
              {t("step2.title")}
            </Form.FormLabel>
            <Form.FormDescription>
              {t("step2.description")}
            </Form.FormDescription>
            <Select.Select
              data-testid="form-model-select"
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={step !== CURRENT_STEP}
            >
              <Form.FormControl>
                <Select.SelectTrigger data-testid="form-model-select-button">
                  <Select.SelectValue placeholder={t("step2.placeholder")} />
                </Select.SelectTrigger>
              </Form.FormControl>
              <Select.SelectContent>
                <Select.SelectItem
                  data-testid="form-model-select-button-gpt-3.5"
                  value="gpt-3.5-turbo"
                >
                  GPT-3.5-Turbo
                </Select.SelectItem>
                <Select.SelectItem
                  data-testid="form-model-select-button-gpt-4"
                  value="gpt-4"
                >
                  GPT-4
                </Select.SelectItem>
              </Select.SelectContent>
            </Select.Select>
            <Form.FormMessage />
          </Form.FormItem>
        )}
      />
      {children}
    </m.div>
  );
};

export default GPTFormStep2;
