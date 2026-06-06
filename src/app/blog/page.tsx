"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    slug: "red-sea-fishing-guide",
    title: "دليل الصيد في البحر الأحمر — كل ما تحتاج معرفته",
    excerpt: "من أفضل مناطق الصيد إلى اختيار المعدات المناسبة — رحلتك المثالية تبدأ بمعرفة البحر.",
    date: "١٠ مايو ٢٠٢٦",
    image: "https://sewarmarine.com/wp-content/uploads/2026/03/trolling-bahamas.webp",
  },
  {
    slug: "snorkeling-coral-reefs",
    title: "الشعاب المرجانية في البحر الأحمر — جنة تحت الماء",
    excerpt: "استكشف أجمل الشعاب المرجانية في العالم على بُعد أمتار من الساحل السعودي.",
    date: "٢٢ أبريل ٢٠٢٦",
    image: "https://sewarmarine.com/wp-content/uploads/2026/03/jpg.webp",
  },
  {
    slug: "sunset-sailing-experience",
    title: "إبحار الغروب — تجربة تصنعها مرة واحدة في العمر",
    excerpt: "حين يلتقي ذهب الشمس بزرقة البحر، تتحول كل لحظة إلى ذكرى لا تُنسى.",
    date: "٥ أبريل ٢٠٢٦",
    image: "https://sewarmarine.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-04-at-10.22.23-PM-2.jpeg",
  },
];

function PostTeaser({ post, index }: { post: typeof posts[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <article ref={ref}>
      {index > 0 && <div className="divider mb-16" />}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start mb-16">
        <div className="lg:col-span-3 relative h-64 lg:h-80 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            unoptimized
          />
        </div>
        <div className="lg:col-span-2 flex flex-col justify-center">
          <p className="text-[#4a5568] text-xs tracking-[0.2em] uppercase mb-4">{post.date}</p>
          <h2
            className="font-bold text-[#e8e0d0] mb-4 leading-tight"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
          >
            {post.title}
          </h2>
          <p className="text-[#4a5568] leading-relaxed font-light mb-6">{post.excerpt}</p>
          <Link href={`/blog/${post.slug}`} className="gold-link text-[#c9a86c] text-sm tracking-widest uppercase">
            اقرأ المزيد
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function BlogPage() {
  return (
    <>
      <div className="pt-32 pb-16 px-8 lg:px-20">
        <p className="text-[#c9a86c] tracking-[0.3em] text-xs uppercase mb-4">القصص والمقالات</p>
        <h1
          className="leading-tight"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          <span className="font-thin text-[#e8e0d0]">من </span>
          <span className="font-bold text-[#e8e0d0]">المدونة</span>
        </h1>
      </div>

      <div className="divider mx-8 lg:mx-20 mb-16" />

      <div className="px-8 lg:px-20 pb-24">
        {posts.map((post, i) => (
          <PostTeaser key={post.slug} post={post} index={i} />
        ))}
      </div>
    </>
  );
}
