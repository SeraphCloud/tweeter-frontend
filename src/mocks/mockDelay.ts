const DEFAULT_DELAY_MS = 400;

export function mockDelay(ms: number = DEFAULT_DELAY_MS): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
