import { expect, test, type Page } from "@playwright/test";

async function disableAnimations(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0s !important;
        caret-color: transparent !important;
      }
    `,
  });
}

test.describe("Visual snapshots", () => {
  test.use({
    viewport: { width: 1280, height: 720 },
    colorScheme: "light",
  });

  const routes = [
    { name: "home", path: "/" },
    { name: "posts", path: "/posts" },
  ];

  for (const route of routes) {
    test(`${route.name} matches visual baseline`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "networkidle" });
      await disableAnimations(page);
      await expect(page).toHaveScreenshot(`${route.name}.png`, {
        fullPage: true,
      });
    });
  }
});
