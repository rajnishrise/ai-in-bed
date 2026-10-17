import type { Metadata } from "next";
import { resources } from "@/content/resources";
import { LibraryBrowser } from "@/components/LibraryBrowser";

export const metadata: Metadata = {
  title: "Free AI Courses, Books and Papers: The Open Library",
  description: "The free and open-source AI courses, books, papers and tools AI in Bed is built on, filterable by level and format.",
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
      <LibraryBrowser resources={resources} />
    </div>
  );
}
