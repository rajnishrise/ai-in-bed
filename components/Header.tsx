import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label="AI in Bed home">
          <span className="brand-moon" aria-hidden>
            🛏️
          </span>
          <span>
            AI <em>in</em> Bed
          </span>
        </Link>
        <nav className="nav">
          <Link href="/level/beginner">Learn</Link>
          <Link href="/glossary">Glossary</Link>
          <Link href="/resources">Library</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
