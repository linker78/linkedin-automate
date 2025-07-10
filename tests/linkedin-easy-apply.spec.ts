const username = process.env.LINKEDIN_USER;
const password = process.env.LINKEDIN_PASS;
const keyword = process.env.JOB_KEYWORD || 'QA Engineer';
import { test } from '@playwright/test';
import { LinkedInJobsPage } from './pages/LinkedInJobsPage';
import { ApplicationForm } from './pages/ApplicationForm';
import dotenv from 'dotenv';

dotenv.config();

function log(message: string) {
  console.log(`[LOG] ${new Date().toISOString()} ${message}`);
}
function logError(error: any) {
  console.error(`[ERROR] ${new Date().toISOString()} ${error instanceof Error ? error.stack : error}`);
}

test.describe('LinkedIn Easy Apply Job Application Form', () => {
  test('should find Easy Apply jobs and validate application form fields', async ({ page }) => {
    try {
      const jobsPage = new LinkedInJobsPage(page);
      const form = new ApplicationForm(page);
      log('Navigating to LinkedIn Jobs page...');
      await jobsPage.goto();
      await jobsPage.acceptCookiesIfVisible();

      // LinkedIn login (if login form is present)
      if (username && password) {
        const usernameInput = page.locator('input[name="session_key"], input[name="username"]');
        const passwordInput = page.locator('input[name="session_password"], input[name="password"]');
        if (await usernameInput.isVisible({ timeout: 5000 }).catch(() => false)) {
          log('Filling LinkedIn login form...');
          await page.fill('input[name="session_key"], input[name="username"]', username!);
          await page.fill('input[name="session_password"], input[name="password"]', password!);
          const signInBtn = page.locator('button[type="submit"]:has-text("Sign in"), button:has-text("Sign in")');
          if (await signInBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
            await signInBtn.click();
            await page.waitForTimeout(3000);
          }
        }
      }

      log('Filling job search input...');
      await jobsPage.searchJob(keyword);
      log('Filtering for Easy Apply jobs...');
      await jobsPage.filterEasyApply();
      log('Selecting the first Easy Apply job...');
      await jobsPage.selectFirstJob();
      log('Clicking Easy Apply button...');
      await jobsPage.openEasyApply();
      log('Validating required fields in the application form...');
      await form.validateRequiredFields(log, logError);
      log('Checking required field enforcement...');
      await form.validateSubmitButton(log, logError);
      log('Validating file upload field behavior...');
      await form.validateFileUpload(log, logError);
      log('Test completed successfully.');
    } catch (error) {
      logError(error);
      throw error;
    }
  });
});
