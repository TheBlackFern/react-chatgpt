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
import { Button } from "../ui/button";
import { UseFormReturn } from "react-hook-form";

type GPTFormStep1Props = {
  step: number;
  form: UseFormReturn<{
    secret: string;
    model: "gpt-3.5-turbo" | "gpt-4";
    temperature: number;
    prompt: string;
  }>;
  onFirstNext: () => void;
};

const GPTFormStep1 = ({ step, form, onFirstNext }: GPTFormStep1Props) => {
  const { t } = useTranslation(["form"]);
  return (
    <m.div
      className="p-1"
      animate={{
        translateX: `${-(step - 1) * 400}px`,
      }}
      style={{
        translateX: `${-(step - 1) * 400}px`,
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
              <Input data-testid="form-input" placeholder="sk-..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        data-testid="next-step-1"
        type="button"
        className="flex gap-3 mt-3"
        onClick={onFirstNext}
      >
        {t("next")}
      </Button>
    </m.div>
  );
};

export default GPTFormStep1;
