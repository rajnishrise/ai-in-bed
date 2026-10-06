import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap narrow section center">
      <p style={{ fontSize: "3rem" }}>😴</p>
      <h1>This page fell asleep</h1>
      <p className="lead">We couldn&apos;t find what you were looking for.</p>
      <Link href="/" className="btn btn-primary">
        Back to bed (home)
      </Link>
    </div>
  );
}
