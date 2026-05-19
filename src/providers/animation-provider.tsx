"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AnimationContext = createContext<boolean>(true);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [play, setPlay] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("visited");
    }
    return true;
  });

  useEffect(() => {
    sessionStorage.setItem("visited", "true");
    setPlay(false);
  }, []);

  return (
    <AnimationContext.Provider value={play}>
      {children}
    </AnimationContext.Provider>
  );
}

export const useAnimation = () => useContext(AnimationContext);
