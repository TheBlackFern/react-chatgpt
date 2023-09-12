import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const secretSchema = z.object({
  secret: z.string().min(10),
});

type GPTSecretFormProps = {
  setSecret: React.Dispatch<React.SetStateAction<string>>;
};

function GPTSecretForm({ setSecret }: GPTSecretFormProps) {
  const form = useForm<z.infer<typeof secretSchema>>({
    resolver: zodResolver(secretSchema),
    defaultValues: {
      secret: "",
    },
  });

  function onSubmit(values: z.infer<typeof secretSchema>) {
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
        <h1 className="font-medium text-medium text-xl">Step 1: Secret</h1>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default GPTSecretForm;
