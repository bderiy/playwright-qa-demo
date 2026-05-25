import { APIRequestContext, expect } from '@playwright/test';

export class ApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string
  ) {}

  async getPost(postId: number) {
    const response = await this.request.get(`${this.baseUrl}/posts/${postId}`);
    expect(response.ok()).toBeTruthy();
    return response.json() as Promise<Post>;
  }

  async createPost(payload: CreatePostPayload) {
    const response = await this.request.post(`${this.baseUrl}/posts`, {
      data: payload
    });
    expect(response.status()).toBe(201);
    return response.json() as Promise<Post>;
  }
}

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type CreatePostPayload = {
  userId: number;
  title: string;
  body: string;
};
