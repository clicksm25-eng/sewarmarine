"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { activities } from "@/data/activities";

gsap.registerPlugin(ScrollTrigger);

export default function ActivitiesPin() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const panels = trackRef.current!.querySelectorAll(".activity-panel");
      const totalWidth = (panels.length - 1) * 100;

      const tween = gsap.to(trackRef.current, {
        x: () => `-${totalWidth}vw`,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: "top top",
        end: () => `+=${totalWidth * 10}`,
        pin: true,
        animation: tween,
        scrub: 1,
        anticipatePin: 1,
      });

      return () => {};
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* Section header */}
      <div className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="divider mb-12" />
        <p className="text-[#c9a86c] tracking-[0.25em] text-xs uppercase mb-4">
          ما نقدمه
        </p>
        <h2
          className="leading-tight"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          <span className="font-thin text-[#e8e0d0]">أنشطتنا </span>
          <span className="font-bold text-[#e8e0d0]">البحرية</span>
        </h2>
      </div>

      {/* Horizontal scroll section (desktop) / vertical stack (mobile) */}
      <div ref={sectionRef} className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex md:flex-row flex-col"
          style={{ width: `${activities.length * 100}vw` }}
        >
          {activities.map((activity, i) => (
            <div
              key={activity.id}
              className="activity-panel relative w-screen h-screen flex-shrink-0 md:h-screen h-[80vw] min-h-[500px]"
            >
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08111f]/80 via-[#08111f]/30 to-transparent" />
              <div className="absolute bottom-0 right-0 left-0 p-12 lg:p-20">
                <p className="text-[#c9a86c] tracking-[0.3em] text-xs uppercase mb-4">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="font-bold text-[#e8e0d0] mb-4 leading-tight"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                >
                  {activity.title}
                </h3>
                <p className="text-[#e8e0d0]/70 text-lg font-light max-w-lg mb-8 leading-relaxed">
                  {activity.description}
                </p>
                <Link href="/activities" className="gold-link text-[#c9a86c] tracking-widest text-sm uppercase">
                  احجز الآن
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
