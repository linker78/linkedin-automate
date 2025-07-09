import { test, expect } from '@playwright/test';

// Utility for logging
function log(message: string) {
  console.log(`[LOG] ${message}`);
}

// Utility for error logging
function logError(error: any) {
  console.error(`[ERROR] ${error instanceof Error ? error.stack : error}`);
}

test.describe('LinkedIn Easy Apply Job Application Form', () => {
  test('should find Easy Apply jobs and validate application form fields', async ({ page }) => {
    try {
      log('Navigating to LinkedIn Jobs page...');
      await page.goto('https://www.linkedin.com/jobs', { timeout: 60000 });
      await expect(page).toHaveURL(/linkedin.com\/jobs/);

      // Accept cookies if prompted
      const acceptCookies = page.locator('button:has-text("Accept")');
      if (await acceptCookies.isVisible({ timeout: 5000 }).catch(() => false)) {
        log('Accepting cookies...');
        await acceptCookies.click();
      }

      // Search for a job (e.g., "QA Engineer")
      log('Filling job search input...');
      await page.fill('input[aria-label="Search jobs"]', 'QA Engineer');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(3000);

      // Filter for "Easy Apply" jobs
      log('Filtering for Easy Apply jobs...');
      const easyApplyFilter = page.locator('button:has-text("Easy Apply")');
      if (await easyApplyFilter.isVisible({ timeout: 10000 }).catch(() => false)) {
        await easyApplyFilter.click();
        await page.waitForTimeout(2000);
      } else {
        throw new Error('Easy Apply filter not found.');
      }

      // Click the first Easy Apply job
      log('Selecting the first Easy Apply job...');
      const jobCards = page.locator('li.jobs-search-results__list-item');
      await expect(jobCards.first()).toBeVisible({ timeout: 10000 });
      await jobCards.first().click();
      await page.waitForTimeout(2000);

      // Click the Easy Apply button
      log('Clicking Easy Apply button...');
      const easyApplyBtn = page.locator('button:has-text("Easy Apply")');
      await expect(easyApplyBtn).toBeVisible({ timeout: 10000 });
      await easyApplyBtn.click();
      await page.waitForTimeout(2000);

      // Validate required fields in the application form
      log('Validating required fields in the application form...');
      const requiredFields = [
        { label: 'Name', selector: 'input[name*="name" i]' },
        { label: 'Email', selector: 'input[type="email"]' },
        { label: 'Resume', selector: 'input[type="file"]' },
      ];
      for (const field of requiredFields) {
        const el = page.locator(field.selector);
        if (!(await el.isVisible({ timeout: 5000 }).catch(() => false))) {
          logError(`${field.label} field not found or not visible.`);
        } else {
          log(`${field.label} field is present.`);
        }
      }

      // Validate required field enforcement (try submitting empty form)
      log('Checking required field enforcement...');
      const submitBtn = page.locator('button:has-text("Submit")');
      if (await submitBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        expect(await submitBtn.isDisabled()).toBeTruthy();
        log('Submit button is disabled as expected when form is incomplete.');
      } else {
        logError('Submit button not found.');
      }

      // Validate file upload field behavior
      log('Validating file upload field behavior...');
      const fileInput = page.locator('input[type="file"]');
      if (await fileInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        expect(await fileInput.getAttribute('accept')).toMatch(/pdf|doc|docx/i);
        log('Resume upload field accepts expected file types.');
      } else {
        logError('Resume upload field not found.');
      }

      log('Test completed successfully.');
    } catch (error) {
      logError(error);
      throw error;
    }
  });
});
