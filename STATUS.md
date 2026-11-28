# Status

## AdSense (2026-11-28, branch claude/project-thread-u79a38)

**Goal:** run AdSense on www.aiinbed.com without hurting the reading experience.

**Done:** PR #13 merged 2026-11-28: AdSense script in every page head + /ads.txt; AdSense shows site ownership verified.

**In this branch (PR #14):** `AdSlot` component (components/AdSlot.tsx, IDs in lib/ads.ts): 2 manual slots on blog posts, Everyday AI guides and glossary terms (after the opening part, near the end), with reserved height and an "Advertisement" label; hides when unfilled. /privacy page (AdSense, Vercel Analytics, local storage) linked in footer and sitemap. "No ads" copy changed to "no ads in lessons" (About, FAQ, llms.txt). Build passes; screenshots in project files ai-in-bed-previews/ads/.

**Decisions:** owner picked manual slots with lessons ad-free on 2026-11-28 (calm lessons, swipe cards stay intact). No Auto ads.

**PR #14 merged 2026-11-28.** Ad unit IDs set in lib/ads.ts (PR #15): In content 8996610389, End of page 2658432741. Merge after AdSense approval to avoid empty slots.

**Needs owner:** merge PR #15 after approval; turn on Google's consent message (Privacy & messaging, EEA/UK/CH). AdSense site review requested 2026-11-27.

## Earn Google sitelinks (2026-11-26, branch claude/project-thread-aj0cch)

**Goal:** sitelinks under the AI in Bed result. Google only shows them on a #1 brand result, so the real target is ranking #1 for "ai in bed".

**Already in place before this:** Organization (logo, sameAs Instagram + GitHub), WebSite with alternate names, header sections, breadcrumbs on lessons/levels/blog/glossary terms/guides.

**Done in this branch:**
- BreadcrumbList on /tracks, each track, /resources, /glossary, /new (helper `breadcrumbs()` in lib/schema.ts)
- Owner picked full option A on 2026-11-26 (brand-first title + hubs): /learn hub (all levels + every lesson) and Learn nav link pointing to it; level and lesson breadcrumbs now Home > Learn > Level; /about page (AboutPage schema tied to the Organization); home title brand-first ("AI in Bed: Free AI Course in 10-Minute Lessons"); both pages in sitemap and footer
- Build passes; markup checked on a local build

**Needs owner:** merge PR #12.

**Open to-dos (off-site, owner):** link aiinbed.com from Instagram bio and GitHub repo "website" field; backlinks; GSC Request indexing for /learn and /about after deploy.

## Get unindexed pages into Google (2026-11-26)

**Problem:** Search Console lists 11 URLs as "Discovered - currently not indexed" (never crawled).

**Finding:** Nothing blocks them. All return 200, are in the sitemap, have self canonicals and no noindex, and get 5 to 12 internal links each, like many pages Google did index. Google found them and put off crawling them, which is normal for a young domain with few backlinks that tripled in size in a month (164 URLs).

**Done in this branch (claude/project-thread-5hrmat):**
- Honest sitemap `lastmod` and schema `dateModified`: glossary, lesson, level, track and Library pages no longer claim to change on every release (`contentDates` in lib/schema.ts). No URLs added, removed or changed.
- "Keep exploring" links under every lesson (3 related lessons by shared key terms, hand-picked for the everyday-life lessons).
- Fuller question-style answers and FAQs for the glossary pages Classification, Eval and Learning rate.

**Needs the user:**
- OK to merge (it changes sitemap lastmod values).
- After deploy: Search Console steps (resubmit sitemap, Request indexing on the listed URLs).

**Open to-dos:** backlinks (Reddit, HN, awesome lists) remain the biggest lever for crawl priority.

## Images and graphics (2026-11-26, branch claude/project-thread-klfd2l)

Owner picked Option A (original illustrations) on 2026-11-26. Final version is in the PR; waiting for review and merge.

### Done
- Option A draft: original line illustrations (own SVG, no third-party licences)
  - Blog posts: wide picture under the title, plus an existing explainer diagram after the first section (13 of 16 posts)
  - Blog list and Everyday AI hub: small picture tile on each card
  - Everyday AI guides: wide picture under the title
  - Glossary term pages: small picture above the short answer
  - Alt text on every picture; 6 new motifs (film, envelope, slides, grid, note, pen)
- Checked night + morning themes, desktop + phone; build and type check pass

- Quality pass: hand-picked picture for all 72 glossary terms, magic-wand motif for image tools, softer morning glow

### Needs owner
- Review and merge the PR

### Open to-dos
- Later, if wanted: a few public-domain history photos (Option B)

### Assumptions
- "Open-source images" can include original SVG released with the site
- Lesson pages already have card art and diagrams, so they are left as they are
