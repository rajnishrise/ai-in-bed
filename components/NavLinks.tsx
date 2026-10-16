"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./Icon";

const items: { href: string; label: string; icon: IconName; match: string[] }[] = [
  { href: "/", label: "Home", icon: "home", match: ["/"] },
  { href: "/level/beginner", label: "Learn", icon: "layers", match: ["/level", "/learn"] },
  { href: "/tracks", label: "Tracks", icon: "route", match: ["/tracks"] },
  { href: "/review", label: "Review", icon: "repeat", match: ["/review"] },
  { href: "/resources", label: "Library", icon: "book", match: ["/resources"] },
  { href: "/glossary", label: "Glossary", icon: "text", match: ["/glossary"] },
];

function isActive(path: string, match: string[]) {
  return match.some((m) => (m === "/" ? path === "/" : path.startsWith(m)));
}

/** Inline links in the header on wide screens. */
export function NavLinks() {
  const path = usePathname();
  return (
    <nav className="nav" aria-label="Main">
      {items.slice(1).map((it) => (
        <Link key={it.href} href={it.href} aria-current={isActive(path, it.match) ? "page" : undefined}>
          {it.label}
        </Link>
      ))}
    </nav>
  );
}

/** A thumb-reachable tab bar on phones. */
export function TabBar() {
  const path = usePathname();
  return (
    <nav className="tabbar" aria-label="Main">
      {items.filter((it) => it.href !== "/glossary").map((it) => (
        <Link key={it.href} href={it.href} aria-current={isActive(path, it.match) ? "page" : undefined}>
          <Icon name={it.icon} size={21} />
          <span>{it.label}</span>
        </Link>
      ))}
    </nav>
  );
}
