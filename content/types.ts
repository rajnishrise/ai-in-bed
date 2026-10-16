export type LevelId = "beginner" | "intermediate" | "advanced";

export type GraphicId =
  | "ai-nesting"
  | "learning-loop"
  | "three-learnings"
  | "neuron"
  | "data-split"
  | "next-token"
  | "regression"
  | "gradient-descent"
  | "fit-spectrum"
  | "confusion-matrix"
  | "backprop"
  | "convolution"
  | "embeddings"
  | "attention"
  | "llm-pipeline"
  | "rag"
  | "lora"
  | "diffusion"
  | "rl-loop"
  | "scaling";

/** Hands-on explainers the learner can play with (components/interactive). */
export type InteractiveId =
  | "neuron"
  | "gradient-descent"
  | "overfitting"
  | "embeddings"
  | "attention"
  | "temperature"
  | "rag"
  | "diffusion";

export type Block =
  /** A plain paragraph. Supports **bold** and `code`. */
  | { kind: "p"; text: string }
  /** A bite-sized card: one idea, readable in one thumb-scroll. */
  | { kind: "card"; title: string; body: string[] }
  | { kind: "figure"; graphic: GraphicId; caption: string }
  | {
      kind: "quiz";
      question: string;
      options: string[];
      answer: number;
      explain: string;
    }
  /** A "pillow thought": an analogy or aside in a soft callout. */
  | { kind: "tip"; text: string }
  | { kind: "list"; items: string[] }
  /** A playable explainer. */
  | { kind: "interactive"; id: InteractiveId; caption: string }
  /** Editable Python that runs in the browser (Pyodide). */
  | { kind: "code"; title: string; code: string; note?: string; packages?: string[] };

export type Source = {
  title: string;
  url: string;
  by: string;
  note?: string;
};

export type Lesson = {
  slug: string;
  title: string;
  emoji: string;
  minutes: number;
  summary: string;
  blocks: Block[];
  takeaways: string[];
  sources: Source[];
};

export type Level = {
  id: LevelId;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  lessons: Lesson[];
};
