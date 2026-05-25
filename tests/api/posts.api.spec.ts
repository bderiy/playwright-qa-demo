import { test, expect } from '@fixtures/test';

test.describe('API validation', () => {
  test('@smoke validates required response fields', async ({ apiClient }) => {
    const post = await apiClient.getPost(1);

    expect(post).toEqual(
      expect.objectContaining({
        id: 1,
        userId: expect.any(Number),
        title: expect.any(String),
        body: expect.any(String)
      })
    );
  });

  test('creates a post and validates response contract', async ({ apiClient }) => {
    const post = await apiClient.createPost({
      userId: 7,
      title: 'QA automation framework',
      body: 'Contract validation example'
    });

    expect.soft(post.id).toBeDefined();
    expect.soft(post.userId).toBe(7);
    expect.soft(post.title).toBe('QA automation framework');
  });
});
