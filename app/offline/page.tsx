import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { SavedPages } from "@/components/Offline";

export const metadata: Metadata = { title: "Offline", robots: { index: false } };

export default function OfflinePage() {
  return (
    <div className="wrap narrow section center">
      <LogoMark size={72} />
      <h1>You&apos;re offline</h1>
      <p className="lead">This page isn&apos;t saved on this device yet. Lessons you&apos;ve opened before, or saved for offline, still work.</p>
      <SavedPages />
      <Link href="/" className="btn btn-primary">
        Back home
      </Link>
    </div>
  );
}
