import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

const querySchema = z.object({
  secret: z.string().min(10),
  query: z.string().min(10),
});

type GPTQueryFormProps = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setSecret: React.Dispatch<React.SetStateAction<string>>;
};

function GPTQueryForm({ setQuery, setSecret }: GPTQueryFormProps) {
  const form = useForm<z.infer<typeof querySchema>>({
    resolver: zodResolver(querySchema),
    defaultValues: {
      secret: "",
      query: "",
    },
  });

  function onSubmit(values: z.infer<typeof querySchema>) {
    setQuery(values.query);
    setSecret(values.secret);
    console.log(values);
    form.reset();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[400px] mt-20 space-y-3"
      >
        <FormField
          control={form.control}
          name="secret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secret</FormLabel>
              <FormControl>
                <Input placeholder="Write something..." {...field} />
              </FormControl>
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
