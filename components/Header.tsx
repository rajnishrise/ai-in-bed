import Link from "next/link";
import { LogoMark, Wordmark } from "./Logo";
import { NavLinks } from "./NavLinks";
import { SearchDialog } from "./SearchDialog";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label="AI in Bed home">
          <LogoMark size={28} />
          <Wordmark />
        </Link>
        <NavLinks />
        <div className="header-tools">
          <SearchDialog />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
