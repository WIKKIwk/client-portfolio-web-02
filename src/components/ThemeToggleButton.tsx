"use client";

import { Moon, SunMedium } from "lucide-react";
import { motion } from "framer-motion";

const STORAGE_KEY = "qadoq-theme";
type ThemeMode = "day" | "night";
type ThemeToggleButtonProps = {
  placement?: "fixed" | "inline";
  className?: string;
};

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle("dark", theme === "night");
  document.documentElement.style.colorScheme = theme === "night" ? "dark" : "light";
}

export default function ThemeToggleButton({ placement = "fixed", className = "" }: ThemeToggleButtonProps) {
  const toggleTheme = () => {
    const currentTheme =
      document.documentElement.dataset.theme === "day" ? "day" : "night";
    const nextTheme: ThemeMode = currentTheme === "night" ? "day" : "night";

    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  };
  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label="Kunduzgi va tungi theme almashtirish"
      title="Theme"
      initial={{ opacity: 0, y: 18, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileTap={{ scale: 0.92, y: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={[
        "group inline-flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-black/20 text-white shadow-[0_10px_26px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition will-change-transform hover:border-white/20 hover:bg-black/25 hover:shadow-[0_14px_30px_rgba(0,0,0,0.42)]",
        placement === "fixed"
          ? "fixed right-4 md:right-7 bottom-20 md:bottom-24 z-[90] h-10 w-10 md:h-11 md:w-11"
          : "relative h-10 w-10 md:h-11 md:w-11 shrink-0",
        className,
      ].join(" ")}
    >
      <SunMedium className="theme-icon-day absolute h-4 w-4 md:h-[18px] md:w-[18px]" strokeWidth={1.8} />
      <Moon className="theme-icon-night absolute h-4 w-4 md:h-[18px] md:w-[18px]" strokeWidth={1.8} />
    </motion.button>
  );
}
