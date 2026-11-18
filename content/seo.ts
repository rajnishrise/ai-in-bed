import type { Faq } from "./faq";

/**
 * Search tuning for pages that already rank on Google's page 2 or 3 (Search Console, Nov 2026).
 * Each entry swaps the page's search title and description for the phrasing beginners type,
 * adds a two-sentence answer at the top of the page, and a few visible questions (with FAQ schema).
 * Keyed by path. Titles get " · AI in Bed" added by the layout.
 */
export type PageSeo = {
  title: string;
  description: string;
  /** The answer-first opening: what the page's searcher wants to know, in two or three sentences. */
  answer: string;
  faqs: Faq[];
};

export const pageSeo: Record<string, PageSeo> = {
  "/learn/beginner/meet-llms": {
    title: "What Is an LLM? How ChatGPT and Claude Work, Simply",
    description:
      "A free 6-minute lesson on large language models (LLMs): how ChatGPT, Claude and Gemini write one word at a time, why they sound so fluent, and why they still make things up.",
    answer:
      "A large language model (LLM) is an AI trained on a huge amount of text to predict the next word. Chatbots like ChatGPT, Claude and Gemini are LLMs: they write each answer one small piece (a token) at a time, which is why they sound fluent but can still be confidently wrong.",
    faqs: [
      { q: "Is ChatGPT an LLM?", a: "Yes. ChatGPT is a chatbot built on OpenAI's GPT large language models. Claude (Anthropic), Gemini (Google) and Llama (Meta) are other well-known LLMs." },
      { q: "Why do LLMs make things up?", a: "An LLM picks words that are likely to come next, not facts it has checked. When it doesn't know, the most likely-sounding answer can still be wrong. People call this a hallucination, so check anything important." },
      { q: "Do I need to know maths to understand LLMs?", a: "No. This lesson explains LLMs in plain English with pictures. The Advanced level goes into transformers and training if you want the details later." },
    ],
  },
  "/learn/beginner/prompting-well": {
    title: "How to Write Good AI Prompts: 5 Habits for Better Answers",
    description:
      "A free 6-minute lesson on prompting ChatGPT, Claude or any AI chatbot: give context, show an example, say what good looks like, ask it to think first, and iterate instead of restarting.",
    answer:
      "To get better answers from an AI chatbot, write your prompt like a brief for a smart new colleague. Give context, show an example, say what a good answer looks like, ask it to think before answering, and refine the answer instead of starting over.",
    faqs: [
      { q: "What is a prompt in AI?", a: "A prompt is everything you give a chatbot before it answers: your question, any instructions, examples and pasted text. The model knows nothing about you beyond what is in the prompt." },
      { q: "What makes a good ChatGPT prompt?", a: "Context (who it's for and why), a clear task, an example of what you want, the format and length you need, and follow-up messages to fix what's off." },
      { q: "Do I need to learn prompt engineering?", a: "A few habits get you most of the way. This lesson covers the five that matter most, with before-and-after examples." },
    ],
  },
  "/learn/intermediate/open-models": {
    title: "What Are Open-Weight AI Models? Run an LLM on Your Laptop",
    description:
      "A free 6-minute lesson on open-weight models like Llama, Mistral and Gemma: what \"open\" really means for AI, why it matters, and how much memory you need to run a chatbot yourself.",
    answer:
      "An open-weight model is an AI model whose learned numbers (weights) are published, so anyone can download it and run it on their own computer. Open weights are not always fully open source, but they let you use AI privately, offline and without paying per message.",
    faqs: [
      { q: "Can I run an LLM on my laptop?", a: "Yes. Smaller open-weight models, especially quantised ones with 4-bit weights, run on an ordinary laptop with free tools like Ollama or llama.cpp. Bigger models need more memory or a GPU." },
      { q: "Is open weights the same as open source?", a: "Not quite. Open weights means you can download the trained model. Open source in the full sense also shares the training code and data, and allows any use. Many open-weight licences add limits." },
      { q: "Which AI models are open-weight?", a: "Well-known families include Meta's Llama, Mistral, Google's Gemma, Alibaba's Qwen and DeepSeek. Check each model's licence before using it in a product." },
    ],
  },
  "/learn/advanced/training-llms": {
    title: "How Are LLMs Trained? Pre-training, Fine-Tuning and RLHF",
    description:
      "A free 7-minute lesson on how large language models are trained: pre-training on huge amounts of text, supervised fine-tuning to follow instructions, and learning from human feedback (RLHF).",
    answer:
      "Large language models are trained in three stages. Pre-training teaches the model to predict the next token on a huge amount of text; supervised fine-tuning teaches it to follow instructions from example conversations; and learning from feedback (like RLHF) nudges it towards answers people prefer.",
    faqs: [
      { q: "What is pre-training an LLM?", a: "Pre-training is the first and most expensive stage: the model reads trillions of tokens of text and learns to predict the next one. That is where its knowledge and fluency come from." },
      { q: "What is RLHF?", a: "Reinforcement learning from human feedback. People rank the model's answers, a reward model learns those preferences, and the LLM is trained to score well on it. It makes chatbots more helpful and polite." },
      { q: "How long does it take to train an LLM?", a: "Frontier models train for weeks to months on thousands of GPUs. Fine-tuning an existing open model for a task can take hours on a single GPU with methods like LoRA." },
    ],
  },
  "/learn/advanced/efficient-finetuning": {
    title: "LoRA and Quantisation Explained: Fine-Tune an LLM on One GPU",
    description:
      "A free 6-minute lesson on efficient fine-tuning: how LoRA, QLoRA and 4-bit quantisation let you customise a billion-parameter language model on a single GPU.",
    answer:
      "LoRA (low-rank adaptation) fine-tunes a large model by freezing its weights and training a few small extra matrices instead, so it needs a fraction of the memory. Quantisation stores the weights in fewer bits, such as 4-bit, and together (QLoRA) they let you fine-tune a billion-parameter model on one GPU.",
    faqs: [
      { q: "What is LoRA in AI?", a: "LoRA stands for low-rank adaptation. Instead of updating every weight in a model, it trains two small matrices per layer whose product is added to the frozen weights. The result is a small adapter file you can swap in and out." },
      { q: "What is quantisation in machine learning?", a: "Quantisation (or quantization) stores a model's numbers with fewer bits, for example 4 or 8 instead of 16. It cuts memory and speeds up inference, with a small loss in quality." },
      { q: "What is QLoRA?", a: "QLoRA combines the two: the frozen base model is quantised to 4-bit, and LoRA adapters are trained on top. It is the usual way to fine-tune a large open model on a single consumer GPU." },
    ],
  },
  "/learn/advanced/reinforcement-learning": {
    title: "Reinforcement Learning Explained: Policies, Values and Rewards",
    description:
      "A free 7-minute lesson on reinforcement learning: how an agent learns by trial and error from rewards, what policies and value functions are, and where RL is used, from games to ChatGPT.",
    answer:
      "Reinforcement learning (RL) is how an AI learns by doing: an agent tries actions, gets rewards or penalties, and gradually learns a policy (a way of choosing actions) that earns the most reward over time. It is behind game-playing AIs like AlphaGo and the feedback stage of training chatbots.",
    faqs: [
      { q: "What is reinforcement learning in simple terms?", a: "Learning by trial and error. Nobody shows the AI the right answer; it tries things, sees which ones lead to reward, and does more of those." },
      { q: "What is the difference between a policy and a value function?", a: "A policy says what to do in each situation. A value function estimates how much future reward a situation (or an action in it) is worth. Many RL methods learn both." },
      { q: "Is reinforcement learning used in ChatGPT?", a: "Yes. After pre-training and fine-tuning, chatbots are improved with reinforcement learning from human feedback (RLHF) and similar methods." },
    ],
  },
  "/learn/advanced/alignment-and-interpretability": {
    title: "What Is AI Alignment? Alignment and Interpretability Explained",
    description:
      "A free 8-minute lesson on AI alignment and interpretability: how developers make models helpful, honest and harmless, how they test for dangerous capabilities, and how researchers read a model's mind.",
    answer:
      "AI alignment means getting an AI system to do what its developers and users actually intend, including the things nobody wrote down. Interpretability is the research that looks inside a model to see how it reaches its answers, so people can check that it is safe.",
    faqs: [
      { q: "Why is AI alignment hard?", a: "Because it is hard to write down exactly what we want. A model trained to hit a target can find shortcuts that hit the target but miss the point, and that gets riskier as models become more capable." },
      { q: "How do companies align AI models?", a: "With layers: training from human feedback and written principles (like constitutional AI), red-teaming and dangerous-capability tests, monitoring after release, and interpretability research." },
      { q: "What is mechanistic interpretability?", a: "Reverse-engineering a neural network into understandable parts, such as features and circuits, to see which internal steps produce a behaviour." },
    ],
  },
  "/level/intermediate": {
    title: "Free Intermediate AI Course: Machine Learning and Neural Networks",
    description:
      "A free intermediate machine learning course in 14 short lessons: regression, gradient descent, overfitting, decision trees, backpropagation, CNNs, embeddings and how language models are tested. No sign-up.",
    answer:
      "This free intermediate AI course explains how machine learning actually works, with light maths and lots of pictures. In 14 short lessons you'll see how models learn by gradient descent, how to tell if a model is any good, and the classic architectures behind images, text and recommendations.",
    faqs: [
      { q: "What should I know before the intermediate level?", a: "Just the ideas from the Beginner level: what AI and machine learning are and how chatbots work. Maths is kept light, and optional Python examples run in your browser." },
      { q: "Is this a free machine learning course?", a: "Yes. Every lesson, quiz and interactive explainer is free with no sign-up, and each lesson links to the free open courses it builds on, like Google's Machine Learning Crash Course and fast.ai." },
      { q: "How long does the intermediate level take?", a: "Most lessons take six to eight minutes, so about two weeks at one lesson a night." },
    ],
  },
  "/level/advanced": {
    title: "Free Advanced AI Course: LLMs, Transformers, Fine-Tuning and Agents",
    description:
      "A free advanced AI course in 14 short lessons: transformers, how LLMs are trained, RAG and agents, LoRA fine-tuning, diffusion, reinforcement learning, alignment and scaling. Plain English, no sign-up.",
    answer:
      "This free advanced AI course explains how today's frontier models work, without a paywall or a PhD. In 14 short lessons you'll cover transformers, how LLMs are trained and aligned, retrieval and agents, efficient fine-tuning, diffusion models and reinforcement learning.",
    faqs: [
      { q: "Is there a free course on large language models?", a: "Yes. The Advanced level here covers LLMs from transformers to training, RAG, agents and fine-tuning, free and with no sign-up. For hands-on code, pair it with the free Hugging Face LLM Course or Andrej Karpathy's Zero to Hero." },
      { q: "Do I need to code for the advanced level?", a: "No. The lessons explain ideas in plain English with diagrams. Some include short optional Python examples that run in your browser." },
      { q: "What should I learn before the advanced level?", a: "The Intermediate level, or similar background: gradient descent, neural networks, embeddings and how models are evaluated." },
    ],
  },
  "/tracks/ai-for-everyone": {
    title: "AI for Everyone: A Free AI Course for Beginners (No Coding)",
    description:
      "A free AI for everyone course in 9 short lessons: what AI is, how ChatGPT works, how to write good prompts, how to spot AI fakes and use AI safely, and what AI means for jobs. No maths, no code.",
    answer:
      "AI for Everyone is a free beginner path for people with no technical background. In nine short lessons you'll learn what AI is, how chatbots like ChatGPT work, how to get good answers from them, how to spot AI-generated fakes and how to use AI safely at home and at work.",
    faqs: [
      { q: "Is there a free AI course for non-technical people?", a: "Yes. This track is written for complete beginners: plain English, pictures and quick checks, no maths or coding, and no sign-up." },
      { q: "How long does AI for Everyone take?", a: "About an hour in total, as nine lessons of five to ten minutes each. Most people do one a night." },
      { q: "Do I get a certificate?", a: "AI in Bed doesn't issue certificates. If you need one, see our guide to free AI courses with certificates, like Elements of AI." },
    ],
  },
};

