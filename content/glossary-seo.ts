import type { Faq } from "./faq";

/**
 * Long-tail search phrasing for the glossary terms people actually search for (Search Console, Nov 2026).
 * Keyed by the exact term in content/glossary.ts. Terms not listed here use the default
 * "What Is X? A Simple Explanation" title and their glossary definition.
 */
export type TermSeo = {
  /** Search title; the layout adds " · AI in Bed". */
  title: string;
  /** The question as the page heading, e.g. "What is an AI agent?". */
  h1: string;
  /** Two-line plain-English answer, shown first and used as the meta description. */
  answer: string;
  faqs: Faq[];
  /** A guide page that goes further. */
  guide?: { href: string; title: string };
  /** When this entry was written or last changed, if after contentDates.glossarySeo in lib/schema.ts. */
  updated?: string;
};

export const termSeo: Record<string, TermSeo> = {
  Agent: {
    title: "What Is an AI Agent? A Simple Explanation with Examples",
    h1: "What is an AI agent?",
    answer:
      "An AI agent is an AI system that works towards a goal on its own: it plans a step, uses a tool such as web search, code or an app, looks at the result and decides what to do next, in a loop until the job is done. A chatbot answers you; an agent acts for you.",
    faqs: [
      { q: "What is the difference between an AI agent and a chatbot?", a: "A chatbot replies to one message at a time. An agent is given a goal and takes several steps by itself, calling tools and checking results, before it reports back." },
      { q: "What are examples of AI agents?", a: "Coding agents that edit and test software, research agents that search the web and write a report, and assistants that book, file or fill in forms in apps on your behalf." },
      { q: "What is the difference between RAG and an agent?", a: "RAG fetches relevant documents once and answers from them. An agent can decide to search, read, use other tools and search again as many times as it needs. Many agents use RAG as one of their tools." },
    ],
  },
  LoRA: {
    title: "What Is LoRA (Low-Rank Adaptation)? A Simple Explanation",
    h1: "What is LoRA in AI?",
    answer:
      "LoRA, short for low-rank adaptation, is a cheap way to fine-tune a large AI model. It freezes the original weights and trains two small extra matrices per layer instead, so a big model can be customised on one GPU and the result is a small add-on file.",
    faqs: [
      { q: "What does LoRA stand for?", a: "Low-Rank Adaptation, from a 2021 paper by Microsoft researchers. \"Low-rank\" means the update to each weight matrix is built from two thin matrices multiplied together, which has far fewer numbers to train." },
      { q: "What is the difference between LoRA and QLoRA?", a: "QLoRA is LoRA on top of a quantised base model: the frozen weights are stored in 4-bit to save memory, and the small LoRA adapters are trained as usual." },
      { q: "What is a LoRA in Stable Diffusion?", a: "The same idea for image models: a small file trained on a few images that teaches a base model a new style, character or object. You load it on top of the base model when you generate." },
    ],
  },
  RAG: {
    title: "What Is RAG in AI? Retrieval-Augmented Generation, Simply",
    h1: "What is RAG in AI?",
    answer:
      "RAG (retrieval-augmented generation) is a way to make an AI chatbot answer from your own documents. Before answering, it searches a knowledge base for relevant passages and puts them into the prompt, so the answer is grounded in real sources instead of only the model's memory.",
    faqs: [
      { q: "What does RAG stand for in AI?", a: "Retrieval-augmented generation: retrieve relevant text first, then generate an answer with it." },
      { q: "What is the difference between RAG and fine-tuning?", a: "RAG gives the model facts at question time, so it's easy to update and can cite sources. Fine-tuning changes the model's weights, which is better for teaching a style, format or skill than for adding facts." },
      { q: "What are RAG agents?", a: "Agents that use retrieval as a tool: instead of searching once, they decide what to look up, read the results, and search again if they need more before answering." },
    ],
  },
  "Deep learning": {
    title: "What Is Deep Learning? A Simple Explanation (Plus Free Courses)",
    h1: "What is deep learning?",
    answer:
      "Deep learning is machine learning with neural networks that have many layers. Each layer learns a slightly more abstract pattern than the one before, from edges to faces or from letters to meaning, which is what powers speech recognition, image recognition and chatbots.",
    faqs: [
      { q: "What is the difference between deep learning and machine learning?", a: "Deep learning is a kind of machine learning. Classic machine learning often relies on features people design by hand; deep learning uses many-layered neural networks that learn their own features from raw data like pixels or text." },
      { q: "Where can I learn deep learning for free?", a: "Good free starting points are 3Blue1Brown's neural network videos, fast.ai's Practical Deep Learning for Coders, MIT 6.S191 and the free book Dive into Deep Learning. Our guide to free deep learning courses ranks them by level." },
      { q: "Do I need maths for deep learning?", a: "To use it, only a little. To understand it well, some algebra, calculus and probability help. Visual courses like 3Blue1Brown build the intuition first." },
    ],
    guide: { href: "/resources/free-deep-learning-courses", title: "The best free deep learning courses" },
  },
  Epoch: {
    title: "What Is an Epoch in Machine Learning? A Simple Explanation",
    h1: "What is an epoch in machine learning?",
    answer:
      "An epoch is one full pass through the training data. If you have 10,000 examples and train for 5 epochs, the model sees every example five times, usually in small batches, with its weights updated after each batch.",
    faqs: [
      { q: "What is the difference between an epoch, a batch and an iteration?", a: "A batch is a small group of examples. An iteration (or step) is one weight update on one batch. An epoch is enough iterations to go through every example once. With 10,000 examples and batches of 100, one epoch is 100 iterations." },
      { q: "How many epochs should I train for?", a: "Until the model stops improving on validation data it hasn't trained on. Too few epochs underfits; too many can overfit. Large language models often see most of their data only about once." },
    ],
  },
  Embedding: {
    title: "What Is an Embedding in AI? A Simple Explanation",
    h1: "What is an embedding in AI?",
    answer:
      "An embedding is a list of numbers that represents the meaning of something, like a word, sentence or image, so that similar things get similar numbers. It lets computers measure meaning as distance, which powers search, recommendations and RAG.",
    faqs: [
      { q: "What is an embedding model?", a: "A model whose job is to turn text or images into embeddings. You embed your documents once, embed each question, and find the documents whose numbers are closest." },
      { q: "What is a vector database?", a: "A database built to store embeddings and quickly find the ones closest to a query. It's the search part of most RAG systems." },
    ],
  },
  "Fine-tuning": {
    title: "What Is Fine-Tuning in AI? A Simple Explanation",
    h1: "What is fine-tuning in AI?",
    answer:
      "Fine-tuning means taking a model already trained on lots of general data and training it a little more on a smaller, specific dataset, so it gets better at one task, tone or format. It's far cheaper than training a model from scratch.",
    faqs: [
      { q: "What is the difference between fine-tuning and RAG?", a: "Fine-tuning changes the model's weights to teach a skill or style. RAG leaves the model alone and gives it relevant documents at question time, which is better for facts that change." },
      { q: "Can I fine-tune a model on one GPU?", a: "Yes, with parameter-efficient methods like LoRA and QLoRA, which train small adapters instead of every weight." },
    ],
  },
  Quantisation: {
    title: "What Is Quantisation (Quantization) in AI? A Simple Explanation",
    h1: "What is quantisation in AI?",
    answer:
      "Quantisation (also spelled quantization) stores an AI model's numbers with fewer bits, for example 4-bit instead of 16-bit. The model takes a quarter of the memory and runs faster, usually with only a small drop in quality, which is how big models fit on laptops and phones.",
    faqs: [
      { q: "Does quantisation make a model worse?", a: "A little. 8-bit is usually almost indistinguishable from the original; 4-bit loses a bit more but is often worth it to fit a much bigger model in the same memory." },
      { q: "What is a GGUF or 4-bit model?", a: "GGUF is a file format used by llama.cpp and tools like Ollama to share quantised models. A \"4-bit\" or \"Q4\" model stores most weights in 4 bits." },
    ],
  },
  Classification: {
    title: "What Is Classification in Machine Learning? Simple Examples",
    h1: "What is classification in machine learning?",
    answer:
      "Classification is a machine learning task where the model picks a category for each input: spam or not spam, cat or dog, fraud or normal. It learns from examples that already have the right label, then predicts the label for new ones it hasn't seen.",
    faqs: [
      { q: "What is the difference between classification and regression?", a: "Classification predicts a category (spam or not spam). Regression predicts a number (a house price, tomorrow's temperature). Both are supervised learning: the model learns from labelled examples." },
      { q: "What are binary and multi-class classification?", a: "Binary classification has two possible answers, like yes or no. Multi-class has more than two, like sorting photos into cat, dog or bird. Multi-label lets one input have several labels at once, like tagging a photo with both \"beach\" and \"sunset\"." },
      { q: "How do you measure a classifier?", a: "Start with accuracy (the share it gets right), then look at precision and recall, which matter when one class is rare, such as fraud. A confusion matrix shows exactly which classes get mixed up." },
    ],
    guide: { href: "/learn/intermediate/evaluating-models", title: "How to tell if a classifier is any good" },
    updated: "2026-11-26",
  },
  Eval: {
    title: "What Are AI Evals? How to Test an LLM App, Simply",
    h1: "What is an eval in AI?",
    answer:
      "An eval (short for evaluation) is a repeatable test for an AI model or app: a set of example inputs plus a way to score each output, by exact match, a rule, a human or another model acting as a judge. Teams run evals before every change to see if the AI got better or worse.",
    faqs: [
      { q: "What is the difference between an eval and a benchmark?", a: "A benchmark is a public eval that everyone runs to compare models, like MMLU or SWE-bench. Your own evals test your app on your own tasks, which tells you far more about whether it works for your users." },
      { q: "What is LLM-as-a-judge?", a: "Using a language model to grade another model's answers against a rubric. It's quick and cheap for things like tone or helpfulness, but you should spot-check its grades against a person's now and then." },
      { q: "How many examples does an eval need?", a: "Start small: 20 to 50 real examples that cover your most common and most important cases catch most problems. Add a new example every time you find a failure, so it can't come back unnoticed." },
    ],
    guide: { href: "/learn/intermediate/testing-language-models", title: "Lesson: how to test a language model" },
    updated: "2026-11-26",
  },
  "Learning rate": {
    title: "What Is the Learning Rate in Machine Learning? Simply Explained",
    h1: "What is the learning rate in machine learning?",
    answer:
      "The learning rate is the size of each step a model takes while training. After every batch, gradient descent works out which way to nudge the weights; the learning rate decides how far to nudge them. Too big and training overshoots and bounces around; too small and it crawls.",
    faqs: [
      { q: "What is a good learning rate?", a: "There's no single answer. Common starting points are 0.001 for the Adam optimiser and around 0.00002 (2e-5) for fine-tuning a large language model. Try a few values ten times apart and keep the one whose loss falls fastest without jumping around." },
      { q: "What happens if the learning rate is too high?", a: "The loss jumps around or shoots up instead of falling, because each step overshoots the low point. In the worst case the numbers blow up and training fails." },
      { q: "What is a learning rate schedule?", a: "Changing the learning rate during training: often a short warm-up from zero, then a slow decay. Big steps early make fast progress and small steps late let the model settle into a good spot." },
    ],
    guide: { href: "/learn/intermediate/gradient-descent", title: "Lesson: gradient descent, step by step" },
    updated: "2026-11-26",
  },
};
