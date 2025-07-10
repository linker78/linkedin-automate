

# LinkedIn Jobs Automation with Playwright (TypeScript)

This project showcases an advanced automation framework for validating the LinkedIn Jobs “Easy Apply” workflow using Playwright and TypeScript. It is designed for technical interviews, automation engineering demonstrations, and as a reference for robust UI automation practices.

---
*This README and project were generated and refined with the assistance of GitHub Copilot (AI).*
---

## Key Features
- Multi-browser support: Chromium, Firefox, WebKit
- Navigates to https://www.linkedin.com/jobs and performs job search automation
- Filters and selects jobs with the “Easy Apply” option
- Opens and validates the application form for required fields (name, email, resume upload)
- Enforces validation for required fields, file upload behavior, and button state (e.g., disabled until complete)
- Advanced error handling and logging for missing elements, unexpected UI states, and navigation timeouts
- Automatic screenshots and video capture for failed test steps
- HTML reporting for easy review of test results

## Getting Started
1. **Install dependencies:**
   ```powershell
   npm install
   ```
2. **Create a `.env` file for credentials and config:**
   - Copy `.env.example` to `.env` and fill in your values (see below).
3. **Run all Playwright tests:**
   ```powershell
   npx playwright test
   ```
4. **(Optional) Run Playwright in UI mode:**
   ```powershell
   npx playwright test --ui
   ```
5. **View the HTML report:**
   ```powershell
   npx playwright show-report
   ```

## Environment Variables & Security
- This project uses the `dotenv` package to securely manage credentials and configuration.
- Create a `.env` file in the project root (never commit this file):
  ```env
  # .env example
  LINKEDIN_USER=your-email@example.com
  LINKEDIN_PASS=yourPassword
  JOB_KEYWORD=QA Engineer
  ```
- Credentials should be managed securely (e.g., environment variables, CI/CD secrets). Never hardcode sensitive data.

## Best Practices & Notes
- The script does **not** submit any job application; it automates up to the final step only.
- Screenshots, videos, and logs are saved in the `test-results` directory after each run.
- The framework is modular and can be extended for additional job boards or form validation scenarios.

---
**Disclaimer:** This project is for interview demonstration and educational purposes only. It does not provide IT support or production guarantees.
