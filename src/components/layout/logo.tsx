import Link from "next/link";

/** Two folded wings meet in a V; the open center stays legible at favicon sizes. */
export function LogoMark({ className }: { className?: string }) {
  return <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M3 5.5h7.3l7.4 17.2-3.5 5.8L3 5.5Z" fill="currentColor" />
    <path d="M20.1 5.5H29L19.7 25l-4.3-9.8 4.7-9.7Z" fill="currentColor" opacity=".65" />
  </svg>;
}
export function Logo() {
  return <Link href="/" className="logo" aria-label="Vesper.ai home"><LogoMark /><span>vesper<span className="logo-suffix">.ai</span></span></Link>;
}
