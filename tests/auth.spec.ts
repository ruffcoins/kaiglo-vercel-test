import { test, expect } from "@playwright/test";

test("open home page", async ({ page }) => {
  await page.goto("/");
});

test("open auth modal", async ({ page }) => {
  await page.goto("/");
  await page.click('[data-testid="auth-button"]');
  await page.waitForSelector('[data-testid="auth-dialog"]');
});

// test("sign up successfully", async ({ page }) => {
//   await page.goto("/");
//   await page.click('[data-testid="auth-button"]');
//   await page.waitForSelector('[data-testid="auth-dialog"]');

//   await page.getByPlaceholder('First Name').fill("James");
//   await page.getByPlaceholder("Email").fill("nzubeanthony4@gmail.com");
//   await page.getByPlaceholder("Phone").fill("08103720628");

//   await page.locator('form').getByRole('button', { name: 'Sign up' }).click();

//   const toastLocator = await page.locator('[data-testid="toast"]');
//   toastLocator.waitFor();

//   await expect(toastLocator).toBeVisible();
//   await expect(toastLocator).toHaveText("Otp sent");

// });

test("Failed Sign up attempt", async ({ page }) => {
  await page.goto("/");
  await page.click('[data-testid="auth-button"]');
  await page.waitForSelector('[data-testid="auth-dialog"]');

  await page.getByPlaceholder("First Name").fill("James");
  await page.getByPlaceholder("Email").fill("nzubeanthony4@gmail.com");
  await page.getByPlaceholder("Phone").fill("0810372062");

  await page.locator("form").getByRole("button", { name: "Sign up" }).click();

  await expect(
    page.getByLabel("Notifications (F8)").locator("li"),
  ).toBeVisible();
  expect(page.getByText("Uh, oh! Something went wrong", { exact: true }));
});
