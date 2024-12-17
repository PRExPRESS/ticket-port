'use client';
import Image from "next/image";
import HeroSection from "../components/Hero";
import FeatureEvents from "../components/featureEvents/FeatureEvents";
import CategoriesSection from "../components/Categories";
import HowToBuySection from "../components/HowToBuy";

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
