import { test, expect } from "@playwright/test";
import type { GPTResponse, GPTChoice } from "../src/lib/types";

test.describe("App form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/react-chatgpt");
    await page.getByTestId("lang-switch").click();
    await page.getByRole("menuitem", { name: "English" }).click();
    await page.getByTestId("form-secret-input").fill("sk-12345678910");
    await page.getByTestId("form-next-1").click();
    await page.getByTestId("form-next-2").click();
    await page.getByTestId("form-next-3").click();
    await page.getByTestId("form-prompt-textarea").fill("say this is a test");
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
    await page.getByTestId("form-submit").click();
    await expect(page.getByText("say this is a test")).toBeVisible();
    await expect(page.getByText("Typing...")).toBeVisible();
    // await expect(
    //   page.getByText("Your last query resulted in an error. Please, retry.")
    // ).toBeVisible();
    await expect(page.getByTestId("toast")).toBeVisible();
    await expect(page.getByText("Typing...")).not.toBeVisible();
  });

  test("handles different temperature values", async ({ page }) => {
    const slider = page.getByTestId("form-temperature-slider");
    await slider.click();
    const temperatureValue = page.getByTestId("form-temperature-value");
    const temperatureText = page.getByTestId("form-temperature-text");
    expect(await temperatureText.innerHTML()).toEqual("Creative");

    while ((await temperatureValue.innerText()) !== "1.00") {
      slider.press("ArrowRight");
    }
    expect(await temperatureText.innerHTML()).toEqual("Random");

    while ((await temperatureValue.innerText()) !== "0.50") {
      slider.press("ArrowLeft");
    }
    expect(await temperatureText.innerHTML()).toEqual("Certain");

    while ((await temperatureValue.innerText()) !== "0.20") {
      slider.press("ArrowLeft");
    }
    expect(await temperatureText.innerHTML()).toEqual("Bland");
  });

  test("sends different temperature values", async ({ page }) => {
    await page.route(
      "https://api.openai.com/v1/chat/completions",
      async (route) => {
        const { model, messages, temperature } = await JSON.parse(
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
            content: "Temperature " + temperature,
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
    expect(
      await page.getByTestId("form-temperature-value").innerHTML()
    ).toEqual("0.70");
    await page.getByTestId("form-submit").click();
    await expect(page.getByText("Temperature 0.7")).toBeVisible();
  });

  // TODO: context
});
