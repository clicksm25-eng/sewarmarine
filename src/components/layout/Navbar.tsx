"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/activities", label: "الأنشطة" },
  { href: "/media", label: "الوسائط" },
  { href: "/blog", label: "المدونة" },
  { href: "/contact", label: "التواصل" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-md bg-[#08111f]/70 border-b border-[#c9a86c]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://sewarmarine.com/wp-content/uploads/2024/07/%D8%B4%D8%B9%D8%A7%D8%B1_%D8%B3%D9%88%D8%A7%D8%B1-removebg-preview.png"
              alt="سوار البحر"
              width={120}
              height={48}
              className="object-contain"
              unoptimized
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="gold-link text-sm tracking-wide text-[#e8e0d0] hover:text-[#c9a86c] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="text-sm tracking-wide text-[#c9a86c] relative group">
              اطلب عرض سعر
              <span className="absolute bottom-0 right-0 w-full h-px bg-[#c9a86c] scale-x-100 origin-right" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="فتح القائمة"
          >
            <span className="w-6 h-px bg-[#e8e0d0] block" />
            <span className="w-4 h-px bg-[#e8e0d0] block" />
            <span className="w-6 h-px bg-[#e8e0d0] block" />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-[#08111f] flex flex-col justify-center items-end pr-10 transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          className="absolute top-6 left-6 text-[#e8e0d0] text-2xl"
          onClick={() => setMenuOpen(false)}
          aria-label="إغلاق القائمة"
        >
          ✕
        </button>
        <div className="flex flex-col items-end gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-4xl font-light text-[#e8e0d0] hover:text-[#c9a86c] transition-colors"
              style={{
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.4s ease ${i * 60}ms, opacity 0.4s ease ${i * 60}ms, color 0.3s`,
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-[#c9a86c] mt-4"
            style={{
              transitionDelay: menuOpen ? `${navLinks.length * 60}ms` : "0ms",
              opacity: menuOpen ? 1 : 0,
              transition: `opacity 0.4s ease ${navLinks.length * 60}ms`,
            }}
          >
            اطلب عرض سعر
          </Link>
        </div>
      </div>
    </>
  );
}
