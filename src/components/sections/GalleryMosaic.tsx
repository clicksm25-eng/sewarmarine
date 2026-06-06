"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GalleryMosaicProps {
  images: string[];
  limit?: number;
  showLink?: boolean;
}

export default function GalleryMosaic({
  images,
  limit = 5,
  showLink = true,
}: GalleryMosaicProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const preview = images.slice(0, limit);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll(".mosaic-item");
    gsap.fromTo(
      items,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section className="py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {showLink && (
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#c9a86c] tracking-[0.25em] text-xs uppercase mb-3">
                من خلف العدسة
              </p>
              <h2
                className="leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                <span className="font-thin text-[#e8e0d0]">معرض </span>
                <span className="font-bold text-[#e8e0d0]">الصور</span>
              </h2>
            </div>
            <Link href="/media" className="gold-link text-[#c9a86c] tracking-widest text-sm uppercase hidden md:block">
              عرض الكل
            </Link>
          </div>
        )}

        <div
          ref={sectionRef}
          className="grid grid-cols-12 auto-rows-[200px] gap-2"
          style={{ gridAutoFlow: "dense" }}
        >
          {preview.map((src, i) => {
            const spans = [
              "col-span-8 row-span-2",
              "col-span-4 row-span-1",
              "col-span-4 row-span-1",
              "col-span-6 row-span-2",
              "col-span-6 row-span-2",
            ];
            return (
              <div
                key={i}
                className={`mosaic-item relative overflow-hidden ${spans[i] ?? "col-span-4 row-span-1"}`}
              >
                <Image
                  src={src}
                  alt={`معرض سوار البحر ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-[#08111f]/20 hover:bg-[#08111f]/0 transition-colors duration-500" />
              </div>
            );
          })}
        </div>

        {showLink && (
          <div className="flex justify-center mt-8 md:hidden">
            <Link href="/media" className="gold-link text-[#c9a86c] tracking-widest text-sm uppercase">
              عرض الكل
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
