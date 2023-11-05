import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
      <h1 className="font-medium text-medium text-xl mb-3">
        {t("step1.heading")}
      </h1>
      <FormField
        control={form.control}
        name="secret"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-md">{t("step1.title")}</FormLabel>
            <FormDescription>{t("step1.description")}</FormDescription>
            <FormControl>
              <Input
                {...field}
                data-testid="form-secret-input"
                placeholder="sk-..."
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

export default GPTFormStep1;
