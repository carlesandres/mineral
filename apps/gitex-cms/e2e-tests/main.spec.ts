import { test, expect } from '@playwright/test';

test('Homepage', async ({ page }) => {
  await page.goto('/');
  await page.waitForURL('/', { waitUntil: 'networkidle' });
  await expect(page).toHaveTitle('Git Examples');
  const header = page.getByRole('banner');
  const links = header.getByRole('link');
  const navTexts = await links.allTextContents();
  expect(navTexts).toEqual(['Learn', 'Stats', 'Search', 'Login']);
});
