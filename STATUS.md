# Status

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
