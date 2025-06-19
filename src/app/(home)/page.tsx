'use client';

import CategoriesSection from "@/components/Categories";
import FeatureEvents from "@/components/featureEvents/FeatureEvents";
import HeroSection from "@/components/Hero";
import HowToBuySection from "@/components/HowToBuy";


export default function Home() {
  return (
    <div className="w-full h-full">
      <HeroSection />
      <FeatureEvents />
      <CategoriesSection />
      <HowToBuySection />
    </div>
  );
}
