import { m } from "framer-motion";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";
import { UseFormReturn } from "react-hook-form";
import { TPrompt } from "@/lib/types";

export type GPTFormStepProps = {
  step: number;
  form: UseFormReturn<TPrompt>;
  children: React.ReactNode;
};

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
