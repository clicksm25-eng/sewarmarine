"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 8, label: "سنوات من الخبرة" },
  { value: 500, label: "رحلة بحرية" },
  { value: 3000, label: "ضيف سعيد" },
];

function StatCounter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.val).toLocaleString("ar");
      },
    });
  }, [value]);

  return (
    <div className="text-center">
      <div className="stat-number">
        <span ref={ref}>0</span>
        <span className="text-[#c9a86c]">+</span>
      </div>
      <p className="text-[#4a5568] mt-2 text-sm tracking-wide">{label}</p>
    </div>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    gsap.fromTo(
      heroRef.current.querySelectorAll(".fade-up"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <>
      {/* Full-bleed opener */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src="https://sewarmarine.com/wp-content/uploads/2026/04/IMG_6146-scaled.jpg"
          alt="من نحن"
          fill
          priority
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08111f] via-[#08111f]/50 to-transparent" />
        <div ref={heroRef} className="absolute inset-0 flex flex-col justify-end pb-20 px-8 lg:px-20">
          <p className="fade-up text-[#c9a86c] tracking-[0.3em] text-xs uppercase mb-4">من نحن</p>
          <blockquote
            className="fade-up font-thin text-[#e8e0d0] leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            "نحن لا نبيع رحلات — نحن نصنع ذكريات"
          </blockquote>
        </div>
      </section>

      {/* Brand story */}
      <section className="py-24 px-6 lg:px-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#4a5568] leading-[2] text-lg font-light mb-6">
              اكتشف البحر الأحمر كما لم تعهده من قبل مع رحلاتنا الخاصة والفاخرة. سواء كنت تبحث عن إثارة الصيد الوفير، أو استكشاف الشعاب المرجانية النابضة بالحياة، أو ببساطة الاستمتاع بتناول الطعام تحت أشعة الشمس.
            </p>
            <p className="text-[#4a5568] leading-[2] text-lg font-light">
              نحن نوفر لك التجربة البحرية الأسمى بلمسة من الضيافة السعودية الأصيلة. فريقنا من الربابنة المحترفين يضمن لك أعلى معايير الأمان والراحة في كل رحلة.
            </p>
          </div>
          <div className="relative h-80 lg:h-[500px]">
            <Image
              src="https://sewarmarine.com/wp-content/uploads/2026/04/IMG_6153-scaled.jpg"
              alt="فريق سوار البحر"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 border-t border-[#c9a86c]/15">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
          {stats.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </div>
      </section>
    </>
  );
}
