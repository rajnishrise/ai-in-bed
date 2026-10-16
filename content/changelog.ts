/** Release notes for the "What's new" page. Newest first. Lessons are "level/slug". */
export type Release = {
  date: string;
  title: string;
  notes: string[];
  lessons: string[];
};

export const releases: Release[] = [
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

/** Lessons from the latest release, marked "New" in lesson lists. */
export const newLessonKeys = new Set(releases[0].lessons);
