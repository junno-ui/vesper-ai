import Link from "next/link";
import { ArrowUpRight, Check, Cable, ShieldCheck, Workflow } from "lucide-react";
import { features, steps, faqs, plans } from "@/data/content";
import ScrollFloat from "@/components/animations/scroll-float/ScrollFloat";
import ScrollReveal from "@/components/animations/scroll-reveal/ScrollReveal";
import ScrollStack, { ScrollStackItem } from "@/components/animations/scroll-stack/ScrollStack";
import ScrollExpand from "@/components/animations/scroll-expand/ScrollExpand";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WorkflowDemo } from "./workflow-demo";

const icons = { workflow: Workflow, control: ShieldCheck, connect: Cable };

export function BenefitsSection() {
  return <section className="section container" id="benefits">
    <div className="intro-grid"><p className="section-kicker">Built around your operations</p><ScrollReveal containerClassName="editorial-copy" baseOpacity={.25} enableBlur blurStrength={3} baseRotation={1} wordAnimationEnd="center center">The best work needs your judgment. The repetitive work needs a better system.</ScrollReveal></div>
    <div className="feature-grid">{features.map(feature => { const Icon = icons[feature.icon as keyof typeof icons]; return <article key={feature.title}><Icon size={25} strokeWidth={1.3} aria-hidden="true"/><h2>{feature.title}</h2><p>{feature.description}</p></article>; })}</div>
  </section>;
}

export function DemoSection() {
  return <section className="section container" id="demo"><div className="section-head"><ScrollFloat containerClassName="display-heading" animationDuration={1} ease="back.inOut(2)" scrollStart="top bottom-=10%" scrollEnd="center center" stagger={.03}>From request to resolution.</ScrollFloat><p>A little context. A clear process. An agent that keeps things moving, with you in the loop.</p></div><WorkflowDemo /></section>;
}

export function ProcessSection() {
  return <section className="section container" id="how-it-works"><div className="section-head"><p className="section-kicker">How it works</p><h2 className="display-heading">Your next agent starts here.</h2></div><ScrollStack stackPosition={112} itemDistance={100}>{steps.map((step, index) => { const Icon = icons[step.icon as keyof typeof icons]; return <ScrollStackItem key={step.title}><article className="process-card"><div className="process-copy"><span className="process-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p><div className="process-tags">{step.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><div className="process-visual" aria-hidden="true"><div className="process-orbit"><Icon size={42} strokeWidth={1} /></div><div className="process-detail"><span className="status-dot" />{step.detail}</div></div></article></ScrollStackItem>; })}</ScrollStack></section>;
}

export function ShowcaseSection() {
  return <ScrollExpand src="/images/hero.jpg" title="More space for what’s next."><p>Make room for the ideas, decisions, and conversations only your team can bring.</p></ScrollExpand>;
}

export function PricingSection() {
  return <section className="section container" id="pricing"><div className="pricing-layout"><div><p className="section-kicker">Simple by design</p><h2 className="display-heading">Start small.<br />Build from there.</h2><p className="muted pricing-note">Illustrative plans for this template. Both options open the free workflow demo; no payment is collected.</p></div><div className="pricing-grid">{plans.map(plan => <article className="plan" key={plan.name}><h3>{plan.name}</h3><p className="plan-price">{plan.price}<span>/ month</span></p><p>{plan.description}</p><Button asChild variant={plan.name === "Explore" ? "outline" : "default"}><a href="#start">{plan.action}</a></Button><ul>{plan.features.map(feature => <li key={feature}><Check size={15} aria-hidden="true" />{feature}</li>)}</ul></article>)}</div></div></section>;
}

export function FaqSection() {
  return <section className="section container faq-layout" id="faqs"><div><p className="section-kicker">Good to know</p><h2 className="display-heading">A little clarity.</h2></div><Accordion type="single" collapsible>{faqs.map((faq, index) => <AccordionItem key={faq.question} value={`faq-${index}`}><AccordionTrigger>{faq.question}</AccordionTrigger><AccordionContent>{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></section>;
}

export function CtaSection() {
  return <section className="section container final-cta"><ScrollFloat containerClassName="display-heading" ease="power3.out" stagger={.018} scrollStart="top bottom-=10%" scrollEnd="center center">Give good work more room.</ScrollFloat><p>Start with one workflow. See where it takes you.</p><Button asChild><Link href="#start">Try your first workflow<ArrowUpRight size={16} aria-hidden="true" /></Link></Button></section>;
}
