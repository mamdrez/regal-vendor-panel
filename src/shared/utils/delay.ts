/**
 * Simulates network latency for mock services so the UI exercises real
 * loading states. Replace mock services with real API calls later.
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
