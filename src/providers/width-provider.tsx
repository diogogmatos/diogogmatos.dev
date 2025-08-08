"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface WidthContextData {
  width: number;
}

const WidthContext = createContext<WidthContextData | undefined>(undefined);

export function WidthProvider({ children }: { children: React.ReactNode }) {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    // Set initial width in case SSR
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <WidthContext.Provider value={{ width }}>{children}</WidthContext.Provider>
  );
}

export function useWidth(): number {
  const context = useContext(WidthContext);
  if (context === undefined) {
    throw new Error("useWidth() must be used within a WidthProvider");
  }
  return context.width;
}
