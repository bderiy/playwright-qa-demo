# Playwright QA Framework

This is a compact TypeScript Playwright framework for demonstrating senior QA automation practices: UI tests, API tests, auth/session reuse, fixtures, page objects, test data, network mocking, reporting, and CI readiness.

## Demo Targets

- UI: `https://www.saucedemo.com`
- API: `https://jsonplaceholder.typicode.com`

These are intentionally public demo targets so the framework is easy to explain without private credentials or company code.

## What I Would Highlight

1. **Framework structure**
   - `playwright.config.ts` centralizes browser projects, retries, reports, traces, screenshots, videos, and auth setup dependencies.
   - `src/fixtures/test.ts` extends Playwright fixtures so tests stay readable and reusable.
   - `src/pages` contains Page Objects for UI screens.
   - `src/utils` contains reusable API/data helpers.
   - `tests/ui` and `tests/api` separate UI and API concerns.

2. **Session handling**
   - `tests/ui/auth.setup.ts` logs in once and saves `storageState`.
   - Authenticated tests reuse `storage-state/saucedemo-user.json`.
   - This avoids repeated login steps, improves speed, and reduces flakiness.

3. **Cross-platform thinking**
   - Config includes authenticated desktop Chromium, guest WebKit, mobile Chrome, and API projects.
   - In a real product I would map these projects to the highest-traffic browsers/devices and historically risky platforms.

4. **Debugging support**
   - Traces, screenshots, videos, HTML report, and JUnit report are enabled.
   - Failed tests preserve enough evidence for fast root cause analysis.

5. **API and data validation**
   - API tests validate response contracts and business rules.
   - Recommendation examples show how I would test personalization outputs: duplicates, playable content, maturity rating, and invalid items.

6. **Network mocking**
   - `page.route()` demonstrates how I isolate UI behavior from backend instability.
   - I would use this for negative states, edge cases, and deterministic regression coverage.

7. **CI readiness**
   - `.github/workflows/playwright.yml` shows how I would run this in CI with secrets, browser installation, reports, and artifacts.

## Commands

```bash
npm install
npx playwright install
npm test
npm run test:ui
npm run test:api
npm run test:smoke
npm run report
```

## Environment

Copy `.env.example` to `.env`:

```bash
BASE_URL=https://www.saucedemo.com
API_BASE_URL=https://jsonplaceholder.typicode.com
USER_NAME=standard_user
USER_PASSWORD=secret_sauce
CI=false
```

