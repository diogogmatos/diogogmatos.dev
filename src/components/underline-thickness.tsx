"use client";

import { useEffect } from "react";

// Sets --underline-thickness to about 1px, but as a whole number of device pixels. With
// fractional display scaling (like 1.75x), a plain 1px underline gets rounded to 1 or 2
// device pixels depending on where it lands, so some links look thinner than others.
// It's rounded down to 1/60px, Firefox's layout unit, so it can't overshoot either.
export default function UnderlineThickness() {
  useEffect(() => {
    let query: MediaQueryList | undefined;

    const update = () => {
      const ratio = window.devicePixelRatio;
      const devicePixels = Math.max(1, Math.round(ratio));
      const thickness = Math.floor((devicePixels / ratio) * 60) / 60;
      document.documentElement.style.setProperty(
        "--underline-thickness",
        `${thickness}px`,
      );

      // Zooming or moving the window to another screen changes the ratio
      query?.removeEventListener("change", update);
      query = window.matchMedia(`(resolution: ${ratio}dppx)`);
      query.addEventListener("change", update);
    };

    update();
    return () => query?.removeEventListener("change", update);
  }, []);

  return null;
}
