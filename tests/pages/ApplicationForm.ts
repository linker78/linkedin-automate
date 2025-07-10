import { Page, Locator, expect } from '@playwright/test';

export class ApplicationForm {
  readonly page: Page;
  readonly requiredFields: { label: string; selector: string }[] = [
    { label: 'Name', selector: 'input[name*="name" i]' },
    { label: 'Email', selector: 'input[type="email"]' },
    { label: 'Resume', selector: 'input[type="file"]' },
  ];

  constructor(page: Page) {
    this.page = page;
  }

  async validateRequiredFields(log: (msg: string) => void, logError: (msg: string) => void) {
    for (const field of this.requiredFields) {
      const el = this.page.locator(field.selector);
      if (!(await el.isVisible({ timeout: 5000 }).catch(() => false))) {
        logError(`${field.label} field not found or not visible.`);
      } else {
        log(`${field.label} field is present.`);
      }
    }
  }

  async validateSubmitButton(log: (msg: string) => void, logError: (msg: string) => void) {
    const submitBtn = this.page.locator('button:has-text("Submit")');
    if (await submitBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      expect(await submitBtn.isDisabled()).toBeTruthy();
      log('Submit button is disabled as expected when form is incomplete.');
    } else {
      logError('Submit button not found.');
    }
  }

  async validateFileUpload(log: (msg: string) => void, logError: (msg: string) => void) {
    const fileInput = this.page.locator('input[type="file"]');
    if (await fileInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      expect(await fileInput.getAttribute('accept')).toMatch(/pdf|doc|docx/i);
      log('Resume upload field accepts expected file types.');
    } else {
      logError('Resume upload field not found.');
    }
  }
}
