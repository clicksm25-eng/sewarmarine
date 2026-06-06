"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      textRef.current.querySelectorAll(".hero-line"),
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" }
    );
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full-bleed background image with Ken Burns */}
      <div className="absolute inset-0">
        <Image
          src="https://sewarmarine.com/wp-content/uploads/2026/02/IMG_0023.jpg"
          alt="البحر الأحمر — سوار البحر"
          fill
          priority
          className="object-cover ken-burns"
          unoptimized
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08111f] via-[#08111f]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08111f]/60 to-transparent" />

      {/* Content */}
      <div ref={textRef} className="absolute inset-0 flex flex-col justify-end pb-24 px-8 lg:px-20">
        <p className="hero-line text-[#c9a86c] tracking-[0.3em] text-sm font-light mb-4 uppercase">
          عِش معنا متعة بحرية لا تُنسى
        </p>
        <h1
          className="hero-line leading-[0.9] mb-8"
          style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
        >
          <span className="block font-thin text-[#e8e0d0]">خُض تجربة</span>
          <span className="block font-bold text-[#e8e0d0]">بحرية لا مثيل لها</span>
        </h1>
        <div className="hero-line flex items-center gap-6">
          <Link
            href="/contact"
            className="relative text-[#c9a86c] text-lg tracking-wide group"
          >
            اطلب عرض سعر
            <span className="absolute bottom-0 right-0 w-full h-px bg-[#c9a86c] origin-right transition-transform duration-300 group-hover:scale-x-0" />
            <span className="absolute bottom-0 left-0 w-full h-px bg-[#c9a86c] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <span className="text-[#4a5568] text-sm hidden sm:block">
            مرسى ثول، ثول، المملكة العربية السعودية
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <div className="w-px h-12 bg-[#c9a86c] animate-pulse" />
      </div>
    </section>
  );
}
