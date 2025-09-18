import type { ConsoleMessage, Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

function trackConsoleErrors(page: Page) {
  const messages: ConsoleMessage[] = [];
  const listener = (message: ConsoleMessage) => {
    if (message.type() === "error") {
      messages.push(message);
    }
  };
  page.on("console", listener);
  return {
    getErrors: () => messages.map((message) => message.text()),
    dispose: () => page.off("console", listener),
  };
}

test.describe("E2E smoke", () => {
  const assertCleanConsole = (errors: string[]) => {
    expect(errors, errors.join("\n")).toHaveLength(0);
  };

  test("home page", async ({ page }) => {
    const { dispose, getErrors } = trackConsoleErrors(page);

    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { level: 1, name: /hi, i'm gavin/i }),
    ).toBeVisible();

    dispose();
    assertCleanConsole(getErrors());
  });

  test("posts index", async ({ page }) => {
    const { dispose, getErrors } = trackConsoleErrors(page);

    const response = await page.goto("/posts");
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { level: 2, name: "Posts" }),
    ).toBeVisible();

    dispose();
    assertCleanConsole(getErrors());
  });

  test("single post", async ({ page }) => {
    const { dispose, getErrors } = trackConsoleErrors(page);

    const response = await page.goto("/posts/working-in-public");
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { level: 1, name: "Working in Public" }),
    ).toBeVisible();

    dispose();
    assertCleanConsole(getErrors());
  });

  test("tags index", async ({ page }) => {
    const { dispose, getErrors } = trackConsoleErrors(page);

    const response = await page.goto("/tags");
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { level: 1, name: "Tags" }),
    ).toBeVisible();

    dispose();
    assertCleanConsole(getErrors());
  });

  test("contact page", async ({ page }) => {
    const { dispose, getErrors } = trackConsoleErrors(page);

    const response = await page.goto("/contact");
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { level: 1, name: /contact/i }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /send/i })).toBeVisible();

    dispose();
    assertCleanConsole(getErrors());
  });

  test("404 page", async ({ page }) => {
    const { dispose, getErrors } = trackConsoleErrors(page);

    const response = await page.goto("/this-route-does-not-exist", {
      waitUntil: "networkidle",
    });
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { level: 1, name: "404" }),
    ).toBeVisible();

    dispose();
    assertCleanConsole(getErrors());
  });
});
