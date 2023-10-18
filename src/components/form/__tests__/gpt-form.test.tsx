// import { beforeAll, describe, expect, test, vi } from "vitest";
// import { getByTestId, render, screen } from "@testing-library/react";
// import GPTForm from "../gpt-form";
// import { TMessage, TModel } from "@/lib/types";
// import { Dispatch, SetStateAction } from "react";
// import renderWithi18next from "@/lib/renderWithI18Next";

// describe("Form", () => {
//   beforeAll(() => {
//     let messages: TMessagep[] = [];
//     const setMessages = (newMsgs: TMessage[]) => {
//       messages = newMsgs;
//     };
//     let query = {
//       secret: "",
//       model: "gpt-4" as TModel,
//       prompt: "",
//       temperature: 0.7,
//     };
//     const setQuery = (newQuery: typeof query) => {
//       query = newQuery;
//     };

//     const { container } = renderWithi18next(
//       <GPTForm
//         setMessages={setMessages as Dispatch<SetStateAction<TMessage[]>>}
//         setQuery={
//           setQuery as Dispatch<
//             SetStateAction<{
//               secret: string;
//               model: "gpt-4" | "gpt-3.5-turbo";
//               prompt: string;
//               temperature: number;
//             }>
//           >
//         }
//       />
//     );
//   });

//   test("should show the first step", () => {
//     expect(screen.getByText(/Step|Шаг/i).toBeInTheDocument());
//   });

//   test("should not the second and third step", () => {
//     expect(
//       screen.getByText(/Step 1: Provide a Secret/i)
//     ).not.toBeInTheDocument();
//   });
// });