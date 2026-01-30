import { test, expect } from '@playwright/test';

test('dynamic signup and weight tracking', async ({ page }) => {
  // Start backend
  // (Assuming backend is already running or we use a mock)

  await page.goto('http://localhost:5173/signup');

  await page.fill('input[placeholder="Full Name"]', 'Dynamic User');
  await page.fill('input[placeholder="Email"]', 'dynamic@example.com');
  await page.fill('input[placeholder="Password"]', 'password123');
  await page.fill('input[placeholder="Start Weight (kg)"]', '100');
  await page.fill('input[placeholder="Goal Weight (kg)"]', '90');

  await page.click('button:has-text("Begin Challenge")');

  await expect(page).toHaveURL(/.*dashboard/);

  // Check weight tracker
  // 100 -> 90. total to lose = 10.
  // if current weight is 100, progress should be 0%.
  await expect(page.locator('.circle-val')).toHaveText('0%');

  // Log a new weight
  await page.fill('input[placeholder="Weight (kg)"]', '95');
  await page.click('button:has-text("Log Entry")');

  // 100 -> 95. Loss = 5. (5/10) * 100 = 50%.
  await expect(page.locator('.circle-val')).toHaveText('50%');
});
