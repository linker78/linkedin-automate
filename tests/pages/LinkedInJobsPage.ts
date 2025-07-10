import { Page, Locator, expect } from '@playwright/test';

export class LinkedInJobsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly easyApplyFilter: Locator;
  readonly jobCards: Locator;
  readonly easyApplyBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[aria-label="Search jobs"]');
    this.easyApplyFilter = page.locator('button:has-text("Easy Apply")');
    this.jobCards = page.locator('li.jobs-search-results__list-item');
    this.easyApplyBtn = page.locator('button:has-text("Easy Apply")');
  }

  async goto() {
    await this.page.goto('https://www.linkedin.com/jobs', { timeout: 60000 });
    await expect(this.page).toHaveURL(/linkedin.com\/jobs/);
  }

  async acceptCookiesIfVisible() {
    const acceptCookies = this.page.locator('button:has-text("Accept")');
    if (await acceptCookies.isVisible({ timeout: 5000 }).catch(() => false)) {
      await acceptCookies.click();
    }
  }

  async searchJob(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);
  }

  async filterEasyApply() {
    if (await this.easyApplyFilter.isVisible({ timeout: 10000 }).catch(() => false)) {
      await this.easyApplyFilter.click();
      await this.page.waitForTimeout(2000);
    } else {
      throw new Error('Easy Apply filter not found.');
    }
  }

  async selectFirstJob() {
    await expect(this.jobCards.first()).toBeVisible({ timeout: 10000 });
    await this.jobCards.first().click();
    await this.page.waitForTimeout(2000);
  }

  async openEasyApply() {
    await expect(this.easyApplyBtn).toBeVisible({ timeout: 10000 });
    await this.easyApplyBtn.click();
    await this.page.waitForTimeout(2000);
  }
}
