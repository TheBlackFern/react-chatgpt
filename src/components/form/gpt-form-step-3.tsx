import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { m } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { GPTFormStepProps } from "@/@types";

const CURRENT_STEP = 3;

const GPTFormStep3 = ({ step, form, children }: GPTFormStepProps) => {
  const { t } = useTranslation(["form"]);
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
      <h1 className="font-medium text-medium text-xl mb-3">
        {t("step3.heading")}
      </h1>
      <FormField
        control={form.control}
        name="context"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-md">{t("step3.title")}</FormLabel>
            <FormDescription>{t("step3.description")}</FormDescription>
            <FormControl>
              <Textarea
                {...field}
                data-testid="form-context-textarea"
                placeholder={t("step3.placeholder")}
                disabled={step !== CURRENT_STEP}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {children}
    </m.div>
  );
};

export default GPTFormStep3;
