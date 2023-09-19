import { beforeAll, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import GPTForm from "../gpt-form";
import { TMessage, TModel } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";

describe("Form", () => {
  beforeAll(() => {
    // let messages: TMessagep[] = [];
    const setMessages = (newMsgs: TMessage[]) => {
      messages = newMsgs;
    };
    let query = {
      secret: "",
      model: "gpt-4" as TModel,
      prompt: "",
      temperature: 0.7,
    };
    const setQuery = (newQuery: typeof query) => {
      query = newQuery;
    };
    const { getByTestId } = render(
      <GPTForm
        setMessages={setMessages as Dispatch<SetStateAction<TMessage[]>>}
        setQuery={
          setQuery as Dispatch<
            SetStateAction<{
              secret: string;
              model: "gpt-4" | "gpt-3.5-turbo";
              prompt: string;
              temperature: number;
            }>
          >
        }
      />
    );
  });

  test("should show the first step", () => {
    expect(screen.getByText(/Step 1: Provide a Secret/i).toBeInTheDocument());
  });

  test("should not the second and third step", () => {
    expect(
      screen.getByText(/Step 1: Provide a Secret/i)
    ).not.toBeInTheDocument();
  });
});
