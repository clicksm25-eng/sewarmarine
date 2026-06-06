import Hero from "@/components/sections/Hero";
import AboutTeaser from "@/components/sections/AboutTeaser";
import ActivitiesPin from "@/components/sections/ActivitiesPin";
import GalleryMosaic from "@/components/sections/GalleryMosaic";
import CtaSection from "@/components/sections/CtaSection";
import { galleryImages } from "@/data/gallery";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <ActivitiesPin />
      <GalleryMosaic images={galleryImages} limit={5} showLink={true} />
      <CtaSection />
    </>
  );
}
