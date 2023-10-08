import { cn } from "@/lib/utils";
import { m } from "framer-motion";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTranslation } from "react-i18next";

type GPTFormStep2Props = {
  step: number;
  form: UseFormReturn<{
    secret: string;
    model: "gpt-3.5-turbo" | "gpt-4";
    temperature: number;
    prompt: string;
  }>;
  children: React.ReactNode;
};

const CURRENT_STEP = 2;

const GPTFormStep2 = ({ step, form, children }: GPTFormStep2Props) => {
  const { t } = useTranslation(["form"]);
  return (
    <m.div
      className={cn("absolute p-1 top-0 left-0 right-0", {
        "pointer-events-none": step !== CURRENT_STEP,
      })}
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
      <h1 className="font-medium text-xl mb-3">{t("step2.heading")}</h1>
      <FormField
        control={form.control}
        name="model"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-md">{t("step2.title")}</FormLabel>
            <FormDescription>{t("step2.description")}</FormDescription>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={step !== CURRENT_STEP}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t("step2.placeholder")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5-Turbo</SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {children}
    </m.div>
  );
};

export default GPTFormStep2;
