import { glossary } from "@/content/glossary";
import { termExamples } from "@/content/glossary-examples";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/site";
import { allLessonsMarkdown } from "@/lib/markdown";

export const dynamic = "force-static";

/** Every lesson as one Markdown file, for AI assistants that read llms-full.txt. */
export function GET() {
  const body = [
    `# ${SITE_NAME}: the full free AI course`,
    `> ${SITE_DESCRIPTION}`,
    `Source: ${absoluteUrl("/")}. Lessons are original summaries; each links the free and open material it builds on.`,
    allLessonsMarkdown(),
    "---\n\n## AI glossary",
    [...glossary]
      .sort((a, b) => a.term.localeCompare(b.term))
      .map((t) => `**${t.term}**: ${t.def}${termExamples[t.term] ? ` Example: ${termExamples[t.term]}` : ""}`)
      .join("\n\n"),
  ].join("\n\n");
  return new Response(body + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
