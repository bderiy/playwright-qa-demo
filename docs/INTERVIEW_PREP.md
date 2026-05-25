# Two Hour Technical Interview Prep

## Part 1: Framework Walkthrough

Use this order when presenting:

1. `README.md`: explain the purpose and target sites.
2. `playwright.config.ts`: show projects, reports, traces, retries, auth dependency, and device coverage.
3. `tests/ui/auth.setup.ts`: explain session setup and `storageState`.
4. `src/fixtures/test.ts`: explain custom fixtures and clean test composition.
5. `src/pages/LoginPage.ts` and `src/pages/InventoryPage.ts`: explain Page Object boundaries.
6. `tests/ui/inventory.authenticated.spec.ts`: explain readable test steps and network mocking.
7. `tests/api/posts.api.spec.ts`: explain API contract checks.
8. `tests/api/recommendations.api.spec.ts`: connect to personalization and data quality.
9. `.github/workflows/playwright.yml`: explain CI artifacts and quality gates.

## Opening Pitch

> "I built this as a small Playwright TypeScript framework to show how I think about automation architecture. I wanted to demonstrate maintainability, not just a few scripts: environment config, page objects, fixtures, session reuse, UI and API coverage, data validation, network mocking, reporting, and CI integration. In a real team I would adapt the device/browser matrix, tagging strategy, and quality gates to the product risk and release process."

## What To Say About Best Practices

- "Tests should be readable at the business-flow level."
- "Repeated setup belongs in fixtures or setup projects, not copied into every test."
- "I prefer stable user-facing locators, explicit assertions, and avoiding hard waits."
- "I separate product bugs, test bugs, data issues, and environment failures during debugging."
- "I use traces, screenshots, videos, and logs to make failures actionable."
- "I tag smoke/regression tests so CI can run the right scope for the right release risk."
- "For flaky tests, I look for root cause before increasing retries."

## Strong Answers For Framework Questions

**Why Playwright?**

> "It supports modern browser automation, auto-waiting, parallel execution, traces, API testing, mobile emulation, network interception, and good CI reporting. That makes it useful for both UI workflows and service-level validation."

**How do you handle authentication?**

> "I use a setup project that logs in once and saves storage state. Authenticated tests reuse that state so they are faster and less flaky. I still keep a few dedicated login tests to validate the auth flow itself."

**How do you debug failures?**

> "I first classify the failure: product, test, data, environment, or timing. Then I inspect the trace, screenshot/video, network activity, console errors, and logs. I try to reproduce locally and compare against CI. After root cause, I either fix the product issue, improve the locator/wait/test data, or isolate unstable dependencies with mocking."

**What would you improve next?**

> "I would add test tagging by feature and risk, richer API schema validation, visual checks for key pages, accessibility smoke checks, and integration with test management or release dashboards. For a streaming product, I would also add playback telemetry validation and network-condition coverage."

## Part 2: Coding And Debugging Practice

Expect tasks like:

- Fix a failing locator.
- Replace a hard wait with a proper assertion.
- Add an API test.
- Parse JSON and validate required fields.
- Find duplicates in an array.
- Add retry around a flaky async operation.
- Debug why `await` is missing.
- Explain why a test passes locally but fails in CI.

## Debugging Checklist

1. Read the failure message before touching code.
2. Identify the exact failing line.
3. Ask: is the state wrong, locator wrong, timing wrong, data wrong, or app wrong?
4. Add a focused assertion before the failure if needed.
5. Use trace/network/logs to prove the cause.
6. Make the smallest fix.
7. Re-run the relevant test only.

## TypeScript Patterns To Be Ready For

```ts
const duplicates = items.filter((item, index, array) =>
  array.findIndex(candidate => candidate.id === item.id) !== index
);
```

```ts
const invalidItems = recommendations.filter(item =>
  !item.playable || !allowedRatings.includes(item.maturityRating)
);
```

```ts
await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
```

```ts
const response = await request.get('/api/recommendations');
expect(response.ok()).toBeTruthy();
const body = await response.json();
expect(body.items).toEqual(expect.any(Array));
```
