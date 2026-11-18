import type { Metadata } from "next";
import Link from "next/link";
import { resources } from "@/content/resources";
import { resourceGuides } from "@/content/resource-guides";
import { LibraryBrowser } from "@/components/LibraryBrowser";

export const metadata: Metadata = {
  title: "Free AI Learning Resources: Courses, Books, Blogs and Papers",
  description: `${resources.length} free and open AI courses, books, blogs, papers and interactive tools, from Stanford, MIT, Google, fast.ai, Karpathy, Lilian Weng and Jay Alammar, filterable by level and format.`,
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <div className="wrap narrow section">
      <p className="kicker">Library</p>
      <h1>The best free AI material, in one place</h1>
      <p className="lead">
        AI in Bed is a friendly front door. These are the free and open courses, books, papers and tools behind every
        lesson. All credit to their authors; licences are noted where the material is openly licensed.
      </p>
      <h2 className="section-title" style={{ marginTop: 32 }}>
        Guides
      </h2>
      <ul className="link-list">
        {resourceGuides.map((g) => (
          <li key={g.slug}>
            <Link href={`/resources/${g.slug}`}>
              <span>{g.h1}</span>
              <span className="muted">Guide</span>
            </Link>
          </li>
        ))}
        <li>
          <Link href="/free-ai-courses">
            <span>The best free AI courses, for every level</span>
            <span className="muted">Guide</span>
          </Link>
        </li>
      </ul>
      <h2 className="section-title" style={{ marginTop: 40 }}>
        Everything in the Library
      </h2>
      <LibraryBrowser resources={resources} />
    </div>
  );
}
