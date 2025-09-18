import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { Result } from "axe-core";

const routes = [
  { name: "home", path: "/" },
  { name: "posts index", path: "/posts" },
  { name: "single post", path: "/posts/working-in-public" },
  { name: "tags", path: "/tags" },
  { name: "contact", path: "/contact" },
];

test.describe("Accessibility", () => {
  const formatViolations = (violations: Result[]) =>
    violations
      .map((violation) => `${violation.id}: ${violation.impact ?? "unknown"}`)
      .join("\n");

  for (const route of routes) {
    test(`${route.name} should have no WCAG A/AA violations`, async ({
      page,
    }) => {
      await page.goto(route.path);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .exclude("iframe")
        .analyze();

      expect(results.violations, formatViolations(results.violations)).toEqual(
        [],
      );
    });
  }

  test("404 page should announce missing content", async ({ page }) => {
    await page.goto("/missing-page", { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    expect(results.violations, formatViolations(results.violations)).toEqual(
      [],
    );
  });
});
