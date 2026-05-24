import HeroSection from "@/components/home/HeroSection";
import FeatureStrip from "@/components/home/FeatureStrip";
import FeaturedCoursesSection from "@/components/home/FeaturedCoursesSection";
import TeachSection from "@/components/home/TeachSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureStrip />
      <FeaturedCoursesSection />
      {/* <TeachSection /> */}
      <TestimonialsSection />
    </>
  );
}