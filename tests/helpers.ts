import { test as base, expect, type Page } from "@playwright/test";
export const test = base.extend<{ errors: string[] }>({
  errors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await use(errors);
      expect(errors, "Uncaught browser exceptions").toEqual([]);
    },
    { auto: true },
  ],
});
export { expect };
export async function begin(page: Page) {
  await page.goto("/");
  await page.locator("canvas").waitFor();
  await page.getByRole("button", { name: "Begin transmission" }).click();
  await expect(page.locator("#hud")).toHaveAttribute("data-room", "0");
}
export async function axis(page: Page, name: "x" | "y", target: number) {
  const start = Number(await page.locator("#hud").getAttribute("data-" + name));
  if (Math.abs(target - start) < 8) return;
  const positive = target > start;
  const key = name === "x" ? (positive ? "d" : "a") : positive ? "s" : "w";
  await page.keyboard.down(key);
  try {
    await expect
      .poll(
        async () => {
          const n = Number(
            await page.locator("#hud").getAttribute("data-" + name),
          );
          return positive ? n >= target - 5 : n <= target + 5;
        },
        { timeout: 12000, intervals: [30] },
      )
      .toBe(true);
  } finally {
    await page.keyboard.up(key);
  }
}
export async function use(page: Page) {
  await page.keyboard.press("e", { delay: 50 });
}
export async function east(page: Page, next: number) {
  await axis(page, "y", 280);
  await page.keyboard.down("d");
  try {
    await expect(page.locator("#hud")).toHaveAttribute(
      "data-room",
      String(next),
      { timeout: 15000 },
    );
  } finally {
    await page.keyboard.up("d");
  }
}
export async function seed(page: Page, progress: Record<string, unknown>) {
  await page.addInitScript((p) => {
    localStorage.setItem("signal-lost.save.v1", JSON.stringify(p));
  }, progress);
  await page.goto("/");
  await page.getByRole("button", { name: "Continue signal" }).click();
}
