"use client";

import { useState, useRef, useEffect } from "react";
import Counter from "@/components/Counter";

interface AnimatedCounterProps {
  targetValue: number;
  fontSize?: number;
  places: number[];
  fontWeight?: string;
}

export default function AnimatedCounter({ targetValue, fontSize = 60, places, fontWeight = "inherit" }: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setValue(targetValue);
        observer.disconnect();
      }
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetValue]);

  return (
    <div ref={ref} className="flex items-center">
      <Counter
        value={value}
        fontSize={fontSize}
        places={places}
        textColor="white"
        fontWeight={fontWeight}
        gradientHeight={0}
      />
    </div>
  );
}
