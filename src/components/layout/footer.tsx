import Link from "next/link";
import { Logo } from "./logo";
export function Footer() {
  return <footer className="site-footer container"><Logo /><p>A Junno UI template. Sample product and data.</p><Link href="/">Back to home</Link><a href="https://junno-ui.com/" target="_blank" rel="noreferrer">Made by Junno UI</a></footer>;
}
