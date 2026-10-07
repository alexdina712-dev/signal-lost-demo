import { test, expect, begin, axis, use, east } from "./helpers";
test("public demo can be completed and replayed using normal controls", async ({
  page,
}) => {
  await begin(page);
  await expect(page.locator(".build-tag")).toContainText("PUBLIC DEMO");
  await axis(page, "x", 736);
  await use(page);
  await east(page, 1);
  await axis(page, "x", 330);
  await use(page);
  await axis(page, "x", 744);
  await use(page);
  await expect(
    page.getByRole("heading", { name: "Demo complete." }),
  ).toBeVisible();
  await expect(page.locator("#relays")).toHaveText("1 / 1");
  await page.getByRole("button", { name: "Play again", exact: true }).click();
  await page.getByRole("button", { name: "Keep current run" }).click();
  await expect(
    page.getByRole("heading", { name: "Demo complete." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Return to title" }).click();
  await page.reload();
  await page
    .getByRole("button", { name: "View completed transmission" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Demo complete." }),
  ).toBeVisible();
});
test("demo map and downloaded code exclude private levels", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Station map", exact: true }).click();
  await expect(page.locator(".map-list li")).toHaveCount(2);
  await expect(page.getByRole("dialog")).not.toContainText("Foundry");
  const urls = await page
    .locator("script[src]")
    .evaluateAll((elements) =>
      elements.map((e) => (e as HTMLScriptElement).src),
    );
  for (const url of urls) {
    const response = await page.request.get(url);
    expect(response.ok()).toBe(true);
    const source = await response.text();
    for (const id of ["foundry-cell", "gallery-emp", "relay-c"])
      expect(source).not.toContain(id);
  }
});
