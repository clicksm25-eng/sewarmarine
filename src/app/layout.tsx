import type { Metadata } from "next";
import { Tajawal, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "سوار البحر — رحلات بحرية فاخرة في البحر الأحمر",
  description:
    "اكتشف البحر الأحمر كما لم تعهده من قبل. رحلات صيد، سنوركلينج، نزهات فاخرة وإبحار غروب مع سوار البحر.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${playfair.variable}`}
    >
      <body>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
