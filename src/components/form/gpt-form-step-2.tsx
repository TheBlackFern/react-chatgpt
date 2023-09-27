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
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

type GPTFormStep2Props = {
  step: number;
  form: UseFormReturn<{
    secret: string;
    model: "gpt-3.5-turbo" | "gpt-4";
    temperature: number;
    prompt: string;
  }>;
  onSecondNext: () => void;
  onBack: () => void;
};

const GPTFormStep2 = ({
  step,
  form,
  onSecondNext,
  onBack,
}: GPTFormStep2Props) => {
  const { t } = useTranslation(["form"]);
  return (
    <m.div
      className={cn("absolute p-1 top-0 left-0 right-0", {
        "pointer-events-none": step !== 2,
      })}
      animate={{
        translateX: `${-(step - 2) * 400}px`,
      }}
      style={{
        translateX: `${-(step - 2) * 400}px`,
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
              disabled={step !== 2}
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
      <div className="flex gap-3 mt-3">
        <Button
          data-testid="next-step-2"
          type="button"
          onClick={onSecondNext}
          disabled={step !== 2}
        >
          {t("next")}
        </Button>
        <Button
          data-testid="back-step-2"
          type="button"
          variant={"ghost"}
          onClick={onBack}
          disabled={step !== 2}
        >
          {t("back")}
        </Button>
      </div>
    </m.div>
  );
};

export default GPTFormStep2;
