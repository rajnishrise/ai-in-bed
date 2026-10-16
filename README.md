# AI in Bed 🛏️

Learn AI one cozy scroll at a time. A mobile-first Next.js site with 20 bite-sized lessons across three levels (Beginner, Intermediate, Advanced), 20 hand-drawn SVG infographics, 40+ tap-to-answer quizzes, a glossary and a library of the open-source material every lesson builds on.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages are statically generated)
```

## Deploy on Vercel

1. Push this folder to a GitHub repo.
2. On vercel.com: **Add New → Project**, import the repo, keep the defaults (framework: Next.js), and click **Deploy**.

No environment variables or database are needed. Reading progress and the night/morning theme are stored in each visitor's browser.

## Where things live

| Path | What it is |
| --- | --- |
| `content/beginner.ts`, `intermediate.ts`, `advanced.ts` | All lesson text, quizzes, takeaways and sources |
| `content/resources.ts` | The Library page (open courses, books, papers, tools) |
| `content/glossary.ts` | Glossary terms |
| `components/graphics/index.tsx` | The SVG infographics (themed via CSS classes) |
| `app/` | Pages: home, level, lesson, library, glossary |

### Adding a lesson

Add an object to a level's `lessons` array. A lesson is a list of blocks: `p` (paragraph), `card`, `figure` (an infographic id), `quiz`, `tip` and `list`. Text supports `**bold**`, `*italic*` and `` `code` ``. The page, navigation and progress tracking pick it up automatically.

## Credits

Lessons are original summaries written for this site. They link to and credit the free and open material they draw on, including Google's Machine Learning Crash Course (CC BY 4.0), Dive into Deep Learning (CC BY-SA 4.0), Hugging Face courses (Apache 2.0), Elements of AI, 3Blue1Brown, fast.ai, Stanford CS229/CS231n/CS224n, Andrej Karpathy's Zero to Hero, Jay Alammar, Lilian Weng, Distill, Sutton & Barto, OpenAI Spinning Up and the original research papers. The full list with licences is on the `/resources` page.

## Settings

- **Custom domain:** set `NEXT_PUBLIC_SITE_URL` (for example `https://aiinbed.com`) in Vercel so canonical URLs, the sitemap and share images use it. Without it the site uses the Vercel production URL.
- **Analytics:** enable Web Analytics in the Vercel project (Analytics tab). Lesson ratings are sent as the custom event `Lesson feedback`; custom events need a Vercel Pro plan, page views work on every plan.
- Share images use Instrument Serif (SIL Open Font License, see `assets/fonts/OFL.txt`).