/** Pages to link from the home page, blog and glossary, so Google sees them as important. */
export const popularGuides: { href: string; title: string; note: string }[] = [
  { href: "/learn-ai-in-30-days", title: "Learn AI in 30 days", note: "Free plan" },
  { href: "/tracks/ai-for-everyone", title: "AI for everyone: no coding needed", note: "Track" },
  { href: "/learn/beginner/meet-llms", title: "What is an LLM? How ChatGPT works", note: "Beginner" },
  { href: "/learn/beginner/prompting-well", title: "How to write good AI prompts", note: "Beginner" },
  { href: "/learn/intermediate/open-models", title: "Open-weight models: run AI yourself", note: "Intermediate" },
  { href: "/learn/advanced/training-llms", title: "How LLMs are trained", note: "Advanced" },
  { href: "/learn/advanced/efficient-finetuning", title: "LoRA and quantisation explained", note: "Advanced" },
  { href: "/learn/advanced/reinforcement-learning", title: "Reinforcement learning explained", note: "Advanced" },
  { href: "/learn/advanced/alignment-and-interpretability", title: "What is AI alignment?", note: "Advanced" },
  { href: "/level/intermediate", title: "Free machine learning course", note: "Level" },
  { href: "/level/advanced", title: "Free advanced AI course: LLMs and agents", note: "Level" },
];
