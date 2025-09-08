import { test, expect } from '@playwright/test';

test.describe('E2E smoke', () => {
  test('home page renders without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(String(err)));

    const res = await page.goto('/');
    expect(res?.ok()).toBeTruthy();

    await expect(page).toHaveTitle(/Gav Daly|Home/i);
    await expect(page.getByRole('navigation')).toBeVisible();

    expect(consoleErrors).toEqual([]);
  });

  test('posts index -> first post detail', async ({ page }) => {
    const res = await page.goto('/posts');
    expect(res?.ok()).toBeTruthy();

    await expect(page.getByRole('heading', { level: 2, name: /posts/i })).toBeVisible();

    const firstPostLink = page.locator('article a').first();
    await firstPostLink.click();

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page).toHaveURL(/\/posts\//);
  });

  test('tags index page', async ({ page }) => {
    const res = await page.goto('/tags');
    expect(res?.ok()).toBeTruthy();
    await expect(page.getByRole('heading', { name: /tags/i })).toBeVisible();
  });

  test('contact page', async ({ page }) => {
    const res = await page.goto('/contact');
    expect(res?.ok()).toBeTruthy();
    await expect(page.getByLabel('Name')).toBeVisible();
  });

  test('404 page', async ({ page }) => {
    const res = await page.goto('/definitely-not-a-real-route');
    expect(res?.status()).toBe(404);
    await expect(page.getByText('Page not found')).toBeVisible();
  });
});

