export async function retry<T>(
  action: () => Promise<T>,
  options: { attempts: number; delayMs: number; shouldRetry?: (error: unknown) => boolean }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= options.attempts; attempt++) {
    try {
      return await action();
    } catch (error) {
      lastError = error;
      const canRetry = options.shouldRetry ? options.shouldRetry(error) : true;
      if (!canRetry || attempt === options.attempts) {
        break;
      }
      await new Promise(resolve => setTimeout(resolve, options.delayMs));
    }
  }

  throw lastError;
}
