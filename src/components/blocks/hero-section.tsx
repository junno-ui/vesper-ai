import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "./hero-background";

export function HeroSection() {
  return <section className="landing-hero" id="top" aria-labelledby="hero-title">
    <HeroBackground />
    <div className="hero-content">
      <a className="hero-announcement appear" href="#benefits"><Sparkles size={13} aria-hidden="true" /><span>Meet your next team member</span><ArrowUpRight size={13} aria-hidden="true" /></a>
      <h1 id="hero-title" className="appear">Your workflows.<br />A little more <em>intelligent.</em></h1>
      <p className="hero-description appear">AI agents that learn your processes and take care of the everyday.<br className="desktop-break" /> So your team can get back to what comes next.</p>
      <div className="hero-buttons appear"><Button asChild><Link href="#benefits">Build your first agent<ArrowUpRight size={16} aria-hidden="true" /></Link></Button><Link className="hero-demo-link" href="/experience#demo"><span><Play size={12} fill="currentColor" aria-hidden="true" /></span>See how it works</Link></div>
      <p className="hero-reassurance"><Check size={12} aria-hidden="true" />Try the interactive demo. No account needed.</p>
    </div>
    <div className="hero-bottom"><a href="#benefits" className="scroll-cue"><ArrowDown size={14} aria-hidden="true" /><span>A better way to get things done</span></a><span className="hero-caption">Your judgment. Vesper’s follow-through.</span></div>
  </section>;
}
