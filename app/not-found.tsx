import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="wrap narrow section center">
      <LogoMark size={72} />
      <h1>This page drifted off</h1>
      <p className="lead">We couldn&apos;t find what you were looking for.</p>
      <Link href="/" className="btn btn-primary">
        Back home
      </Link>
    </div>
  );
}
