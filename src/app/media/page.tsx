"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { galleryImages } from "@/data/gallery";

gsap.registerPlugin(ScrollTrigger);

const colSpans = [
  "col-span-8 row-span-2",
  "col-span-4 row-span-1",
  "col-span-4 row-span-1",
  "col-span-5 row-span-2",
  "col-span-7 row-span-1",
  "col-span-6 row-span-1",
  "col-span-6 row-span-2",
  "col-span-6 row-span-2",
  "col-span-4 row-span-1",
  "col-span-4 row-span-1",
  "col-span-4 row-span-1",
];

export default function MediaPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".gallery-item");
    gsap.fromTo(
      items,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-16 px-8 lg:px-20">
        <p className="text-[#c9a86c] tracking-[0.3em] text-xs uppercase mb-4">اللحظات المميزة</p>
        <h1
          className="leading-tight"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          <span className="font-thin text-[#e8e0d0]">معرض </span>
          <span className="font-bold text-[#e8e0d0]">الوسائط</span>
        </h1>
      </div>

      <div className="divider mx-8 lg:mx-20 mb-12" />

      {/* Mosaic grid */}
      <div className="px-4 lg:px-8 pb-24">
        <div
          ref={gridRef}
          className="grid grid-cols-12 auto-rows-[180px] gap-2"
          style={{ gridAutoFlow: "dense" }}
        >
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className={`gallery-item relative overflow-hidden cursor-pointer group ${
                colSpans[i] ?? "col-span-4 row-span-1"
              }`}
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={src}
                alt={`لقطة ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-[#08111f]/20 group-hover:bg-[#08111f]/0 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={galleryImages.map((src) => ({ src }))}
        styles={{ container: { backgroundColor: "rgba(8,17,31,0.97)" } }}
      />
    </>
  );
}
