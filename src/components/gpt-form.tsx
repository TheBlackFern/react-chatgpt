import * as React from "react";
import { infer as zodInfer } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "framer-motion";

import { TMessage, TModel, gptSchema } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";

const tempComment = (val: number) => {
  if (val < 0.4) return "Bland";
  if (val < 0.6) return "Certain";
  if (val < 0.8) return "Creative";
  if (val <= 1.0) return "Random";
};

type GPTFormProps = {
  setQuery: React.Dispatch<
    React.SetStateAction<{
      secret: string;
      model: TModel;
      prompt: string;
      temperature: number;
    }>
  >;
  setMessages: React.Dispatch<React.SetStateAction<TMessage[]>>;
};

function GPTForm({ setQuery, setMessages }: GPTFormProps) {
  const [step, setStep] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);

  const form = useForm<zodInfer<typeof gptSchema>>({
    resolver: zodResolver(gptSchema),
    defaultValues: {
      secret: "",
      model: "gpt-4",
      temperature: 0.7,
      prompt: "",
    },
  });

  function onFirstNext() {
    form.trigger("secret");
    const secretState = form.getFieldState("secret");
    if (!secretState.isDirty || secretState.invalid) return;
    setStep((prev) => prev + 1);
  }
  function onSubmit(values: zodInfer<typeof gptSchema>) {
    setQuery({
      model: values.model,
      secret: values.secret,
      prompt: values.prompt,
      temperature: values.temperature,
    });
    setMessages((prev) => [
      ...prev,
      {
        content: values.prompt,
        role: "user",
      },
    ]);
    setSubmitted(true);
    console.log(values);
    form.resetField("prompt");
    // form.resetField("temperature");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative w-[400px] min-h-[400px] overflow-x-hidden"
      >
        <motion.div
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
            Step 1: Provide a Secret
          </h1>
          <FormField
            control={form.control}
            name="secret"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Secret</FormLabel>
                <FormDescription>
                  To get it, visit the API Keys page of the openAI's website
                </FormDescription>
                <FormControl>
                  <Input placeholder="sk-..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            className="flex gap-3 mt-3"
            onClick={onFirstNext}
          >
            Next
          </Button>
        </motion.div>
        <motion.div
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
          <h1 className="font-medium text-xl mb-3">Step 2: Select a Model</h1>
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">ChatGPT Version</FormLabel>
                <FormDescription>
                  This is the model that will be used to run the query.
                </FormDescription>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
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
            <Button type="button" onClick={() => setStep((prev) => prev + 1)}>
              Next
            </Button>
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => setStep((prev) => prev - 1)}
            >
              Back
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="flex absolute p-1 left-0 right-0 top-0 flex-col"
          animate={{
            translateX: `${-(step - 3) * 400}px`,
          }}
          style={{
            translateX: `${-(step - 3) * 400}px`,
          }}
          transition={{
            ease: "easeInOut",
          }}
        >
          <AnimatePresence>
            {!submitted && (
              <motion.div
                initial={{ opacity: 1, height: "auto", marginBottom: "12px" }}
                exit={{ opacity: 0, height: 0, marginBottom: "0px" }}
                transition={{ duration: 1, delay: 1 }}
              >
                <h1 className="font-medium text-xl">Step 3: Chat Away!</h1>
              </motion.div>
            )}
          </AnimatePresence>
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="text-md block mb-1.5">Prompt</FormLabel>
                <AnimatePresence>
                  {!submitted && (
                    <motion.div
                      initial={{
                        opacity: 1,
                        height: "auto",
                        marginBottom: "6px",
                      }}
                      exit={{ opacity: 0, height: 0, marginBottom: "0px" }}
                      transition={{ duration: 1, delay: 1 }}
                    >
                      <FormDescription>
                        The actual prompt for the AI.
                      </FormDescription>
                    </motion.div>
                  )}
                </AnimatePresence>
                <FormControl>
                  <Textarea
                    rows={2}
                    placeholder="Write something..."
                    {...field}
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
                  Temperature
                </FormLabel>
                <AnimatePresence>
                  {!submitted && (
                    <motion.div
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
                      <FormDescription>
                        The degree of randomness in AI's answer, the larger the
                        more random.
                      </FormDescription>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex flex-row gap-3 w-64">
                  <FormControl>
                    <Slider
                      min={0.2}
                      max={1.0}
                      step={0.05}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => {
                        field.onChange(vals[0]);
                      }}
                    />
                  </FormControl>
                  <span className="font-medium">{field.value}</span>
                  <span className="font-thin">{tempComment(field.value)}</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3 mt-3">
            <Button type="submit">Submit</Button>
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => setStep((prev) => prev - 1)}
            >
              Back
            </Button>
          </div>
        </motion.div>
      </form>
    </Form>
  );
}

export default GPTForm;
