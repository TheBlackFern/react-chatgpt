import * as Form from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { m } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { GPTFormStepProps } from "@/@types";

const CURRENT_STEP = 1;

const GPTFormStep1 = ({ step, form, children }: GPTFormStepProps) => {
  const { t } = useTranslation(["form"]);
  return (
    <m.div
      className="p-1"
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
      <h1
        data-testid="form-step1-heading"
        className="font-medium text-medium text-xl mb-3"
      >
        {t("step1.heading")}
      </h1>
      <Form.FormField
        control={form.control}
        name="secret"
        render={({ field }) => (
          <Form.FormItem>
            <Form.FormLabel className="text-md">
              {t("step1.title")}
            </Form.FormLabel>
            <Form.FormDescription>
              {t("step1.description")}
            </Form.FormDescription>
            <Form.FormControl>
              <Input
                {...field}
                data-testid="form-secret-input"
                placeholder="sk-..."
                disabled={step !== CURRENT_STEP}
              />
            </Form.FormControl>
            <Form.FormMessage />
          </Form.FormItem>
        )}
      />
      {children}
    </m.div>
  );
};

export default GPTFormStep1;
