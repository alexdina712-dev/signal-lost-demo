import { defineConfig, devices } from "@playwright/test";
const remote = process.env.PUBLIC_BASE_URL;
export default defineConfig({
  testDir: "tests",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  workers: 2,
  retries: 0,
  timeout: 90000,
  expect: { timeout: 10000 },
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report-demo", open: "never" }],
    ["json", { outputFile: "test-results/results.json" }],
  ],
  use: {
    baseURL: remote || "http://127.0.0.1:5182",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: devices["Desktop Chrome"] },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: remote
    ? undefined
    : {
        command:
          "node serve.mjs",
        url: "http://127.0.0.1:5182",
        reuseExistingServer: false,
      },
});
