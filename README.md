
# LinkedIn Jobs Automation with Playwright (TypeScript)

This project demonstrates automation of the LinkedIn Jobs “Easy Apply” workflow using Playwright and TypeScript.
\
---
*This README and project were generated and refined with the assistance of GitHub Copilot (AI).* 
---

## Features
- Navigates to https://www.linkedin.com/jobs
- Searches for jobs with the “Easy Apply” option
- Opens the application form and validates required fields (name, email, resume upload)
- Validates required field enforcement, file upload field behavior, and button state
- Robust error handling and logging for missing elements, unexpected page behavior, and timeouts

## How to Run
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Run Playwright tests:
   ```powershell
   npx playwright test
   ```
3. (Optional) Run Playwright in UI mode:
   ```powershell
   npx playwright test --ui
   ```

## Notes
- The script does **not** submit any job application; it automates up to the final step only.
- Screenshots and logs are saved in the `test-results` directory after each run.

---
This project is for interview demonstration only. It does not provide IT support or production guarantees.
Store credentials securely (do not hardcode LinkedIn credentials)
