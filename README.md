# Vesper.ai · Junno UI template

A monochrome AI operations template built with Next.js App Router, React, TypeScript, Tailwind CSS v4, shadcn/ui, GSAP, Motion, OGL, and Lenis.

## Run locally

Requires Node.js 20.9+ (Node 22 LTS or later recommended).

```sh
npm install
npm run dev
```

Open http://localhost:3200.

- `/` contains the animated silk-wave hero, glass navigation, automatically playing feature studio, process, illustrative plans, FAQs, and final action.
- `/experience` retains the step-by-step workflow demo and scroll-animation showcase.

The landing page uses the supplied PatternWaves WebGL2 component. It respects reduced motion, offers a pause control, suspends rendering outside the viewport and in hidden tabs, and cleans up GPU resources on unmount. A small, nonblocking “Setting the scene” indicator appears until the first rendered frame. Unsupported browsers get a quiet CSS ambient background; there is no fallback image or indefinite loading screen. No video is loaded. The folded-V SVG logo and matching favicon stay sharp at every size.

Lenis smooths mouse-wheel scrolling on GSAP's shared ticker, keeping ScrollTrigger in sync. Touch scrolling stays native. Reduced motion, hidden tabs, and the mobile navigation sheet suspend Lenis; scrolling textareas stays native.

## Customize

| File | Purpose |
| --- | --- |
| `src/config/site.ts` | Brand, description, canonical deployment URL |
| `src/data/content.ts` | Navigation, features, process, FAQs, sample plans |
| `src/components/blocks/hero-section.tsx` | Hero copy and actions |
| `src/components/blocks/hero-background.jsx` | PatternWaves configuration and pause control |
| `src/components/blocks/interactive-features.jsx` | Local prompt, activity, voice, and approval previews |
| `src/app/globals.css`, `src/app/landing.css` | Shared tokens and landing-page design |
| `src/components/layout/logo.tsx`, `src/app/icon.svg` | Folded-V logo and favicon |
| `src/components/react-bits/` | Supplied JavaScript/CSS components, adapted for React lifecycle safety |
| `src/components/animations/` | Isolated animation components and CSS |
| `src/components/ui/` | shadcn Button, Sheet, Accordion |
| `public/images/hero.jpg` | Static frame from the user-supplied visual |

Set `NEXT_PUBLIC_SITE_URL` to your deployment URL before building. Fonts are bundled and optimized with `next/font/local`; building does not contact Google Fonts.

## ScrollFloat

The requested JavaScript + CSS variant is at `src/components/animations/scroll-float/ScrollFloat.jsx`. The surrounding application uses TypeScript; JSDoc describes the component props.

```tsx
import ScrollFloat from '@/components/animations/scroll-float/ScrollFloat';

<ScrollFloat
  animationDuration={1}
  ease="back.inOut(2)"
  scrollStart="center bottom+=50%"
  scrollEnd="bottom bottom-=40%"
  stagger={0.03}
  containerClassName="display-heading"
>
  Built for ambitious teams.
</ScrollFloat>
```

All supplied ScrollFloat props are supported, including `scrollContainerRef`, `containerClassName`, and `textClassName`. String children animate character by character with word-safe wrapping. Non-string children render unchanged. Each animation owns its cleanup, waits for fonts, and responds to changes in reduced-motion preference. The server HTML is readable before JavaScript starts. Use the component below the fold with enough scrolling room to reach its end trigger.

ScrollReveal retains word opacity, optional blur, and rotation. ScrollStack and ScrollExpand are window-scroll adaptations using GSAP and native sticky positioning, so Lenis is not needed. These two layout effects fall back to static content below 901px width, below 650px height, or with reduced motion. Their props intentionally cover the page's use case rather than implementing every option in the pasted originals.

## Demo behavior

“Build your first agent” opens the automatic feature studio. A shared 14-second timeline types an example prompt, animates the simulated voice waveform, progresses ThoughtLine through the steps, and demonstrates approval. The preview loops while visible, pauses outside the viewport and in hidden tabs, and exposes Pause/Play and Replay controls. Reduced motion shows the completed state. Decorative controls are inert and hidden from assistive technology; the feature descriptions remain available. “Try it yourself” opens the separate hands-on demo. No microphone permission is requested and nothing is transmitted.

The separate `/experience` demo supports running, human review, approval, reset, and rerun. No AI service, account, billing, or backend is connected. Pricing is illustrative template content. No customer testimonials are invented.

## Validate and deploy

```sh
npm run lint
npm run type-check
npm run build
npm run test:e2e
npm start
```

Browser tests use installed Google Chrome and an isolated production server on port 3217. They cover seven widths, mobile menu keyboard behavior, the approval demo, FAQ, reduced motion, scroll progression, no-JavaScript text, accessibility, and preview screenshots in `artifacts/`.

Deploy this directory as a standard Next.js application, with `npm run build` as the build command. No secrets or backend services are required. Read `THIRD_PARTY_NOTICES.md` and the bundled upstream licenses when preparing distribution.
