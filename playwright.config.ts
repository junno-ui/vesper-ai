import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 3,
  use: { channel: "chrome", baseURL: "http://127.0.0.1:3217", trace: "retain-on-failure" },
  webServer: { command: "npm run start -- --port 3217", url: "http://127.0.0.1:3217", reuseExistingServer: false, timeout: 120000 },
});
