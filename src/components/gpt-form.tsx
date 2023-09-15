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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { TMessage, TModel, gptSchema, models } from "@/lib/types";

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
  const [open, setOpen] = React.useState(false);
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
                  <Input placeholder="Write something..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            className="flex gap-3 mt-3"
            onClick={() => setStep((prev) => prev + 1)}
          >
            Next
          </Button>
        </motion.div>
        <motion.div
          className="absolute p-1 top-0 left-0 right-0"
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
              <FormItem className="flex flex-col">
                <FormLabel className="text-md">ChatGPT Version</FormLabel>
                <FormDescription>
                  This is the model that will be used to run the query.
                </FormDescription>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? models.find((model) => model.value === field.value)
                              ?.label
                          : "Select version"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search framework..." />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {models.map((model) => (
                          <CommandItem
                            value={model.label}
                            key={model.value}
                            onSelect={() => {
                              form.setValue("model", model.value);

                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                model.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {model.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
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
          className="flex absolute p-1 left-0 right-0 top-0 gap-3 flex-col"
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="font-medium text-xl">Step 3: Chat Away!</h1>
              </motion.div>
            )}
          </AnimatePresence>
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Prompt</FormLabel>
                <AnimatePresence>
                  {!submitted && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
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
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel className="text-md">Temperature</FormLabel>
                <AnimatePresence>
                  {!submitted && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
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
                      defaultValue={[value]}
                      onValueChange={(vals) => {
                        onChange(vals[0]);
                      }}
                    />
                  </FormControl>
                  <span className="font-medium">{value}</span>
                  <span className="font-thin">{tempComment(value)}</span>
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
