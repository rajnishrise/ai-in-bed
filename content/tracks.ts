import { getLesson } from ".";

export type Track = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  forWho: string;
  /** Lessons in order, as "level/slug". */
  steps: string[];
};

export const tracks: Track[] = [
  {
    id: "ai-for-everyone",
    name: "AI for everyone",
    tagline: "Understand it, use it, don't get fooled by it.",
    description: "The essentials for anyone: what AI is, how chatbots work, how to get good answers and how to stay safe.",
    forWho: "Curious people with no technical background",
    steps: [
      "beginner/what-is-ai",
      "beginner/how-machines-learn",
      "beginner/meet-llms",
      "beginner/prompting-well",
      "beginner/data-is-everything",
      "beginner/spotting-ai-fakes",
      "beginner/using-ai-safely",
    ],
  },
  {
    id: "ai-at-work",
    name: "AI at work",
    tagline: "Get real time back without getting burned.",
    description: "Practical skills for using AI in a job: picking the right tasks, prompting, checking output and knowing the limits.",
    forWho: "Professionals who want to use AI well this week",
    steps: [
      "beginner/meet-llms",
      "beginner/prompting-well",
      "beginner/ai-at-work",
      "beginner/using-ai-safely",
      "intermediate/testing-language-models",
      "advanced/rag-and-agents",
      "advanced/agents-in-depth",
    ],
  },
  {
    id: "builder",
    name: "Builder",
    tagline: "From prompts to products.",
    description: "What you need to build apps on top of language models: embeddings, transformers, retrieval, agents, evals and open models.",
    forWho: "Developers and makers building with AI",
    steps: [
      "beginner/meet-llms",
      "beginner/prompting-well",
      "intermediate/embeddings",
      "advanced/transformers",
      "advanced/rag-and-agents",
      "advanced/agents-in-depth",
      "intermediate/testing-language-models",
      "intermediate/open-models",
      "advanced/efficient-finetuning",
    ],
  },
  {
    id: "ml-engineer",
    name: "ML engineer",
    tagline: "The maths and machinery, start to frontier.",
    description: "A full path from fitting a line to training and aligning large models, with code you can run along the way.",
    forWho: "Students and engineers who want depth",
    steps: [
      "intermediate/regression",
      "intermediate/gradient-descent",
      "intermediate/overfitting",
      "intermediate/evaluating-models",
      "intermediate/backpropagation",
      "intermediate/cnns-and-rnns",
      "intermediate/embeddings",
      "advanced/transformers",
      "advanced/training-llms",
      "advanced/reinforcement-learning",
      "advanced/reasoning-models",
      "advanced/scaling-and-safety",
      "advanced/alignment-and-interpretability",
    ],
  },
];

export const getTrack = (id: string) => tracks.find((t) => t.id === id);

/** Resolves a track's steps to lessons, failing loudly on a typo at build time. */
export function trackLessons(t: Track) {
  return t.steps.map((key) => {
    const [level, slug] = key.split("/");
    const found = getLesson(level, slug);
    if (!found) throw new Error(`Track ${t.id} lists unknown lesson ${key}`);
    return { key, href: `/learn/${level}/${slug}`, level: found.level, lesson: found.lesson };
  });
}
