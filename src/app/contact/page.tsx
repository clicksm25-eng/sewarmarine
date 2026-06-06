"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".contact-reveal"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out", delay: 0.4 }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} className="min-h-screen pt-28 pb-20 px-6 lg:px-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[80vh]">

        {/* Right — Contact info */}
        <div className="contact-reveal flex flex-col justify-center pr-0 lg:pr-20 order-2 lg:order-1 py-12 px-6 lg:px-12 border-l border-[#c9a86c]/15">
          <p className="text-[#c9a86c] tracking-[0.3em] text-xs uppercase mb-6">تواصل معنا</p>
          <h1
            className="leading-tight mb-12"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            <span className="font-thin text-[#e8e0d0] block">هل لديك</span>
            <span className="font-bold text-[#e8e0d0] block">تساؤلات؟</span>
          </h1>

          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-[0.2em] text-[#c9a86c] uppercase mb-2">الموقع</p>
              <p className="text-[#4a5568] text-lg font-light">مرسى ثول، ثول، المملكة العربية السعودية</p>
            </div>
            <div className="divider" />
            <div>
              <p className="text-xs tracking-[0.2em] text-[#c9a86c] uppercase mb-2">واتساب</p>
              <a
                href="https://wa.me/966500000000"
                className="gold-link text-[#e8e0d0] text-lg font-light"
              >
                تواصل عبر واتساب
              </a>
            </div>
            <div className="divider" />
            <div>
              <p className="text-xs tracking-[0.2em] text-[#c9a86c] uppercase mb-2">ساعات العمل</p>
              <p className="text-[#4a5568] text-lg font-light">يومياً — ٧ صباحاً حتى ١٠ مساءً</p>
            </div>
          </div>
        </div>

        {/* Left — Form */}
        <div className="contact-reveal flex flex-col justify-center order-1 lg:order-2 py-12 px-6 lg:px-12">
          {submitted ? (
            <div className="text-center">
              <div className="w-px h-20 bg-[#c9a86c] mx-auto mb-8" />
              <h2 className="text-3xl font-thin text-[#e8e0d0] mb-4">شكراً لتواصلك</h2>
              <p className="text-[#4a5568]">سنرد عليك في أقرب وقت ممكن</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md w-full">
              <h2
                className="font-thin text-[#e8e0d0] mb-10 leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
              >
                أرسل رسالتك
              </h2>

              <div className="form-field">
                <input type="text" id="name" placeholder=" " required />
                <label htmlFor="name">الاسم الكامل</label>
              </div>

              <div className="form-field">
                <input type="tel" id="phone" placeholder=" " required />
                <label htmlFor="phone">رقم الهاتف</label>
              </div>

              <div className="form-field">
                <input type="email" id="email" placeholder=" " />
                <label htmlFor="email">البريد الإلكتروني (اختياري)</label>
              </div>

              <div className="form-field">
                <textarea id="message" rows={4} placeholder=" " />
                <label htmlFor="message">رسالتك</label>
              </div>

              <button
                type="submit"
                className="relative text-[#c9a86c] text-lg tracking-wide group mt-4"
              >
                إرسال الطلب
                <span className="absolute bottom-0 right-0 w-full h-px bg-[#c9a86c] origin-right transition-transform duration-500 group-hover:scale-x-0" />
                <span className="absolute bottom-0 left-0 w-full h-px bg-[#c9a86c] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
