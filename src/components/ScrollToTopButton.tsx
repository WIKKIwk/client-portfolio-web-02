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
          initial={{ opacity: 0, y: 18, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.88 }}
          whileTap={{ scale: 0.92, y: 1 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="group fixed right-4 md:right-7 bottom-5 md:bottom-7 z-[90] inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white shadow-[0_10px_26px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition will-change-transform hover:border-white/20 hover:bg-black/25 hover:shadow-[0_14px_30px_rgba(0,0,0,0.42)]"
        >
          <ArrowUp className="relative z-10 h-4 w-4 md:h-[18px] md:w-[18px]" strokeWidth={1.8} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
