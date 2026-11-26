/** Release notes for the "What's new" page. Newest first. Lessons are "level/slug". */
export type Release = {
  date: string;
  title: string;
  notes: string[];
  lessons: string[];
};

export const releases: Release[] = [
  {
    date: "2026-11-26",
    title: "Everyday AI: the best tools for every job",
    notes: [
      "A new Everyday AI section with twelve practical guides: making videos, editing photos, generating images, writing, email, presentations, research, spreadsheets, meeting notes and transcription, music and audio, building apps without coding, and studying.",
      "Each guide names the best tools for the job (free and open-source picks clearly marked), a simple workflow, prompts you can copy, and what to watch out for.",
    ],
    lessons: [],
  },
  {
    date: "2026-11-25",
    title: "Eight more blog guides: RAG, tokens, transformers and more",
    notes: [
      "New plain-English guides: what RAG is, fine-tuning vs RAG vs prompt engineering (with LoRA), what tokens and context windows are, embeddings, how neural networks work, transformers and attention, how to run an LLM on your own laptop, and how to become an AI engineer.",
      "Each one starts with a short answer, links the lessons and glossary terms that go deeper, and answers the most common follow-up questions.",
    ],
    lessons: [],
  },
  {
    date: "2026-11-18",
    title: "A new blog: AI explained simply",
    notes: [
      "Eight plain-English guides to the questions people ask most: how ChatGPT works, AI vs machine learning vs deep learning, how to learn AI for free, generative AI, why AI hallucinates, prompting, whether you need maths, and AI agents.",
      "Each post starts with a short answer, links the free lessons that go deeper and the sources it draws on, and lets you tap any AI term for a definition.",
      "Glossary pages now point to the blog posts that explain each term, and there's an RSS feed for new posts.",
    ],
    lessons: [],
  },
  {
    date: "2026-10-26",
    title: "A 30-day plan, a page for every AI term and free certificates",
    notes: [
      "Learn AI in 30 days: a night-by-night plan through every lesson, with review nights and calendar reminders you can download.",
      "Every glossary term now has its own page with a plain-English answer, an everyday example and the lessons that teach it. Twelve new terms, from machine learning to AGI.",
      "A guide to free AI courses with certificates, from Harvard, the University of Helsinki, IBM, Kaggle and Hugging Face.",
      "Lessons list the key terms they use, and each lesson can be read as plain text by AI assistants by adding .md to its address.",
    ],
    lessons: [],
  },
  {
    date: "2026-10-16",
    title: "Twelve new lessons, offline reading and an app you can install",
    notes: [
      "Twelve new lessons, from a short history of AI to mixture-of-experts models.",
      "Install AI in Bed on your phone's home screen, and save a whole level or track to read with no signal.",
      "Every lesson now has a \"Suggest an edit\" link, and there's a guide for anyone who wants to help.",
      "This page, so you can see what changed since your last visit.",
    ],
    lessons: [
      "beginner/history-of-ai",
      "beginner/everyday-ai",
      "beginner/ai-and-jobs",
      "beginner/how-ai-makes-pictures",
      "intermediate/decision-trees",
      "intermediate/clustering",
      "intermediate/tokenisation",
      "intermediate/recommender-systems",
      "advanced/inference-and-serving",
      "advanced/mixture-of-experts",
      "advanced/distillation-and-small-models",
      "advanced/ai-and-robotics",
    ],
  },
  {
    date: "2026-10-16",
    title: "Play with the ideas: explainers, Python, tracks and listening mode",
    notes: [
      "Eight interactive explainers you can drag and tweak, from a single neuron to diffusion.",
      "Python examples that run right in the browser.",
      "Lessons on phones became swipeable cards.",
      "Listening mode reads lessons aloud, with a sleep timer.",
      "Four learning tracks and a final check with a shareable card for each level.",
    ],
    lessons: [
      "beginner/prompting-well",
      "beginner/ai-at-work",
      "beginner/spotting-ai-fakes",
      "beginner/using-ai-safely",
      "intermediate/testing-language-models",
      "intermediate/multimodal-models",
      "intermediate/open-models",
      "advanced/agents-in-depth",
      "advanced/reasoning-models",
      "advanced/alignment-and-interpretability",
    ],
  },
  {
    date: "2026-10-16",
    title: "A new look, search and nightly review",
    notes: [
      "A calmer, classier design with a new moon-and-stars logo.",
      "Search across lessons and the glossary, tap-to-define terms and a nightly streak.",
      "Spaced review brings back quiz questions just before you'd forget them.",
    ],
    lessons: [],
  },
  {
    date: "2026-10-06",
    title: "AI in Bed launches",
    notes: ["Twenty lessons across three levels, with infographics and quick quizzes."],
    lessons: [],
  },
];

/** Lessons from the latest release that added any, marked "New" in lesson lists. */
export const newLessonKeys = new Set(releases.find((r) => r.lessons.length)?.lessons);
