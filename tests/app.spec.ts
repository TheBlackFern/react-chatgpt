import { test, expect } from "@playwright/test";
import type { GPTResponse, GPTChoice } from "../src/lib/types";

test.describe("i18n", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/react-chatgpt");
    await page.getByTestId("lang-switch").click();
  });

  test("works for Russian", async ({ page }) => {
    await page.getByRole("menuitem", { name: "Русский" }).click();
    expect(page.getByRole("heading", { name: "Шаг 1: Введите Ключ" }))
      .toBeVisible;
  });

  test("works for English", async ({ page }) => {
    await page.getByRole("menuitem", { name: "English" }).click();
    await expect(
      page.getByRole("heading", { name: "Step 1: Provide a Secret" })
    ).toBeVisible;
  });
});

test.describe("App", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/react-chatgpt");
    await page.getByTestId("lang-switch").click();
    await page.getByRole("menuitem", { name: "English" }).click();
  });

  test("shows step 1 and doesn't other steps, with interactivity disabled for them", async ({
    page,
  }) => {
    expect(page.getByRole("heading", { name: "Step 1: Provide a Secret" }))
      .toBeVisible;
    expect(page.getByRole("heading", { name: "Step 2: Select a Model" })).not
      .toBeVisible;
    expect(
      page.getByRole("heading", { name: "Step 3 (optional): Set Context" })
    ).not.toBeVisible;
    expect(page.getByRole("heading", { name: "Step 4: Chat Away!" })).not
      .toBeVisible;

    // we shouldn't be able to Tab into those
    expect(page.getByTestId("form-next-2")).toBeDisabled;
    expect(page.getByTestId("form-next-3")).toBeDisabled;
    expect(page.getByTestId("form-back-2")).toBeDisabled;
    expect(page.getByTestId("form-back-3")).toBeDisabled;
    expect(page.getByTestId("form-back-4")).toBeDisabled;
    expect(page.getByTestId("form-submit")).toBeDisabled;
    expect(page.getByTestId("form-model-select")).toBeDisabled;
    expect(page.getByTestId("form-context-textarea")).toBeDisabled;
    expect(page.getByTestId("form-prompt-textarea")).toBeDisabled;
    expect(page.getByTestId("form-temperature-slider")).toBeDisabled;
  });

  test("shows step 1 and doesn't show steps 1 and 2", async ({ page }) => {
    await page.getByTestId("form-next-1").click();
    expect(page.getByRole("heading", { name: "Step 1: Provide a Secret" })).not
      .toBeVisible;
    expect(page.getByRole("heading", { name: "Step 2: Select a Model" }))
      .toBeVisible;
    expect(
      page.getByRole("heading", { name: "Step 3 (optional): Set Context" })
    ).not.toBeVisible;
    expect(page.getByRole("heading", { name: "Step 4: Chat Away!" })).not
      .toBeVisible;

    // we shouldn't be able to Tab into those
    expect(page.getByTestId("form-next-1")).toBeDisabled;
    expect(page.getByTestId("form-next-2")).not.toBeDisabled;
    expect(page.getByTestId("form-next-3")).toBeDisabled;
    expect(page.getByTestId("form-back-2")).toBeDisabled;
    expect(page.getByTestId("form-back-3")).toBeDisabled;
    expect(page.getByTestId("form-back-4")).toBeDisabled;
    expect(page.getByTestId("form-submit")).toBeDisabled;
    expect(page.getByTestId("form-model-select")).toBeDisabled;
    expect(page.getByTestId("form-context-textarea")).toBeDisabled;
    expect(page.getByTestId("form-prompt-textarea")).toBeDisabled;
    expect(page.getByTestId("form-temperature-slider")).toBeDisabled;
  });

  test("correctly checks step 1 input", async ({ page }) => {
    await page.getByTestId("form-secret-input").fill("s");
    await page.getByTestId("form-next-1").click();
    await expect(
      page.getByText("Key must be at least 10 characters long")
    ).toBeVisible();
  });

  test("correctly checks step 3 input", async ({ page }) => {
    await page.getByTestId("form-secret-input").fill("dddddddddddddddddd");
    await page.getByTestId("form-next-1").click();
    await page.getByTestId("form-next-2").click();
    await page.getByTestId("form-context-textarea").fill("s");
    await expect(
      page.getByText("Context must be at least 10 characters long")
    ).toBeVisible();
  });

  test("correctly checks step 4 input", async ({ page }) => {
    await page.getByTestId("form-secret-input").fill("sk-12345678910");
    await page.getByTestId("form-next-1").click();
    await page.getByTestId("form-next-2").click();
    await page.getByTestId("form-next-3").click();
    await page.getByTestId("form-prompt-textarea").fill("");
    await page.getByTestId("form-submit").click();
    await expect(
      page.getByText("Prompt must be at least 10 characters long")
    ).toBeVisible();
  });

  test("correctly renders a good call", async ({ page }) => {
    await page.route(
      "https://api.openai.com/v1/chat/completions",
      async (route) => {
        const { model, messages } = await JSON.parse(
          route.request().postData()!
        );
        const choices: GPTChoice[] = messages.map((message, index) => ({
          message,
          finish_reason: "bruh",
          index,
        }));
        choices.unshift({
          message: {
            role: "assistant",
            content: "This a test from Playwright",
          },
          finish_reason: "bruh",
          index: choices.length,
        });
        const json: GPTResponse = {
          id: "qqqq",
          object: "fff",
          created: 123,
          model,
          usage: {
            prompt_tokens: 1,
            completion_tokens: 1,
            total_tokens: 1,
          },
          choices,
        };
        await new Promise((r) => setTimeout(r, 1000));
        await route.fulfill({ json });
      }
    );
    await page.getByTestId("form-secret-input").fill("sk-12345678910");
    await page.getByTestId("form-next-1").click();
    await page.getByTestId("form-next-2").click();
    await page.getByTestId("form-next-3").click();
    await page.getByTestId("form-prompt-textarea").fill("say this is a test");
    await page.getByTestId("form-submit").click();
    await expect(page.getByText("say this is a test")).toBeVisible();
    await expect(page.getByText("Typing...")).toBeVisible();
    await expect(page.getByText("This a test from Playwright")).toBeVisible();
  });

  test("correctly renders a bad call", async ({ page }) => {
    await page.route(
      "https://api.openai.com/v1/chat/completions",
      async (route) => {
        await new Promise((r) => setTimeout(r, 1000));
        await route.abort("accessdenied");
      }
    );
    await page.getByTestId("form-secret-input").fill("dddddddddddddddddd");
    await page.getByTestId("form-next-1").click();
    await page.getByTestId("form-next-2").click();
    await page.getByTestId("form-next-3").click();
    await page.getByTestId("form-prompt-textarea").fill("say this is a test");
    await page.getByTestId("form-submit").click();
    await expect(page.getByText("say this is a test")).toBeVisible();
    await expect(page.getByText("Typing...")).toBeVisible();
    // await expect(
    //   page.getByText("Your last query resulted in an error. Please, retry.")
    // ).toBeVisible();
    await expect(page.getByTestId("toast")).toBeVisible();
    await expect(page.getByText("Typing...")).not.toBeVisible();
  });
});
