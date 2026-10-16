# Contributing to AI in Bed

Thanks for helping. AI in Bed is a free, calm place to learn AI, and every fix or new lesson makes it better for the next reader.

## Quick ways to help

- **Report a mistake:** use the "Suggest an edit" link at the end of any lesson, or [open an issue](https://github.com/rajnishrise/ai-in-bed/issues/new?labels=content).
- **Suggest a topic:** [open an issue](https://github.com/rajnishrise/ai-in-bed/issues/new?labels=topic) saying what you'd like to understand and at which level.
- **Write or improve a lesson:** follow the guide below and open a pull request.

## Running the site

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint    # type-check
npm run build   # what Vercel runs
```

## Where lessons live

| File | What it holds |
|---|---|
| `content/types.ts` | The shape of a lesson and every block type |
| `content/beginner*.ts`, `intermediate*.ts`, `advanced*.ts` | Lessons for each level, in order |
| `content/glossary.ts` | Terms that get tap-to-define underlines in lessons |
| `content/tracks.ts` | Curated learning paths across levels |
| `content/changelog.ts` | The "What's new" page; add new lessons to the top release |

To add a lesson, append it to the right level's `*-new.ts` (or `*-more.ts`) array. The page, sitemap, search and share image are generated automatically.

## Lesson template

```ts
{
  slug: "your-topic",            // URL: /learn/<level>/your-topic
  title: "Your topic, in plain words",
  emoji: "🌙",
  minutes: 6,
  summary: "One or two sentences that make someone want to read it.",
  blocks: [
    { kind: "p", text: "Open with the everyday version of the idea. **Bold** a key term the first time." },
    { kind: "card", title: "One idea per card", body: ["A short paragraph.", "Maybe a second."] },
    { kind: "tip", text: "An analogy or aside." },
    { kind: "quiz", question: "...?", options: ["A", "B", "C", "D"], answer: 1, explain: "Why B is right." },
    { kind: "code", title: "Try it", code: "print('hello')", note: "Standard-library Python only; it runs in the browser." },
    // also: list, figure (built-in infographic), interactive (built-in explainer)
  ],
  takeaways: ["Three short lines", "the reader should remember", "tomorrow."],
  sources: [{ title: "A free, open source", url: "https://...", by: "Author", note: "Licence or 'Free'" }],
}
```

## House style

- One idea per card, readable in one thumb-scroll.
- Plain British English. Explain every term the first time it appears.
- Two quick checks per lesson that test understanding, not recall.
- Credit and link free, open sources. Write original summaries; don't copy text.
- Accurate and calm: no hype, no doom. Avoid precise figures you can't source.
- No em-dashes; use commas, colons or full stops.
- Code blocks use the Python standard library only and must run as written.
