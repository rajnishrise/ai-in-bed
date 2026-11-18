import Link from "next/link";
import { popularGuides } from "@/content/seo";

/** A short list of the guides and lessons we most want found, linked from hub pages. */
export function PopularGuides({ title = "Popular on AI in Bed", exclude, limit }: { title?: string; exclude?: string; limit?: number }) {
  const list = popularGuides.filter((g) => g.href !== exclude).slice(0, limit);
  return (
    <section className="popular-guides">
      <h2 className="section-title">{title}</h2>
      <ul className="link-list">
        {list.map((g) => (
          <li key={g.href}>
            <Link href={g.href}>
              <span>{g.title}</span>
              <span className="muted">{g.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
