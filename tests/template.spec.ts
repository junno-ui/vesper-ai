import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [375, 430, 768, 1024, 1280, 1440, 1920]) {
  test(`homepage and experience fit ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width >= 1600 ? 1080 : 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const route of ["/", "/experience"]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("h1")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      if (route === "/") await expect(page.locator("#benefits")).toBeAttached();
      const missingTargets = await page.locator('a[href^="#"]').evaluateAll(links => links.map(a => a.getAttribute("href")!).filter(href => href.length > 1 && !document.getElementById(href.slice(1))));
      expect(missingTargets).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}

test("mobile menu supports Escape, focus return, navigation, and desktop resize", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open menu" });
  await menu.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(menu).toBeFocused();
  await menu.click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "FAQs" }).click();
  await expect(page).toHaveURL(/\/#faqs$/);
  await expect(page.getByRole("dialog")).toBeHidden();
  await menu.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("demo waits for approval and can reset and rerun", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/experience#start");
  await page.getByRole("button", { name: "Run workflow", exact: true }).click();
  await expect(page.getByRole("button", { name: "Approve response" })).toBeVisible();
  await expect(page.getByRole("status")).toContainText("Review ready");
  await page.getByRole("button", { name: "Approve response" }).click();
  await expect(page.getByRole("status")).toContainText("Workflow complete");
  await page.getByRole("button", { name: "Run again" }).click();
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Run a sample workflow");
  await page.getByRole("button", { name: "What happens when I start the demo?" }).click();
  await expect(page.getByText("A sample request moves through", { exact: false })).toBeVisible();
});

test("scroll effects progress and revert when reduced motion changes", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/experience");
  await expect(page.locator(".scroll-stack")).toHaveAttribute("data-stack-enabled", "true");
  const heading = page.locator(".scroll-float").first();
  const character = heading.locator(".scroll-float-char").first();
  await expect(character).toHaveCSS("opacity", "0");
  await heading.evaluate(el => window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 260, behavior: "instant" }));
  await expect(character).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".scroll-stack")).not.toHaveAttribute("data-stack-enabled");
  await expect(page.locator(".scroll-expand")).not.toHaveAttribute("data-expand-enabled");
  await expect(character).toHaveCSS("transform", "none");
  await expect(character).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".scroll-stack")).toHaveAttribute("data-stack-enabled", "true");
});

test("static content remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3217/experience");
  await expect(page.locator(".scroll-float-char").first()).toHaveCSS("opacity", "1");
  await expect(page.locator(".scroll-reveal-word").first()).toHaveCSS("opacity", "1");
  await context.close();
});

test("desktop and mobile pages pass accessibility checks", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/experience"]) {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(results.violations).toEqual([]);
    }
  }
});

test("capture desktop, mobile, and experience previews", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".pattern-waves")).toHaveAttribute("data-ready", "true");
  await page.screenshot({ path: "artifacts/vesper-desktop.png" });
  await page.locator(".feature-studio").screenshot({ path: "artifacts/vesper-features.png" });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "artifacts/vesper-mobile.png" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/experience");
  await page.locator(".scroll-expand").scrollIntoViewIfNeeded();
  await expect(page.locator(".expand-media img")).toHaveJSProperty("complete", true);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: "artifacts/vesper-experience.png", fullPage: true });
});

test("feature preview plays automatically, pauses, resumes, and replays", async ({ page }) => {
  await page.goto("/#benefits");
  const section = page.locator("#benefits");
  await expect(section).toHaveAttribute("data-playing", "true");
  await expect(page.locator(".prompt-bar__input")).not.toHaveValue("", { timeout: 5000 });
  await page.getByRole("button", { name: "Pause feature preview" }).click();
  await expect(section).toHaveAttribute("data-playing", "false");
  const frozen = await page.locator(".prompt-bar__input").inputValue();
  await page.waitForTimeout(400);
  await expect(page.locator(".prompt-bar__input")).toHaveValue(frozen);
  await page.getByRole("button", { name: "Play feature preview" }).click();
  await expect(section).toHaveAttribute("data-demo-stage", "approved", { timeout: 15000 });
  await expect(page.locator(".approval-tag")).toContainText("Approval received");
  await page.getByRole("button", { name: "Replay feature preview" }).click();
  await expect(section).toHaveAttribute("data-demo-stage", "typing");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(section).toHaveAttribute("data-playing", "false");
  await expect(section).toHaveAttribute("data-demo-stage", "approved");
  await expect(page.getByRole("link", { name: "Try it yourself" })).toHaveAttribute("href", "/experience#start");
});
test("PatternWaves renders, can pause, and keeps a fallback without WebGL", async ({ page, browser }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator(".pattern-waves canvas")).toBeVisible();
  await expect(page.locator(".pattern-waves")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Pause background animation" }).click();
  await expect(page.getByRole("button", { name: "Play background animation" })).toHaveAttribute("aria-pressed", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".motion-toggle")).toBeHidden();
  await page.goto("/experience");
  expect(errors).toEqual([]);
  const context = await browser.newContext();
  await context.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      if (String(args[0]).includes("webgl")) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  const fallback = await context.newPage();
  await fallback.goto("http://127.0.0.1:3217/");
  await expect(fallback.locator(".hero-background")).toHaveAttribute("data-status", "unavailable");
  await expect(fallback.locator(".scene-loader")).toHaveCount(0);
  await expect(fallback.locator(".hero-background img")).toHaveCount(0);
  await expect(fallback.locator(".wave-ambient")).toBeVisible();
  await expect(fallback.locator("h1")).toBeVisible();
  await context.close();
});

test("Lenis smooths scrolling and yields to reduced motion and mobile menus", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/lenis/);
  await page.mouse.wheel(0, 500);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("html")).toHaveClass(/lenis/);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await page.keyboard.press("Escape");
  await expect(page.locator("html")).toHaveClass(/lenis/);
});
