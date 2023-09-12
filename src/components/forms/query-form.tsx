import * as z from "zod";
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

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

const gptTypes = [
  { label: "GPT-3.5 Turbo", value: "gpt-3.5-turbo" },
  { label: "GPT-4", value: "gpt-4" },
] as const;

const querySchema = z.object({
  gptType: z.string().default("gpt-4"),
  query: z.string().min(10),
});

type GPTQueryFormProps = {
  setGptType: React.Dispatch<React.SetStateAction<string>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

function GPTQueryForm({ setGptType, setQuery }: GPTQueryFormProps) {
  const form = useForm<z.infer<typeof querySchema>>({
    resolver: zodResolver(querySchema),
    defaultValues: {
      gptType: "gpt-4",
      query: "",
    },
  });

  function onSubmit(values: z.infer<typeof querySchema>) {
    setGptType(values.gptType);
    setQuery(values.query);
    console.log(values);
    form.reset();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[400px] mt-20 space-y-3"
      >
        <h1 className="font-medium text-xl">Step 2: Query</h1>
        <FormField
          control={form.control}
          name="gptType"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>ChatGPT Version</FormLabel>
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
                        ? gptTypes.find((type) => type.value === field.value)
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
                      {gptTypes.map((type) => (
                        <CommandItem
                          value={type.label}
                          key={type.value}
                          onSelect={() => {
                            form.setValue("gptType", type.value);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              type.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {type.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the model that will be used to run the query.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Query</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder="Write something..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default GPTQueryForm;
