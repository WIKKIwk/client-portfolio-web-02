"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import BlurText from "@/components/BlurText";
import ShinyText from "@/components/ShinyText";
import { useEffect, useState } from "react";

const poppinsFont = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });
const shineDurationMs = 2500; // Har bir yaltirash 2.5 sekund
const overlapMs = 700; // Qancha vaqt oldin keyingisi boshlanishi
const intervalMs = shineDurationMs - overlapMs; // 1.8 sekundda navbatdagisi boshlanadi

export default function Hero() {
    const [actives, setActives] = useState([false, false, false, false]);

    useEffect(() => {
        // Funksiya bittasini yoqadi va 2.5s dan keyin o'chiradi
        const activate = (i: number) => {
            setActives(prev => {
                const next = [...prev];
                next[i] = true;
                return next;
            });
            setTimeout(() => {
                setActives(prev => {
                    const next = [...prev];
                    next[i] = false;
                    return next;
                });
            }, shineDurationMs);
        };

        let currentI = 0;
        activate(currentI);

        const loop = setInterval(() => {
            currentI = (currentI + 1) % 4;
            activate(currentI);
        }, intervalMs);

        return () => clearInterval(loop);
    }, []);

    return (
        <section className="relative w-full overflow-hidden bg-black flex flex-col items-center justify-center">
            <h1 className="sr-only">
                Qadoq dizayn va package design xizmatlari - Qadoqdizayn.uz
            </h1>

            <div className="absolute top-8 left-8 md:top-14 md:left-14 lg:top-16 lg:left-16 z-20 mix-blend-difference">
                <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo.svg`}
                    alt="Qadoqdizayn.uz logo"
                    width={160}
                    height={80}
                    className="w-[80px] md:w-[120px] lg:w-[160px] h-auto object-contain drop-shadow-lg"
                />
            </div>

            <nav aria-label="Asosiy bo'limlar" className="absolute top-0 right-0 pt-8 pr-6 md:pt-16 md:pr-16 lg:pt-20 pb-10 pl-20 z-20 flex items-start gap-6 md:gap-14 mix-blend-difference w-full justify-end font-light tracking-[0.05em] md:tracking-[0.1em] text-sm sm:text-base md:text-lg lg:text-xl">
                <a href="#asoschi" className="transition-transform duration-300 hover:scale-110 active:scale-95">
                    <ShinyText text="Asoschi" speed={shineDurationMs / 1000} disabled={!actives[0]} color="#9ca3af" shineColor="#ffffff" />
                </a>
                <a href="#portfolio" className="transition-transform duration-300 hover:scale-110 active:scale-95">
                    <ShinyText text="Portfolio" speed={shineDurationMs / 1000} disabled={!actives[1]} color="#9ca3af" shineColor="#ffffff" />
                </a>
                <a href="#takliflar" className="transition-transform duration-300 hover:scale-110 active:scale-95">
                    <ShinyText text="Takliflar" speed={shineDurationMs / 1000} disabled={!actives[2]} color="#9ca3af" shineColor="#ffffff" />
                </a>
                <a href="#boglanish" className="transition-transform duration-300 hover:scale-110 active:scale-95">
                    <ShinyText text="Bog'lanish" speed={shineDurationMs / 1000} disabled={!actives[3]} color="#9ca3af" shineColor="#ffffff" />
                </a>
            </nav>
            <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/gogo.webp`}
                alt="Islombek Botirov qadoq dizayn va package design portfolio rasmi"
                width={7996}
                height={4496}
                priority
                className="w-full h-auto brightness-75"
            />

            {/* LightRays – vaqtincha o'chirilgan
            <div className="absolute inset-0 z-[5] pointer-events-none">
                <LightRays
                    raysOrigin="right"
                    raysColor="#ffffff"
                    raysSpeed={0.7}
                    lightSpread={2}
                    rayLength={6}
                    fadeDistance={1.8}
                    saturation={1.2}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.18}
                    distortion={0}
                    pulsating={true}
                />
            </div>
            */}

            {/* Overlay Text */}
            <div className={`absolute inset-0 flex items-center justify-end pr-6 md:pr-12 lg:pr-[14px] xl:pr-[65px] pt-16 md:pt-24 lg:pt-32 z-10 ${poppinsFont.className}`}>
                <div className="flex flex-col items-start gap-1">
                    <BlurText
                        text="Dizayn orqali"
                        delay={50}
                        animateBy="words"
                        direction="top"
                        className="text-left leading-[1.1] tracking-wide text-gray-300 font-light text-[20px] md:text-[22px] lg:text-[26px] xl:text-[32px] drop-shadow-2xl"
                    />
                    <BlurText
                        text="qadriyatni qadoqlayman."
                        initialDelay={150}
                        delay={50}
                        animateBy="words"
                        direction="top"
                        className="text-left leading-[1.1] tracking-wide text-white font-semibold text-[24px] md:text-[28px] lg:text-[34px] xl:text-[42px] drop-shadow-2xl"
                    />
                </div>
            </div>
        </section>
    );
}
