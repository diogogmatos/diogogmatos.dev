"use client";

export const popIn = (delay: number) => ({
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.2, delay },
});

export const blurInOut = {
  initial: {
    backdropFilter: "blur(0px)",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  animate: {
    backdropFilter: "blur(4px)",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  exit: {
    backdropFilter: "blur(0px)",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
};

export const zoomInOut = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.5, opacity: 0 },
};
