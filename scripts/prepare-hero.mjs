// Run once with a local copy of the reference MP4; the site renders a still image only.
import { chromium } from "@playwright/test";
import { createServer } from "node:http";
import { createReadStream, statSync, writeFileSync } from "node:fs";
const video = new URL("../public/images/reference.mp4", import.meta.url);
const server = createServer((req, res) => {
  if (req.url === "/video") {
    const size = statSync(video).size;
    const range = req.headers.range;
    const start = range ? Number(range.replace(/bytes=/, "").split("-")[0]) : 0;
    res.writeHead(range ? 206 : 200, { "Content-Type": "video/mp4", "Accept-Ranges": "bytes", "Content-Length": size - start, ...(range ? { "Content-Range": `bytes ${start}-${size - 1}/${size}` } : {}) });
    createReadStream(video, { start }).pipe(res);
  } else { res.setHeader("Content-Type", "text/html"); res.end('<video src="/video" muted preload="auto"></video>'); }
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
let browser;
try {
  browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  const data = await page.evaluate(async () => {
    const video = document.querySelector("video");
    if (video.readyState < 2) await new Promise(resolve => video.addEventListener("loadeddata", resolve, { once: true }));
    video.currentTime = Math.min(2, video.duration / 2);
    await new Promise(resolve => video.addEventListener("seeked", resolve, { once: true }));
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    return canvas.toDataURL("image/jpeg", 0.93).split(",")[1];
  });
  writeFileSync(new URL("../public/images/hero.jpg", import.meta.url), Buffer.from(data, "base64"));
  console.log("Created public/images/hero.jpg from the supplied reference.");
} finally { await browser?.close(); server.close(); }
