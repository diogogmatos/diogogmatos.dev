"use client";

import { useEffect, useState } from "react";
import FadeIn from "./fade-in";

const PIXEL_SIZE = 3; // CSS pixels per canvas pixel, for the chunky dithered look
const FRAME_INTERVAL = 1000 / 24;

// 4x4 Bayer matrix as thresholds for ordered dithering
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(
  (value) => (value + 0.5) / 16,
);

// Bands of light, with their height as a fraction of the canvas. Each one
// follows a broad wave plus a finer ripple on top of it
const RIBBONS = [
  {
    y: 0.3,
    wave: 0.08,
    frequency: 5,
    speed: 0.12,
    ripple: 0.025,
    rippleFrequency: 13,
    rippleSpeed: -0.2,
    thickness: 0.09,
    brightness: 0.65,
  },
  {
    y: 0.46,
    wave: 0.09,
    frequency: 4,
    speed: -0.09,
    ripple: 0.02,
    rippleFrequency: 17,
    rippleSpeed: 0.12,
    thickness: 0.11,
    brightness: 0.4,
  },
  {
    y: 0.18,
    wave: 0.04,
    frequency: 7,
    speed: 0.15,
    ripple: 0.01,
    rippleFrequency: 21,
    rippleSpeed: 0.25,
    thickness: 0.05,
    brightness: 0.3,
  },
];

// Light hanging below the first band, like aurora rays
const TRAIL_BRIGHTNESS = 0.25;
const TRAIL_LENGTH = 0.15; // Fraction of the canvas height

const GRAIN = 0.05; // Strength of the subtle moving texture

const CURSOR_RADIUS = 10; // In canvas pixels
const CURSOR_BRIGHTNESS = 0.25;
const CURSOR_ENTER_STRENGTH = 0.4; // So the glow shows up as soon as the cursor enters
const CURSOR_FADE = 0.4; // Bottom fraction of the canvas where the glow fades out
const CURSOR_DENSITY = 1 / 16; // Fraction of pixels the glow lights up, the same across all of it

