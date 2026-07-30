# Chronos Reveal

Act as a world-class Awwwards-level Creative Developer and Brand Experience Director, specializing in ultra-premium web design, Next.js, Framer Motion, advanced scroll-based storytelling, and 3D-inspired product interactions.

THE TASK: Design and write the code for a high-end, Apple-level scrollytelling landing page for a new ultra-premium Smartwatch.

The experience must feel like a cinematic product reveal combined with an interactive engineering showcase. The core mechanic is driven entirely by scroll-based image-sequence animation and premium typography/layout.

THE CORE MECHANIC (IMAGE SEQUENCE LOGIC): I have a video of the smartwatch exploding/disassembling that I have converted into an image sequence and extracted from a .zip file. These images will be hosted locally in my public/assets/sequence folder (named sequentially, e.g., 0001.webp, 0002.webp, up to 0150.webp).

As the user scrolls, the code must scrub through this image sequence forwards and backwards.

The animation shows the smartwatch expanding into a floating technical diagram of its internal micro-components, sensors, and chips, then reassembling.

Text blocks and feature copywriting must fade in and out, perfectly synchronized with specific frame ranges of the disassembly.

TECH STACK & CODE REQUIREMENTS:

Framework: Next.js 14 (App Router). Write the necessary page components and client-side hooks.

Rendering: Use an HTML5 <canvas> element for the image sequence playback. Write highly optimized code to preload the images into browser memory before the user scrolls to ensure performance, zero flickering, and maximum smoothness.

Animation: Use Framer Motion (useScroll, useTransform) to link the scroll position to the current frame of the Canvas and to trigger the enter/exit animations of the typography.

Styling: Tailwind CSS for tight spacing, consistent scaling, and absolute positioning of the text overlays.

VISUAL DIRECTION & BRAND AESTHETIC:

Overall vibe: Apple-level, luxury tech merged with high-end mechanical horology aesthetics. Cinematic, ultra-clean, minimal, editorial, and premium.

Layout: Dark mode focus to make the product pop, utilizing deep blacks, subtle metallic gradients, and refined, highly legible typography.

Please generate the Next.js code for the main landing page, the Canvas sequence component, and the Framer Motion scrolling logic.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0f08de07-9f8a-40e0-be5e-18e89e3ae3b5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
