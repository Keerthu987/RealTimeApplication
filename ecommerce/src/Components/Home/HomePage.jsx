import React from "react";
import HeroSection from "./HeroSection";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import FeaturedProducts from "./FeaturedProducts";
const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy Iphone 14 Pro"
        subtitle="Experience the ppower of latest iphone 14 with our most Pro camera ever"
        link="http://localhost:5173/product/686e465fa1208f85f5b33c92"
        image={iphone}
      />
      <FeaturedProducts />
      <HeroSection
        title="Build the ultimate setup"
        subtitle="You can add Studio Display and color-matching accessories to your bag after configure your Mac mini"
        link="/product/686e465fa1208f85f5b33c93"
        image={mac}
      />
    </div>
  );
};

export default HomePage;
