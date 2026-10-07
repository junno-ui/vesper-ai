import { HeroSection } from "@/components/blocks/hero-section";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { InteractiveFeatures } from "@/components/blocks/interactive-features";
import { ProcessSection, PricingSection, FaqSection, CtaSection } from "@/components/blocks/experience-sections";
export default function HomePage() {
  return <><Header sticky /><main id="main-content"><HeroSection /><InteractiveFeatures /><ProcessSection /><PricingSection /><FaqSection /><CtaSection /></main><Footer /></>;
}
