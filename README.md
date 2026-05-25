# Playwright QA Framework

This is a compact TypeScript Playwright framework for demonstrating senior QA automation practices: UI tests, API tests, auth/session reuse, fixtures, page objects, test data, network mocking, reporting, and CI readiness.

## Demo Targets

- UI: `https://www.saucedemo.com`
- API: `https://jsonplaceholder.typicode.com`

These are intentionally public demo targets so the framework is easy to explain without private credentials or company code.

## What I Would Highlight In An Interview

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

## Walkthrough Script

If I were walking through this framework in an interview, I would say:

> "I built this as a small but realistic Playwright TypeScript framework. The main thing I wanted to show is not just test scripts, but maintainable automation architecture. The config defines projects, reporting, retries, traces, and a setup project for authentication. Tests use fixtures and page objects so the test intent is readable. I separated UI and API coverage, added data validation examples, and included CI configuration because automation should be useful in the release pipeline, not only locally."

Then I would open:

1. `playwright.config.ts`
2. `tests/ui/auth.setup.ts`
3. `src/fixtures/test.ts`
4. `src/pages/LoginPage.ts`
5. `tests/ui/inventory.authenticated.spec.ts`
6. `tests/api/recommendations.api.spec.ts`
7. `.github/workflows/playwright.yml`

## Debugging Talking Points

If a test fails, I would check:

- Is it a product issue, test issue, data issue, environment issue, or timing issue?
- Can I reproduce locally and in CI?
- What does the Playwright trace show?
- Did the locator fail because the UI changed or because the state is wrong?
- Did auth/session expire?
- Did network/API dependency fail?
- Can the test be made more deterministic with better waits, test data, or mocking?

## TypeScript Practice Areas

For the coding portion, I would practice:

- Array filtering/mapping/reducing.
- Finding duplicates.
- Validating JSON response shape.
- Writing async/await code safely.
- Building retry logic.
- Debugging a failing assertion.
- Explaining why a test is flaky and how to fix it.
