"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      imgRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    gsap.fromTo(
      textRef.current?.querySelectorAll(".reveal-text") ?? [],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
          {/* Image bleeds to edge on left */}
          <div
            ref={imgRef}
            className="relative h-[500px] lg:h-[700px] lg:-mr-12 order-2 lg:order-1"
          >
            <Image
              src="https://sewarmarine.com/wp-content/uploads/2026/02/IMG_1910.jpg"
              alt="تجربة سوار البحر"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#08111f]/20 to-transparent" />
          </div>

          {/* Text */}
          <div ref={textRef} className="pr-0 lg:pr-16 order-1 lg:order-2 mb-10 lg:mb-0">
            <p className="reveal-text text-[#c9a86c] tracking-[0.25em] text-xs uppercase mb-6">
              من نحن
            </p>
            <h2
              className="reveal-text leading-tight mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              <span className="block font-thin text-[#e8e0d0]">اكتشف البحر الأحمر</span>
              <span className="block font-bold text-[#e8e0d0]">كما لم تعهده</span>
              <span className="block font-thin text-[#c9a86c]">من قبل</span>
            </h2>
            <p className="reveal-text text-[#4a5568] leading-relaxed text-lg font-light mb-10 max-w-lg">
              مع رحلاتنا الخاصة والفاخرة. سواء كنت تبحث عن إثارة الصيد الوفير، أو استكشاف الشعاب المرجانية النابضة بالحياة، أو ببساطة الاستمتاع بتناول الطعام تحت أشعة الشمس — نحن نوفر لك التجربة البحرية الأسمى بلمسة من الضيافة السعودية الأصيلة.
            </p>
            <Link href="/about" className="reveal-text gold-link text-[#c9a86c] tracking-widest text-sm uppercase">
              اعرف أكثر
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
