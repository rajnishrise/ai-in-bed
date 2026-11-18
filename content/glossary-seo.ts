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
};
