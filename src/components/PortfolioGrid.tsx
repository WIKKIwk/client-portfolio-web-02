"use client";

import { useState, useEffect, useCallback, type KeyboardEvent as ReactKeyboardEvent } from "react";
import Image from "next/image";
import data from "@/lib/portfolioData.json";
import { portfolioProjects } from "@/lib/seo";
import FadeInItem from "@/components/FadeInItem";
import type { GalleryGroup } from "@/lib/galleryTypes";
import { AnimatePresence, motion } from "framer-motion";

type PortfolioData = Record<string, string[]>;
type PortfolioProject = (typeof portfolioProjects)[number];

type PortfolioGridProps = {
  akaGroups: GalleryGroup[];
};

type GalleryItem =
  | {
      id: string;
      title: string;
      cover: string;
      images: string[];
      kind: "aka";
    }
  | {
      id: string;
      title: string;
      cover: string;
      images: string[];
      kind: "project";
    };

const portfolioData = data as PortfolioData;
const ITEMS_VISIBLE = 6;
const STEP = 2;

function getBasePath() {
  return process.env.NEXT_PUBLIC_BASE_PATH || "";
}

function withBasePath(src: string) {
  return encodeURI(`${getBasePath()}${src}`);
}

function getProjectImages(project: PortfolioProject) {
  const projectImages = portfolioData[project.id] || [];
  return [project.image, ...projectImages].map(withBasePath);
}

export default function PortfolioGrid({ akaGroups }: PortfolioGridProps) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<{ src: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const akaItems: GalleryItem[] = akaGroups.map((group) => ({
    id: group.id,
    title: group.label,
    cover: group.cover,
    images: group.images,
    kind: "aka",
  }));

  const projectItems: GalleryItem[] = portfolioProjects.map((project) => ({
    id: project.id,
    title: project.name,
    cover: project.image,
    images: getProjectImages(project),
    kind: "project",
  }));

  const galleryItems = [...akaItems, ...projectItems];
  const maxStartIndex = Math.max(0, galleryItems.length - ITEMS_VISIBLE);
  const safeStartIndex = Math.min(startIndex, maxStartIndex);
  const visibleItems = galleryItems.slice(safeStartIndex, safeStartIndex + ITEMS_VISIBLE);

  const openLightbox = (item: GalleryItem) => {
    setImages(item.images.map((src) => ({ src: encodeURI(src) })));
    setCurrentIndex(0);
    setOpen(true);
  };

  const handleCardKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>, item: GalleryItem) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(item);
    }
  };

  const closeLightbox = useCallback(() => {
    setOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const nextPage = useCallback(() => {
    setStartIndex((prev) => Math.min(prev + STEP, maxStartIndex));
  }, [maxStartIndex]);

  const prevPage = useCallback(() => {
    setStartIndex((prev) => Math.max(prev - STEP, 0));
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key.toLowerCase() === "x") {
        closeLightbox();
      }
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, closeLightbox, nextImage, prevImage]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <div
        id="portfolio"
        className="w-full max-w-[1920px] px-6 md:px-12 lg:px-24 pt-4 md:pt-8 pb-12 md:pb-16 relative z-10"
      >
        <div className="relative">
          {galleryItems.length > ITEMS_VISIBLE && (
            <>
              <button
                type="button"
                onClick={prevPage}
                disabled={safeStartIndex === 0}
                className="absolute -left-6 md:-left-12 lg:-left-20 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center rounded-full border border-white/10 bg-black/75 backdrop-blur-sm p-3 md:p-4 text-gray-200 transition hover:bg-white/12 hover:text-white disabled:opacity-25 disabled:hover:bg-black/75"
                aria-label="Oldingi 2 ta ish"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 md:h-6 md:w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <button
                type="button"
                onClick={nextPage}
                disabled={safeStartIndex >= maxStartIndex}
                className="absolute -right-6 md:-right-12 lg:-right-20 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center rounded-full border border-white/10 bg-black/75 backdrop-blur-sm p-3 md:p-4 text-gray-200 transition hover:bg-white/12 hover:text-white disabled:opacity-25 disabled:hover:bg-black/75"
                aria-label="Keyingi 2 ta ish"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 md:h-6 md:w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </>
          )}

          <AnimatePresence mode="popLayout">
            <motion.div
              key={safeStartIndex}
              layout
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 relative z-10"
            >
              {visibleItems.map((item, index) => (
                <FadeInItem key={item.id} delay={index * 0.1}>
                  <div
                    onClick={() => openLightbox(item)}
                    onKeyDown={(event) => handleCardKeyDown(event, item)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${item.title} rasmlarini ochish`}
                    className="relative aspect-[4/5] w-full group cursor-pointer z-10 hover:z-50 transition-all duration-500"
                  >
                    <div className="absolute -inset-6 md:-inset-10 lg:-inset-12 z-0 opacity-0 group-hover:opacity-100 transition-all duration-[1000ms] ease-out pointer-events-none transform-gpu group-hover:scale-105">
                      <Image
                        src={item.cover}
                        alt=""
                        fill
                        quality={90}
                        className="object-cover blur-[50px] md:blur-[70px] saturate-200 opacity-80"
                      />
                    </div>

                    <div className="absolute inset-0 overflow-hidden rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.8)] z-10 border border-white/5 transition-colors duration-[800ms] group-hover:border-white/20 bg-[#000]">
                      <Image
                        src={item.cover}
                        alt={item.title}
                        fill
                        quality={90}
                        className="object-cover transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] grayscale group-hover:grayscale-0 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                </FadeInItem>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {open && images.length > 0 && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 backdrop-blur-2xl"
        >
          <button
            onClick={closeLightbox}
            className="fixed top-5 right-5 z-[110] text-gray-400 hover:text-white transition-all duration-200 bg-white/5 hover:bg-white/15 p-3 rounded-full border border-white/10"
            title="Yopish"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[110] text-gray-400 text-xs md:text-sm tracking-[0.3em] font-light select-none">
            {currentIndex + 1} / {images.length}
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex items-center justify-center w-full h-full px-16 md:px-24"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={currentIndex}
              src={images[currentIndex].src}
              alt={`Portfolio rasm ${currentIndex + 1}`}
              style={{
                maxWidth: "90vw",
                maxHeight: "85vh",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                animation: "fadeIn 0.25s ease",
              }}
              className="rounded-sm shadow-[0_0_80px_rgba(0,0,0,0.8)] select-none"
              draggable={false}
            />
          </div>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="fixed left-3 md:left-6 top-1/2 -translate-y-1/2 z-[110] text-gray-400 hover:text-white transition-all duration-200 bg-white/5 hover:bg-white/15 p-3 md:p-4 rounded-full border border-white/10"
              title="Oldingi"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-[110] text-gray-400 hover:text-white transition-all duration-200 bg-white/5 hover:bg-white/15 p-3 md:p-4 rounded-full border border-white/10"
              title="Keyingi"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
