import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/activities", label: "الأنشطة" },
  { href: "/media", label: "الوسائط" },
  { href: "/blog", label: "المدونة" },
  { href: "/contact", label: "التواصل" },
];

export default function Footer() {
  return (
    <footer className="bg-[#08111f] pt-16 pb-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-10">
          <Link href="/">
            <Image
              src="https://sewarmarine.com/wp-content/uploads/2024/07/%D8%B4%D8%B9%D8%A7%D8%B1_%D8%B3%D9%88%D8%A7%D8%B1-removebg-preview.png"
              alt="سوار البحر"
              width={140}
              height={56}
              className="object-contain"
              unoptimized
            />
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="gold-link text-sm text-[#4a5568] hover:text-[#c9a86c] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="divider mb-8" />

        <p className="text-center text-sm text-[#4a5568]">
          © 2026 سوار البحر — جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}
