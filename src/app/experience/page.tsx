import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BenefitsSection, DemoSection, ProcessSection, ShowcaseSection, PricingSection, FaqSection, CtaSection } from "@/components/blocks/experience-sections";

export const metadata: Metadata = { title: "Explore the experience", description: "See how Vesper turns repeatable tasks into clear, human-guided workflows. Try the interactive agent demo." };

export default function ExperiencePage() {
  return <><Header sticky /><main id="main-content"><div className="experience-intro container"><p className="section-kicker">The Vesper experience</p><h1>Less repetition.<br />More possibility.</h1><p>Your team knows how the work gets done.<br />Give that knowledge a way to move.</p><a className="text-link" href="#demo">Explore a workflow <span aria-hidden="true">↗</span></a></div><BenefitsSection /><DemoSection /><ProcessSection /><ShowcaseSection /><PricingSection /><FaqSection /><CtaSection /></main><Footer /></>;
}
