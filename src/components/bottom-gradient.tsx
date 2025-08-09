"use client";

import { useEffect, useState } from "react";

const BottomGradient = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Calculate how close to bottom (within 20px threshold)
      const isBottom = windowHeight + scrollTop >= documentHeight - 20;

      setIsVisible(!isBottom);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // Initial check
    handleScroll();

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full pointer-events-none"} transition-all duration-300 ease-in-out fixed bottom-0 left-0 right-0 h-32 sm:h-40 md:h-48 pointer-events-none [backdrop-filter:blur(2px)] [mask:linear-gradient(transparent,black_70%)] z-40`}
    />
  );
};

export default BottomGradient;
