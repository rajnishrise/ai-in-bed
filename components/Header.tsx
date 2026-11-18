import Link from "next/link";
import { LogoMark, Wordmark } from "./Logo";
import { NavLinks } from "./NavLinks";
import { SearchDialog } from "./SearchDialog";
import { ThemeToggle } from "./ThemeToggle";
import { Icon } from "./Icon";
import { INSTAGRAM_URL } from "@/lib/site";

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
          <a
            href={INSTAGRAM_URL}
            className="icon-btn"
            target="_blank"
            rel="me noopener"
            aria-label="AI in Bed on Instagram"
            title="Follow @aiinbed on Instagram"
          >
            <Icon name="instagram" size={18} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
