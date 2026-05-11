"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BlurText from "@/components/BlurText";
import { Poppins } from "next/font/google";

const poppinsFont = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export default function AnimatedIntro() {
    const wordDelayMs = 10; // yanada darrov chiqib kelishi uchun 10ms

    const text1 = "Men Islombek Botirov, 6 yil davomida turli sohalardagi brendlar uchun qadoq dizayni yaratish bilan shug‘ullanaman.";
    const text2 = "Maqsadim mahsulotingiz xaridor qo‘lida ajralib turishi, esda qolishi va brendingizni to‘liq ifodalashiga yordam berish.";

    const text1WordsCount = text1.split(' ').length;
    const initialDelay2 = text1WordsCount * wordDelayMs;

    const handRef = useRef<HTMLDivElement>(null);
    const [showHand, setShowHand] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShowHand(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (handRef.current) {
            observer.observe(handRef.current);
        }
        return () => observer.disconnect();
    }, []);

    return (
        <div className="theme-light-intro w-full bg-[#242424] flex items-start justify-center overflow-hidden relative">
            <div className={`relative w-full max-w-[1920px] pl-4 md:pl-10 lg:pl-[70px] xl:pl-[134px] 2xl:pl-[182px] pr-4 md:pr-12 lg:pr-24 xl:pr-40 2xl:pr-56 py-4 md:py-8 text-white flex flex-row items-center justify-between gap-6 ${poppinsFont.className}`}>

                {/* Left Text side */}
                <div className="relative z-10 w-full md:w-[60%] lg:w-[55%] flex flex-col gap-2 md:gap-4 tracking-wide">
                    <BlurText
                        text={text1}
                        delay={wordDelayMs}
                        animateBy="words"
                        direction="top"
                        className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-left leading-[1.3] font-light text-white mb-1 md:mb-2"
                    />

                    <BlurText
                        text={text2}
                        initialDelay={initialDelay2}
                        delay={wordDelayMs}
                        animateBy="words"
                        direction="top"
                        className="text-sm md:text-base lg:text-lg xl:text-xl text-left leading-[1.4] font-light text-white/70"
                    />
                </div>

                {/* Hand Image mapped to the right - with Scroll trigger */}
                <div ref={handRef} className="relative w-1/2 md:w-[40%] lg:w-[35%] flex items-center justify-end pointer-events-none z-0">
                    {showHand && (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/qol.svg`}
                            alt="Qo'l rasmi"
                            width={220}
                            height={220}
                            className="theme-signature-svg w-full max-w-[100px] lg:max-w-[160px] xl:max-w-[220px] h-auto object-contain drop-shadow-2xl opacity-40 lg:opacity-100"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
