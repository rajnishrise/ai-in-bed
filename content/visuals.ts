/**
 * Pictures for the blog, Everyday AI guides and glossary pages.
 *
 * Every illustration on the site is an original SVG drawn for AI in Bed
 * (components/cardArt and components/graphics), released with the site's
 * content, so there are no third-party image licences to track.
 *
 *  motifs   main motif first, then up to two quieter companions
 *  alt      one sentence describing the picture (read aloud and indexed)
 *  figure   an explainer diagram placed after the first section, with caption
 */

import type { GraphicId } from "./types";

export type Visual = {
  motifs: string[];
  alt: string;
  figure?: { graphic: GraphicId; caption: string };
};

export const blogVisuals: Record<string, Visual> = {
  "how-does-chatgpt-work": {
    motifs: ["chat", "tokens", "brain"],
    alt: "Illustration of a chat bubble between a string of word tokens and a brain, standing for how ChatGPT turns text into answers.",
    figure: { graphic: "llm-pipeline", caption: "How a chatbot like ChatGPT is made: pre-training on huge amounts of text, fine-tuning on good example answers, then tuning on human preferences." },
  },
  "ai-vs-machine-learning-vs-deep-learning": {
    motifs: ["layers", "brain", "network"],
    alt: "Illustration of nested layers between a brain and a neural network, standing for AI, machine learning and deep learning.",
    figure: { graphic: "ai-nesting", caption: "Deep learning sits inside machine learning, which sits inside the wider field of AI." },
  },
  "how-to-learn-ai-for-free": {
    motifs: ["books", "compass", "sprout"],
    alt: "Illustration of a stack of books between a compass and a growing sprout, standing for a free path to learning AI.",
  },
  "what-is-generative-ai": {
    motifs: ["wand", "picture", "wave"],
    alt: "Illustration of a magic wand between a picture frame and a sound wave, standing for AI that generates images, text and audio.",
    figure: { graphic: "diffusion", caption: "How an image generator works: start from noise and remove a little of it at each step until a picture appears." },
  },
  "why-does-ai-hallucinate": {
    motifs: ["mask", "warning", "dice"],
    alt: "Illustration of a theatre mask between a warning sign and a die, standing for confident answers that can be made up.",
    figure: { graphic: "next-token", caption: "A language model picks the next word by probability, not by checking facts, which is why fluent answers can still be wrong." },
  },
  "prompt-engineering-for-beginners": {
    motifs: ["chat", "bulb", "target"],
    alt: "Illustration of a chat bubble between a light bulb and a target, standing for writing clear prompts that hit the mark.",
  },
  "do-you-need-math-to-learn-ai": {
    motifs: ["hill", "chart", "bulb"],
    alt: "Illustration of a ball rolling down a hill between a chart and a light bulb, standing for the small amount of maths behind AI.",
    figure: { graphic: "gradient-descent", caption: "Gradient descent, the main piece of maths in machine learning: take small steps downhill until the error is as low as it goes." },
  },
  "what-is-an-ai-agent": {
    motifs: ["robot", "tools", "loop"],
    alt: "Illustration of a friendly robot between a set of tools and a loop arrow, standing for an AI that plans, acts and checks its work.",
    figure: { graphic: "rl-loop", caption: "An agent works in a loop: it looks at the situation, takes an action, sees the result and decides what to do next." },
  },
  "what-is-rag": {
    motifs: ["database", "search", "chat"],
    alt: "Illustration of a database between a magnifying glass and a chat bubble, standing for AI that looks things up before it answers.",
    figure: { graphic: "rag", caption: "Retrieval-augmented generation: find the most relevant passages, add them to the prompt, then let the model answer from them." },
  },
  "fine-tuning-vs-rag-vs-prompt-engineering": {
    motifs: ["gears", "chat", "database"],
    alt: "Illustration of gears between a chat bubble and a database, standing for three ways to adapt an AI model.",
    figure: { graphic: "lora", caption: "LoRA, the cheap way to fine-tune: freeze the big model and train two small matrices that nudge it." },
  },
  "what-are-tokens-in-ai": {
    motifs: ["tokens", "document", "coin"],
    alt: "Illustration of a row of word tokens between a page of text and a coin, standing for how AI splits text and counts cost.",
    figure: { graphic: "next-token", caption: "Models read and write in tokens, word pieces, and predict the next one each time." },
  },
  "what-are-embeddings": {
    motifs: ["constellation", "clusters", "search"],
    alt: "Illustration of a star constellation between clusters of points and a magnifying glass, standing for meaning stored as positions in space.",
    figure: { graphic: "embeddings", caption: "Embeddings place similar meanings close together, so a computer can measure meaning as distance." },
  },
  "how-do-neural-networks-work": {
    motifs: ["network", "neuron", "hill"],
    alt: "Illustration of a layered neural network between a single neuron and a downhill slope, standing for how networks learn.",
    figure: { graphic: "neuron", caption: "One artificial neuron: weigh the inputs, add them up and pass the total through an activation." },
  },
  "what-is-a-transformer": {
    motifs: ["attention", "tokens", "layers"],
    alt: "Illustration of attention lines linking words, between a row of tokens and stacked layers, standing for the transformer.",
    figure: { graphic: "attention", caption: "Attention lets each word look at every other word and decide which ones matter for its meaning." },
  },
  "how-to-run-an-llm-locally": {
    motifs: ["chip", "lock", "server"],
    alt: "Illustration of a computer chip between a padlock and a server, standing for running a private AI model on your own machine.",
  },
  "how-to-become-an-ai-engineer": {
    motifs: ["code", "rocket", "briefcase"],
    alt: "Illustration of a code window between a rocket and a briefcase, standing for a career path into AI engineering.",
    figure: { graphic: "learning-loop", caption: "The training loop at the heart of every model you will build: predict, measure the error, adjust the weights, repeat." },
  },
};

