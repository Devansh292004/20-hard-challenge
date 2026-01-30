import { test, expect } from '@playwright/test';

test('verify elite performance features', async ({ page }) => {
  // Go to landing page
  await page.goto('http://localhost:5173/');
  await page.screenshot({ path: 'screenshots/landing.png' });

  // Signup
  await page.click('text=Join the Elite');
  await page.fill('placeholder="Full Name"', 'Elite Athlete');
  await page.fill('placeholder="Email Address"', 'elite@example.com');
  await page.fill('placeholder="Password"', 'password123');
  await page.fill('placeholder="Start Weight"', '85');
  await page.fill('placeholder="Target Weight"', '78');
  await page.click('button:has-text("CREATE ELITE ACCOUNT")');

  // Wait for dashboard
  await expect(page).toHaveURL(/.*dashboard/);
  await page.waitForTimeout(2000); // Wait for animations
  await page.screenshot({ path: 'screenshots/dashboard.png' });

  // Navigate to Analytics
  await page.click('text=Performance Analytics');
  await expect(page).toHaveURL(/.*analytics/);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/analytics.png' });

  // Navigate to Physique
  await page.click('text=Physique Report');
  await expect(page).toHaveURL(/.*physique/);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/physique.png' });

  // Navigate to Community
  await page.click('text=Elite Community');
  await expect(page).toHaveURL(/.*community/);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/community.png' });

  // Test auto-fail logic - can't really test easily in E2E without clock manipulation
});
