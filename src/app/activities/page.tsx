"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { activities } from "@/data/activities";

gsap.registerPlugin(ScrollTrigger);

function ActivitySection({
  activity,
  index,
}: {
  activity: (typeof activities)[0];
  index: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const img = sectionRef.current.querySelector(".act-img");
    const content = sectionRef.current.querySelectorAll(".act-content");

    gsap.fromTo(
      img,
      { scale: 1.1 },
      {
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );

    gsap.fromTo(
      content,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[90vh] overflow-hidden">
      <div className="act-img absolute inset-0">
        <Image
          src={activity.image}
          alt={activity.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#08111f]/85 via-[#08111f]/30 to-transparent" />
      <div className="absolute bottom-0 right-0 left-0 p-12 lg:p-20">
        <p className="act-content text-[#c9a86c] tracking-[0.35em] text-xs uppercase mb-4">
          {String(index + 1).padStart(2, "0")} — الأنشطة
        </p>
        <h2
          className="act-content font-bold text-[#e8e0d0] mb-5 leading-tight"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
        >
          {activity.title}
        </h2>
        <p className="act-content text-[#e8e0d0]/70 text-lg font-light max-w-xl mb-8 leading-relaxed">
          {activity.description}
        </p>
        <Link
          href="/contact"
          className="act-content gold-link text-[#c9a86c] tracking-widest text-sm uppercase"
        >
          احجز الآن
        </Link>
      </div>
    </section>
  );
}

export default function ActivitiesPage() {
  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-16 px-8 lg:px-20">
        <p className="text-[#c9a86c] tracking-[0.3em] text-xs uppercase mb-4">ما نقدمه</p>
        <h1
          className="leading-tight"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          <span className="font-thin text-[#e8e0d0]">أنشطتنا </span>
          <span className="font-bold text-[#e8e0d0]">البحرية</span>
        </h1>
      </div>

      <div className="divider mx-8 lg:mx-20 mb-0" />

      {/* Activity sections */}
      {activities.map((activity, i) => (
        <ActivitySection key={activity.id} activity={activity} index={i} />
      ))}
    </>
  );
}
