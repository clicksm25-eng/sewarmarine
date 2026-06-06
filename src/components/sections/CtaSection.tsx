"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".cta-reveal"),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative py-36 px-6 overflow-hidden bg-[#08111f]">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 60px, #c9a86c 60px, #c9a86c 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, #c9a86c 60px, #c9a86c 61px)",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="cta-reveal text-[#c9a86c] tracking-[0.3em] text-xs uppercase mb-8">
          ابدأ رحلتك
        </p>
        <h2
          className="cta-reveal leading-tight mb-12"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          <span className="block font-thin text-[#e8e0d0]">هل أنت مستعد</span>
          <span className="block font-bold text-[#e8e0d0]">للإبحار؟</span>
        </h2>
        <Link
          href="/contact"
          className="cta-reveal inline-block relative text-xl text-[#c9a86c] group tracking-wide"
        >
          اطلب عرض سعر الآن
          <span className="absolute bottom-0 right-0 w-full h-px bg-[#c9a86c] origin-right transition-transform duration-500 group-hover:scale-x-0" />
          <span className="absolute bottom-0 left-0 w-full h-px bg-[#c9a86c] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
        </Link>
      </div>
    </section>
  );
}
