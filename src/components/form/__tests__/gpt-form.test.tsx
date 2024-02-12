// import { describe, expect, test, vi } from "vitest";
// import { act, screen, getByTestId, render } from "@testing-library/react";
// import renderWithi18next from "@/lib/renderWithI18Next";
// import GPTForm from "../gpt-form";
// import type { TPrompt } from "@/@types";

// let messages: string[] = [];

// const mockReset = vi.fn();

// const mockAddMessage = vi.fn().mockImplementation((text: string) => {
//   messages.push(text);
// });
// const mockMakeQuery = vi.fn().mockImplementation((prompt: TPrompt) => {
//   console.log(JSON.stringify(prompt));
// });

// describe("Form", () => {
//   test("should show the first step", async () => {
//     await act(() =>
//       renderWithi18next(
//         <GPTForm
//           makeQuery={mockMakeQuery}
//           addMessage={mockAddMessage}
//           reset={mockReset}
//         />
//       )
//     );
//     expect(await screen.findByTestId("form-step1-heading")).toBeTruthy();
//     screen.debug();
//     // expect(screen.getByText(enForm.step1.heading)).toBeVisible();
//   });

//   test("should not the second and third step", async () => {
//     await act(() =>
//       renderWithi18next(
//         <GPTForm
//           makeQuery={mockMakeQuery}
//           addMessage={mockAddMessage}
//           reset={mockReset}
//         />
//       )
//     );
//     expect(screen.findByTestId("form-step2-heading")).not.toBeTruthy();
//   });
// });
