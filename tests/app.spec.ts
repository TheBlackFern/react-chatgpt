import { test, expect } from "@playwright/test";

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

  test("shows step 1 and doesn't show steps 1 and 2", async ({ page }) => {
    expect(page.getByRole("heading", { name: "Step 1: Provide a Secret" }))
      .toBeVisible;
    expect(page.getByRole("heading", { name: "Step 2: Select a Model" })).not
      .toBeVisible;
    expect(page.getByRole("heading", { name: "Step 3: Chat Away!" })).not
      .toBeVisible;

    // we shouldn't be able to Tab into those
    expect(page.getByTestId("next-step-2")).toBeDisabled;
    expect(page.getByTestId("back-step-2")).toBeDisabled;
    expect(page.getByTestId("back-step-3")).toBeDisabled;
    expect(page.getByTestId("submit")).toBeDisabled;
    expect(page.getByLabel("ChatGPT Model")).toBeDisabled;
    expect(page.getByTestId("form-textarea")).toBeDisabled;
    expect(page.getByTestId("form-slider")).toBeDisabled;
  });

  test("correctly checks step 1 input", async ({ page }) => {
    await page.getByTestId("form-input").fill("s");
    await page.getByTestId("next-step-1").click();
    await expect(
      page.getByText("String must contain at least 10 character(s)")
    ).toBeVisible();
  });

  test("correctly checks step 3 input", async ({ page }) => {
    await page.getByTestId("form-input").fill("sk-12345678910");
    await page.getByTestId("next-step-1").click();
    await page.getByTestId("next-step-2").click();
    await page.getByTestId("form-test").fill("");
    await page.getByTestId("next-submit").click();
    await expect(
      page.getByText("String must contain at least 10 character(s)")
    ).toBeVisible();
  });

  // test("", async ({ page }) => {});
  // test("", async ({ page }) => {});

  // test("has correct i18n", async ({ page }) => {
  //   await page.getByPlaceholder("sk-...").click();
  //   await page.getByPlaceholder("sk-...").fill("s");
  //   await page
  //     .locator("form div")
  //     .filter({
  //       hasText:
  //         "Step 1: Provide a SecretPromptTo get it, visit the API Keys page of the OpenAI's",
  //     })
  //     .getByRole("button")
  //     .click();
  //   await page.getByRole("button", { name: "Back" }).first().click();
  //   await page
  //     .getByText("String must contain at least 10 character(s)")
  //     .click();
  //   await page
  //     .locator("form div")
  //     .filter({
  //       hasText:
  //         "Step 1: Provide a SecretPromptTo get it, visit the API Keys page of the OpenAI's",
  //     })
  //     .getByRole("button")
  //     .click();
  //   await page
  //     .locator("form div")
  //     .filter({
  //       hasText:
  //         "Step 1: Provide a SecretPromptTo get it, visit the API Keys page of the OpenAI's",
  //     })
  //     .getByRole("button")
  //     .click();
  //   await page.getByPlaceholder("sk-...").click();
  //   await page.getByPlaceholder("sk-...").fill("sk-11000000");
  //   await page
  //     .locator("form div")
  //     .filter({
  //       hasText:
  //         "Step 1: Provide a SecretPromptTo get it, visit the API Keys page of the OpenAI's",
  //     })
  //     .getByRole("button")
  //     .click();
  //   await page
  //     .locator("form div")
  //     .filter({
  //       hasText:
  //         "Step 1: Provide a SecretPromptTo get it, visit the API Keys page of the OpenAI's",
  //     })
  //     .getByRole("button")
  //     .click();
  //   await page.getByLabel("GPT-4").click();
  //   await page.getByLabel("GPT-4").click();
  //   await page.getByRole("button", { name: "Back" }).first().click();
  //   await page
  //     .locator("form div")
  //     .filter({
  //       hasText:
  //         "Step 1: Provide a SecretPromptTo get it, visit the API Keys page of the OpenAI's",
  //     })
  //     .getByRole("button")
  //     .click();
  //   await page.getByRole("button", { name: "Next" }).nth(1).click();
  //   await page.getByRole("heading", { name: "Step 3: Chat Away!" }).click();
  //   await page.getByPlaceholder("Write something...").click();
  //   await page
  //     .getByPlaceholder("Write something...")
  //     .fill("say this is a test");
  //   await page.getByRole("slider").click();
  //   await page.getByRole("slider").click();
  //   await page.getByRole("slider").click();
  //   await page.getByRole("slider").click();
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").click();
  //   await page.getByRole("slider").click();
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByText("0.55").click();
  //   await page.getByText("Certain").click();
  //   await page.getByRole("slider").click();
  //   await page.getByRole("slider").press("ArrowRight");
  //   await page.getByRole("slider").press("ArrowRight");
  //   await page.getByRole("slider").press("ArrowRight");
  //   await page.getByRole("slider").press("ArrowRight");
  //   await page.getByRole("slider").press("ArrowRight");
  //   await page.getByRole("slider").press("ArrowRight");
  //   await page.getByRole("slider").press("ArrowRight");
  //   await page.getByText("0.90").click();
  //   await page.getByText("Random", { exact: true }).click();
  //   await page.getByRole("slider").click();
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByRole("slider").press("ArrowLeft");
  //   await page.getByText("0.20").click();
  //   await page.getByText("Bland").click();
  //   await page.getByRole("button", { name: "Submit" }).click();
  // });
});