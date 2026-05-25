# TypeScript Coding Drills

These are realistic tasks for a QA automation technical screen.

## Drill 1: Find Duplicate Recommendation IDs

```ts
type Item = { id: string; title: string };

function duplicateIds(items: Item[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const item of items) {
    if (seen.has(item.id)) {
      duplicates.add(item.id);
    }
    seen.add(item.id);
  }

  return [...duplicates];
}
```

What to say:

> "I use a Set for O(n) complexity and return unique duplicate IDs. I would add unit coverage for no duplicates, one duplicate, multiple duplicates, and empty input."

## Drill 2: Validate API Contract

```ts
type ApiPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function isValidPost(value: unknown): value is ApiPost {
  const post = value as Partial<ApiPost>;

  return (
    typeof post.id === 'number' &&
    typeof post.userId === 'number' &&
    typeof post.title === 'string' &&
    post.title.length > 0 &&
    typeof post.body === 'string'
  );
}
```

What to say:

> "I prefer explicit validation for critical fields. In a production framework I might use a schema library, but this shows the validation logic clearly."

## Drill 3: Fix A Flaky Playwright Test

Bad:

```ts
await page.getByRole('button', { name: 'Save' }).click();
await page.waitForTimeout(3000);
expect(await page.getByText('Saved').isVisible()).toBe(true);
```

Better:

```ts
await page.getByRole('button', { name: 'Save' }).click();
await expect(page.getByText('Saved')).toBeVisible();
```

What to say:

> "I remove hard waits and let Playwright wait on the actual user-visible condition. This reduces flakiness and keeps the test faster."

## Drill 4: Retry An Async Operation

```ts
async function retry<T>(action: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await action();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}
```

What to say:

> "Retries should be used carefully. I would use this around unstable external dependencies, not to hide real product bugs."

## Drill 5: Add An API Test

```ts
test('returns playable recommendations', async ({ request }) => {
  const response = await request.get('/api/recommendations');
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.items).toEqual(expect.any(Array));

  for (const item of body.items) {
    expect.soft(item.id).toEqual(expect.any(String));
    expect.soft(item.title).toEqual(expect.any(String));
    expect.soft(item.playable).toBe(true);
  }
});
```

What to say:

> "I use soft assertions inside the loop so one bad item does not hide the rest of the data quality issues."

## Drill 6: Debugging Script

When given a broken test, say:

> "Before changing code, I want to read the error and identify the exact failing line. Then I’ll check whether this is a locator issue, timing issue, test data issue, environment issue, or real product issue. I’ll make the smallest change and rerun the relevant test."
