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

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { TMessage, TModel, gptSchema, models } from "@/lib/types";

type GPTFormProps = {
  setQuery: React.Dispatch<
    React.SetStateAction<{
      secret: string;
      model: TModel;
      prompt: string;
    }>
  >;
  setMessages: React.Dispatch<React.SetStateAction<TMessage[]>>;
};

function GPTForm({ setQuery, setMessages }: GPTFormProps) {
  const [step, setStep] = React.useState(1);

  const form = useForm<zodInfer<typeof gptSchema>>({
    resolver: zodResolver(gptSchema),
    defaultValues: {
      secret: "",
      model: "gpt-4",
      prompt: "",
    },
  });

  function onSubmit(values: zodInfer<typeof gptSchema>) {
    setQuery({
      model: values.model,
      secret: values.secret,
      prompt: values.prompt,
    });
    setMessages((prev) => [
      ...prev,
      {
        content: values.prompt,
        role: "user",
      },
    ]);
    console.log(values);
    form.resetField("prompt");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[400px]">
        <div
          className={cn({
            hidden: step !== 1,
          })}
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
        </div>
        <div
          className={cn({
            hidden: step !== 2,
          })}
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
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
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
        </div>
        <div
          className={cn({
            hidden: step !== 3,
          })}
        >
          <h1 className="font-medium text-xl mb-3">Step 3: Chat Away!</h1>
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Prompt</FormLabel>
                <FormDescription>The actual prompt for the AI.</FormDescription>
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
        </div>
        <div className="flex gap-3 mt-3">
          <Button
            type="submit"
            className={cn({
              hidden: step !== 3,
            })}
          >
            Submit
          </Button>
          <Button
            type="button"
            onClick={() => setStep((prev) => prev + 1)}
            className={cn({
              hidden: step === 3,
            })}
          >
            Next
          </Button>
          <Button
            type="button"
            variant={"ghost"}
            className={cn({
              hidden: step === 1,
            })}
            onClick={() => setStep((prev) => prev - 1)}
          >
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default GPTForm;
