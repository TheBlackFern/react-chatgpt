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
    expect(page.getByRole("heading", { name: "Step 1: Provide a Secret" }))
      .toBeVisible;
  });
});