export default function Aurora() {
  // State instead of a ref, so everything is set up again if the canvas is replaced.
  // FadeIn does that on back navigation and reloads, to skip its animation
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let image = new ImageData(1, 1);
    const centers = new Float32Array(RIBBONS.length);
    const cursor = { x: 0, y: 0, strength: 0 };
    const target = { x: 0, y: 0, strength: 0 };

    const draw = (time: number) => {
      const t = time / 1000;
      const { width, height, data } = image;

      cursor.x += (target.x - cursor.x) * 0.1;
      cursor.y += (target.y - cursor.y) * 0.1;
      // The glow appears quickly and lingers a bit when the cursor leaves
      cursor.strength +=
        (target.strength - cursor.strength) *
        (target.strength > cursor.strength ? 0.12 : 0.03);

      data.fill(0);
      for (let x = 0; x < width; x++) {
        const nx = x / width;
        const sideFade = Math.min(1, nx / 0.15, (1 - nx) / 0.15);
        // Vertical streaks drifting sideways, like aurora curtains
        const shimmer =
          0.75 +
          0.15 * Math.sin(nx * 40 + t * 0.6) +
          0.1 * Math.sin(nx * 95 - t * 0.35);
        for (let i = 0; i < RIBBONS.length; i++) {
          const ribbon = RIBBONS[i];
          centers[i] =
            ribbon.y +
            ribbon.wave *
              Math.sin(nx * ribbon.frequency + t * ribbon.speed + i * 2) +
            ribbon.ripple *
              Math.sin(nx * ribbon.rippleFrequency + t * ribbon.rippleSpeed);
        }

        for (let y = 0; y < height; y++) {
          const ny = y / height;
          const fade = sideFade * Math.min(1, ny / 0.1) * (1 - ny) ** 2;

          let light = 0;
          for (let i = 0; i < RIBBONS.length; i++) {
            const distance = (ny - centers[i]) / RIBBONS[i].thickness;
            light += RIBBONS[i].brightness * Math.exp(-distance * distance);
          }
          if (ny > centers[0]) {
            light +=
              TRAIL_BRIGHTNESS * Math.exp(-(ny - centers[0]) / TRAIL_LENGTH);
          }
          const grain =
            1 - GRAIN + GRAIN * Math.sin(x * 1.9 + y * 2.6 + t * 0.5);
          const dx = x - cursor.x;
          const dy = y - cursor.y;
          const bands = light * shimmer * grain * fade;
          // The glow doesn't use the bands' fade, so it follows the cursor away from them.
          // It's capped so its center isn't any denser than its edge
          const glow = Math.min(
            CURSOR_DENSITY,
            CURSOR_BRIGHTNESS *
              cursor.strength *
              Math.exp(-(dx * dx + dy * dy) / (2 * CURSOR_RADIUS ** 2)) *
              sideFade,
          );
          light = bands + glow;

          if (light > BAYER[(y & 3) * 4 + (x & 3)]) {
            // Smoothly fades the glow's opacity out towards the bottom edge
            const bottom = Math.min(1, (1 - ny) / CURSOR_FADE);
            const glowOpacity = bottom * bottom * (3 - 2 * bottom);
            const opacity = (bands + glow * glowOpacity) / light;

            const index = (y * width + x) * 4;
            data[index] = data[index + 1] = data[index + 2] = 255;
            data[index + 3] = 255 * Math.min(1, 0.35 + light * 0.5) * opacity;
          }
        }
      }

      context.putImageData(image, 0, 0);
    };

    // Only animates while the canvas is on screen and motion is allowed
    let frame = 0;
    let lastDraw = 0;
    let onScreen = true;
    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      if (time - lastDraw < FRAME_INTERVAL) return;
      lastDraw = time;
      draw(time);
    };
    const update = () => {
      cancelAnimationFrame(frame);
      if (!onScreen) return;
      if (reducedMotion.matches) {
        Object.assign(cursor, target);
        draw(0);
      } else {
        frame = requestAnimationFrame(loop);
      }
    };

    const resizeObserver = new ResizeObserver(([entry]) => {
      const width = Math.ceil(entry.contentRect.width / PIXEL_SIZE);
      const height = Math.ceil(entry.contentRect.height / PIXEL_SIZE);
      if (!width || !height) return;
      canvas.width = width;
      canvas.height = height;
      image = new ImageData(width, height);
      draw(reducedMotion.matches ? 0 : performance.now());
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });

    let pointerInside = false;
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const wasInside = pointerInside;
      pointerInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      target.strength = pointerInside ? 1 : 0;
      if (pointerInside) {
        target.x = (event.clientX - rect.left) / PIXEL_SIZE;
        target.y = (event.clientY - rect.top) / PIXEL_SIZE;
        // Start the glow where the cursor entered instead of sliding in from where it left
        if (!wasInside) {
          Object.assign(cursor, {
            x: target.x,
            y: target.y,
            strength: Math.max(cursor.strength, CURSOR_ENTER_STRENGTH),
          });
        }
      }
      if (reducedMotion.matches) update();
    };
    const onPointerEnd = (event: PointerEvent) => {
      // Leaving the window, or lifting a finger on touch screens
      if (event.type === "pointerleave" || event.pointerType !== "mouse") {
        pointerInside = false;
        target.strength = 0;
        if (reducedMotion.matches) update();
      }
    };

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    reducedMotion.addEventListener("change", update);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerEnd);
    document.documentElement.addEventListener("pointerleave", onPointerEnd);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      reducedMotion.removeEventListener("change", update);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerEnd);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerEnd,
      );
    };
  }, [canvas]);

  // The fade in is on a wrapper, since its transform and opacity would override the canvas's
  return (
    <FadeIn
      blurred
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-[5]"
    >
      <canvas
        ref={setCanvas}
        className="block mx-auto h-[20rem] w-full -translate-y-1/3 max-w-6xl opacity-85 [image-rendering:pixelated]"
      />
    </FadeIn>
  );
}
