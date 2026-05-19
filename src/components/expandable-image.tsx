"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ImageProps } from "next/image";
import SkeletonImage from "./skeleton-image";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

export default function ExpandableImage({ props }: { props: ImageProps }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        type="button"
        className="w-full cursor-zoom-in"
        onClick={() => setIsExpanded(true)}
      >
        <SkeletonImage props={props} noFilter />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{
                  backdropFilter: "blur(0px)",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                }}
                animate={{
                  backdropFilter: "blur(4px)",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
                exit={{
                  backdropFilter: "blur(0px)",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-zoom-out"
                onClick={() => setIsExpanded(false)}
              >
                <motion.button
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  onClick={() => setIsExpanded(false)}
                  className="relative max-h-full max-w-screen-lg flex items-center justify-center cursor-zoom-out shadow-md"
                >
                  <Image
                    src={props.src}
                    alt={props.alt || "Fullscreen image"}
                    width={1920}
                    height={1080}
                    className="max-h-[90vh] w-auto rounded-lg object-contain"
                  />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
