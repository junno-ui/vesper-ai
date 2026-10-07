import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return <main id="main-content" className="empty-page"><p>404</p><h1>This page is out of orbit.</h1><p>Let’s get you back to Vesper.</p><Button asChild><Link href="/">Back to home</Link></Button></main>;
}
