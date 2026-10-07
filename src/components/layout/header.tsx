"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import { navigation } from "@/data/content";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function Header({ sticky = false }: { sticky?: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const media = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    const update = () => {
      setScrolled(window.scrollY > 24);
      let current = "";
      for (const item of navigation) {
        const id = item.href.split("#")[1];
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top < window.innerHeight * .45) current = id;
      }
      setActive(current);
    };
    const frame = requestAnimationFrame(update);
    media.addEventListener("change", closeOnDesktop);
    window.addEventListener("scroll", update, { passive: true });
    return () => { cancelAnimationFrame(frame); media.removeEventListener("change", closeOnDesktop); window.removeEventListener("scroll", update); };
  }, [pathname]);
  const destination = (href: string) => pathname === "/" ? href.slice(1) : href;
  return <header className={`site-header ${sticky ? "site-header--sticky" : ""}`} data-scrolled={scrolled}>
    <div className="nav-shell"><Logo />
      <nav className="desktop-nav" aria-label="Primary">{navigation.map(item => <Link className="nav-link" aria-current={active === item.href.split("#")[1] ? "location" : undefined} key={item.label} href={destination(item.href)}>{item.label}</Link>)}</nav>
      <div className="header-actions">
        <Button asChild className="header-cta"><Link href={pathname === "/" ? "#benefits" : "/#benefits"}>Try Vesper<ArrowUpRight size={14} aria-hidden="true" /></Link></Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild><Button className="menu-toggle" variant="ghost" size="icon" aria-label="Open menu"><Menu aria-hidden="true" /></Button></SheetTrigger>
          <SheetContent className="mobile-menu" side="right">
            <SheetTitle className="sr-only">Vesper navigation</SheetTitle>
            <SheetDescription className="sr-only">Explore the product, try a workflow, or find answers.</SheetDescription>
            <div className="mobile-menu-brand"><Logo /><p>A little less busy.<br />A lot more possible.</p></div>
            <nav aria-label="Mobile navigation">{navigation.map(item => <SheetClose asChild key={item.label}><Link className="mobile-nav-link" href={destination(item.href)}>{item.label}<ArrowUpRight size={20} aria-hidden="true" /></Link></SheetClose>)}</nav>
            <SheetClose asChild><Button asChild><Link href="/experience#demo">Explore the workflow demo</Link></Button></SheetClose>
            <span className="mobile-menu-note">Built around the way you work.</span>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>;
}
