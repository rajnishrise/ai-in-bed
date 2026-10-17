import { levels, stripEmoji } from "@/content";
import type { Block, Lesson, Level } from "@/content/types";
import { absoluteUrl } from "@/lib/site";

/** Plain Markdown versions of the lessons, for llms.txt and AI assistants. */

function blockMarkdown(b: Block): string {
  switch (b.kind) {
    case "p":
      return b.text;
    case "card":
      return [`### ${stripEmoji(b.title)}`, ...b.body].join("\n\n");
    case "figure":
      return `*Figure: ${b.caption}*`;
    case "interactive":
      return `*Interactive explainer: ${b.caption}*`;
    case "tip":
      return `> ${b.text}`;
    case "list":
      return b.items.map((s) => `- ${s}`).join("\n");
    case "quiz":
      return [
        `**Quick check:** ${b.question}`,
        b.options.map((o, i) => `${"ABCD"[i]}. ${o}`).join("\n"),
        `Answer: ${"ABCD"[b.answer]}. ${b.explain}`,
      ].join("\n\n");
    case "code":
      return [`**${b.title}**`, "```python\n" + b.code.trim() + "\n```", b.note ?? ""].filter(Boolean).join("\n\n");
  }
}

export function lessonMarkdown(level: Level, lesson: Lesson): string {
  return [
    `## ${lesson.title}`,
    `${level.name} level · ${lesson.minutes} min · ${absoluteUrl(`/learn/${level.id}/${lesson.slug}`)}`,
    `*${lesson.summary}*`,
    ...lesson.blocks.map(blockMarkdown),
    "**Key takeaways**",
    lesson.takeaways.map((t) => `- ${t}`).join("\n"),
    "**Go deeper (free sources)**",
    lesson.sources.map((s) => `- [${s.title}](${s.url}) by ${s.by}`).join("\n"),
  ].join("\n\n");
}

export const allLessonsMarkdown = () =>
  levels.flatMap((level) => level.lessons.map((lesson) => lessonMarkdown(level, lesson))).join("\n\n---\n\n");
