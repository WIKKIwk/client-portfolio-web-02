"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 700);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Yuqoriga qaytish"
          title="Yuqoriga"
          initial={{ opacity: 0, y: 18, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.92 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed right-5 md:right-8 bottom-6 md:bottom-8 z-[90] inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border border-white/10 bg-black/75 text-white shadow-[0_0_35px_rgba(0,0,0,0.6)] backdrop-blur-md transition hover:bg-white/12 hover:border-white/25"
        >
          <ArrowUp className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.7} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