export const everydayVisuals: Record<string, Visual> = {
  "ai-for-video": { motifs: ["film", "wave", "lightning"], alt: "Illustration of a film clapperboard between a sound wave and a lightning bolt, standing for faster video editing with AI." },
  "ai-photo-editing": { motifs: ["picture", "wand", "eye"], alt: "Illustration of a photo frame between a magic wand and an eye, standing for fixing and improving photos with AI." },
  "ai-image-generators": { motifs: ["wand", "picture", "pen"], alt: "Illustration of a magic wand between a picture frame and a pen, standing for creating new images from a written prompt." },
  "ai-for-writing": { motifs: ["document", "pen", "chat"], alt: "Illustration of a page of text between a pen and a chat bubble, standing for writing and editing with an AI assistant." },
  "ai-for-email": { motifs: ["envelope", "chat", "lightning"], alt: "Illustration of an envelope between a chat bubble and a lightning bolt, standing for quicker email with AI." },
  "ai-for-presentations": { motifs: ["slides", "bulb", "people"], alt: "Illustration of a presentation screen between a light bulb and an audience, standing for building slides with AI." },
  "ai-for-research": { motifs: ["search", "books", "document"], alt: "Illustration of a magnifying glass between books and a page of notes, standing for research with AI and sources." },
  "ai-for-spreadsheets": { motifs: ["grid", "chart", "code"], alt: "Illustration of a spreadsheet grid between a chart and a code window, standing for analysing data with AI." },
  "ai-meeting-notes": { motifs: ["people", "wave", "document"], alt: "Illustration of a group of people between a sound wave and a page of notes, standing for AI meeting transcripts." },
  "ai-for-music-and-audio": { motifs: ["note", "wave", "lightning"], alt: "Illustration of a music note between a sound wave and a lightning bolt, standing for making music and podcasts with AI." },
  "ai-coding-for-beginners": { motifs: ["code", "gears", "rocket"], alt: "Illustration of a code window between gears and a rocket, standing for building apps and automations without coding." },
  "ai-for-studying": { motifs: ["books", "bulb", "sprout"], alt: "Illustration of a stack of books between a light bulb and a sprout, standing for studying and learning faster with AI." },
};

/** Fallback so a new post or guide still gets a picture before it has an entry here. */
export const defaultVisual = (title: string, motif: string): Visual => ({
  motifs: [motif],
  alt: `Illustration for "${title}".`,
});

/** Hand-picked motif for each glossary term (by URL slug), so the picture fits the idea. */
export const glossaryMotifs: Record<string, string> = {
  "activation-function": "neuron",
  agent: "robot",
  agi: "brain",
  "ai-winter": "hourglass",
  alignment: "compass",
  "artificial-intelligence": "brain",
  attention: "attention",
  augmentation: "layers",
  backpropagation: "loop",
  "batch-mini-batch": "stack",
  benchmark: "chart",
  bias: "balance",
  "chain-of-thought": "puzzle",
  chatbot: "chat",
  classification: "funnel",
  clustering: "clusters",
  cnn: "eye",
  "collaborative-filtering": "people",
  "computer-vision": "eye",
  "context-window": "document",
  "decision-tree": "tree",
  "deep-learning": "network",
  deepfake: "mask",
  "diffusion-model": "picture",
  embedding: "constellation",
  epoch: "loop",
  eval: "target",
  "expert-system": "books",
  "few-shot-prompting": "chat",
  "fine-tuning": "gears",
  "generative-ai": "wand",
  gradient: "hill",
  "gradient-descent": "hill",
  hallucination: "mask",
  inference: "lightning",
  interpretability: "search",
  "knowledge-distillation": "funnel",
  "kv-cache": "database",
  "learning-rate": "hill",
  llm: "tokens",
  lora: "tools",
  "loss-function": "hill",
  "machine-learning": "brain",
  "mixture-of-experts": "people",
  multimodal: "picture",
  "natural-language-processing": "chat",
  "neural-network": "network",
  "open-weight-model": "globe",
  overfitting: "scatter",
  "parameters-weights": "gears",
  precision: "target",
  prompt: "chat",
  "prompt-injection": "warning",
  quantisation: "chip",
  rag: "database",
  "random-forest": "tree",
  recall: "search",
  "recommender-system": "bulb",
  regression: "scatter",
  regularisation: "balance",
  "reinforcement-learning": "flag",
  "reward-hacking": "warning",
  rlhf: "people",
  "speculative-decoding": "lightning",
  "supervised-learning": "target",
  temperature: "dice",
  "test-time-compute": "server",
  token: "tokens",
  "training-data": "stack",
  transformer: "attention",
  "unsupervised-learning": "clusters",
  "validation-set": "shield",
};
