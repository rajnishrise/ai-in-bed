import type { Faq } from "./faq";

/**
 * Guide pages split out of the Library (/resources), one per kind of search that lands there:
 * free deep learning courses, machine learning courses, LLM courses, and the people behind
 * the best AI explainers. Picks name resources in content/resources.ts by exact title.
 */
export type GuidePick = {
  /** Who it suits, shown above the title. */
  for: string;
  /** A title from content/resources.ts, or an internal page with `href`. */
  title: string;
  href?: string;
  by?: string;
  why: string;
};

export type ResourceGuide = {
  slug: string;
  /** Search title; the page adds the year and " · AI in Bed". */
  title: string;
  h1: string;
  description: string;
  answer: string;
  picks: GuidePick[];
  faqs: Faq[];
};

export const resourceGuides: ResourceGuide[] = [
  {
    slug: "free-deep-learning-courses",
    title: "The Best Free Deep Learning Courses",
    h1: "The best free deep learning courses",
    description:
      "The best free deep learning courses and books online, ranked from first intuition to building models: 3Blue1Brown, fast.ai, MIT 6.S191, Stanford CS231n, Dive into Deep Learning and Karpathy's Zero to Hero.",
    answer:
      "The best free deep learning courses are fast.ai's Practical Deep Learning for Coders if you code, MIT 6.S191 for a full lecture course, and 3Blue1Brown's videos for intuition first. All of these are free to watch or read online; the list below says who each one suits.",
    picks: [
      { for: "No maths yet: build the intuition", title: "Neural Networks video series", why: "Four short animated videos that make neurons, gradient descent and backpropagation click." },
      { for: "A gentle start in plain English", title: "AI in Bed: Intermediate level", href: "/level/intermediate", by: "AI in Bed", why: "Fourteen ten-minute lessons on how neural networks learn, with interactive explainers and no sign-up." },
      { for: "Coders who want results fast", title: "Practical Deep Learning for Coders", why: "Top-down and code-first: you train image and text models in the first lessons, then learn why they work." },
      { for: "A full university course", title: "MIT 6.S191: Intro to Deep Learning", why: "Updated every year, with lectures and labs from basics to generative models." },
      { for: "Computer vision", title: "CS231n: Deep Learning for Computer Vision", why: "Stanford's famous notes on CNNs, backprop and training tricks." },
      { for: "A free textbook with code", title: "Dive into Deep Learning", why: "Interactive book with runnable PyTorch, JAX and TensorFlow for every chapter." },
      { for: "Learning from first principles", title: "Neural Networks and Deep Learning", why: "Michael Nielsen's free book builds a digit recogniser step by step." },
      { for: "Building a GPT from scratch", title: "Neural Networks: Zero to Hero", why: "Andrej Karpathy codes backprop, then a GPT, live in plain Python." },
      { for: "Short hands-on practice", title: "Kaggle Learn", why: "Bite-sized free notebooks, including an intro to deep learning, with free certificates of completion." },
    ],
    faqs: [
      { q: "Can I learn deep learning for free?", a: "Yes. The best deep learning courses, including fast.ai, MIT 6.S191, Stanford CS231n and Dive into Deep Learning, are free online. You only pay if you want a graded certificate from a platform like Coursera." },
      { q: "Which free deep learning course is best for beginners?", a: "Start with 3Blue1Brown's neural network videos for intuition, then fast.ai if you can code in Python, or MIT 6.S191 if you prefer lectures." },
      { q: "How long does it take to learn deep learning?", a: "A few weeks to understand the main ideas, and a few months of practice to build your own models. fast.ai's course is about 9 lessons of roughly 90 minutes plus practice." },
      { q: "Do I need a GPU to learn deep learning?", a: "No. Free notebooks on Google Colab and Kaggle give you a GPU in the browser for small projects." },
    ],
  },
  {
    slug: "free-machine-learning-courses",
    title: "The Best Free Machine Learning Courses for Beginners",
    h1: "The best free machine learning courses",
    description:
      "The best free machine learning courses for beginners and beyond: Google's Machine Learning Crash Course, Kaggle Learn, Stanford CS229, Elements of AI and the scikit-learn guide, picked by goal.",
    answer:
      "For most beginners, the best free machine learning course is Google's Machine Learning Crash Course: practical, interactive and openly licensed. Start with Elements of AI if you want no maths at all, and move on to Stanford CS229 for the theory.",
    picks: [
      { for: "No maths, no code", title: "Elements of AI", why: "The gentlest free introduction, from the University of Helsinki, with a free certificate." },
      { for: "Ten-minute lessons on your phone", title: "AI in Bed: Beginner level", href: "/level/beginner", by: "AI in Bed", why: "What AI and machine learning are, in plain English with pictures. Free, no sign-up." },
      { for: "Your first hands-on machine learning", title: "Machine Learning Crash Course", why: "Google's practical course with interactive visualisations and exercises." },
      { for: "Short Python practice", title: "Kaggle Learn", why: "Bite-sized courses in Python, pandas and machine learning that run in the browser." },
      { for: "Play before you code", title: "TensorFlow Playground", why: "Train a tiny neural network in your browser and watch it learn." },
      { for: "How it works, with light maths", title: "AI in Bed: Intermediate level", href: "/level/intermediate", by: "AI in Bed", why: "Regression, gradient descent, overfitting, decision trees and evaluation in short lessons." },
      { for: "The theory", title: "CS229: Machine Learning notes", why: "Stanford's classic notes on the maths of machine learning." },
      { for: "Doing it in practice", title: "scikit-learn User Guide", why: "The reference for classical algorithms and how to evaluate them." },
    ],
    faqs: [
      { q: "What is the best free machine learning course for beginners?", a: "Google's Machine Learning Crash Course for a practical start, or Elements of AI if you want no maths or code." },
      { q: "Can I learn machine learning without coding?", a: "You can learn the ideas without code: Elements of AI and AI in Bed's Beginner and Intermediate levels need none. To build models yourself you'll want basic Python." },
      { q: "Are there free machine learning courses with certificates?", a: "Yes. Elements of AI and Kaggle Learn give free certificates. See our guide to free AI courses with certificates for more." },
    ],
  },
  {
    slug: "free-llm-courses",
    title: "Free LLM Courses: Learn Large Language Models and Transformers",
    h1: "Free courses on LLMs and transformers",
    description:
      "The best free courses for learning large language models: Karpathy's Zero to Hero, the Hugging Face LLM and agents courses, Stanford CS224n, The Illustrated Transformer and more.",
    answer:
      "The best free way to learn how large language models work is Andrej Karpathy's Neural Networks: Zero to Hero, where you build a GPT yourself. For building apps with open models, take the free Hugging Face LLM Course; for the theory, Stanford CS224n's lectures are public.",
    picks: [
      { for: "How chatbots work, in plain English", title: "AI in Bed: Advanced level", href: "/level/advanced", by: "AI in Bed", why: "Transformers, LLM training, RAG, agents and fine-tuning in short lessons. No sign-up." },
      { for: "Seeing a transformer work", title: "The Illustrated Transformer", why: "Jay Alammar's famous visual walkthrough of attention and the transformer." },
      { for: "Playing with GPT-2 in the browser", title: "Transformer Explainer", why: "Type your own text and watch every step of a real model." },
      { for: "Building a GPT from scratch", title: "Neural Networks: Zero to Hero", why: "Karpathy codes a language model step by step in Python." },
      { for: "Building with open models", title: "Hugging Face LLM Course", why: "Transformers, tokenisers, fine-tuning and LLM apps with open tools." },
      { for: "Building agents", title: "Hugging Face AI Agents Course", why: "Tool-using agents with open frameworks, hands-on." },
      { for: "The university course", title: "CS224n: NLP with Deep Learning", why: "Stanford's lectures from word vectors to modern LLMs." },
      { for: "Getting better answers", title: "Prompt Engineering Guide", why: "Techniques and examples for prompting any LLM." },
    ],
    faqs: [
      { q: "Where can I learn about LLMs for free?", a: "Karpathy's Zero to Hero, the Hugging Face LLM Course and Stanford CS224n are all free. AI in Bed's Advanced level is a gentler, plain-English start." },
      { q: "Do I need to know deep learning before learning LLMs?", a: "For the ideas, no. To build or fine-tune models, it helps to know neural networks, backpropagation and embeddings first; see our free deep learning courses guide." },
      { q: "How long does it take to understand transformers?", a: "An evening with The Illustrated Transformer gives you the big picture. Building one yourself with Karpathy's videos takes a few weekends." },
    ],
  },
  {
    slug: "best-ai-blogs",
    title: "Best AI Blogs and Explainers: Lilian Weng, Jay Alammar, Chris Olah",
    h1: "The best AI blogs and explainers to follow",
    description:
      "The people who explain AI best, and where to read them for free: Lilian Weng's Lil'Log, Jay Alammar's illustrated guides, Chris Olah's blog, Andrej Karpathy, 3Blue1Brown and Distill.",
    answer:
      "The AI writers most worth reading for free are Lilian Weng (Lil'Log) for deep, well-referenced surveys, Jay Alammar for visual guides to transformers, Chris Olah for neural network explainers, and Andrej Karpathy for code-along videos. Each is listed below with where to start.",
    picks: [
      { for: "Lilian Weng · deep research surveys", title: "Lil'Log", why: "Long, carefully referenced posts on agents, diffusion, RL, hallucination and more, by a former OpenAI researcher. Start with \"LLM Powered Autonomous Agents\"." },
      { for: "Jay Alammar · visual guides", title: "The Illustrated Transformer", why: "The best-known picture-by-picture explanation of the transformer; his blog also illustrates BERT, GPT-2 and Stable Diffusion." },
      { for: "Chris Olah · explainers", title: "Understanding LSTM Networks", why: "One of the clearest explanations in machine learning, from a researcher who went on to co-found Anthropic and lead interpretability work." },
      { for: "Anthropic's interpretability team", title: "Transformer Circuits Thread", why: "Ongoing research on reverse-engineering what happens inside transformers." },
      { for: "Andrej Karpathy · code along", title: "Neural Networks: Zero to Hero", why: "Videos where he builds neural networks and a GPT from scratch in Python." },
      { for: "Grant Sanderson · animation", title: "Neural Networks video series", why: "3Blue1Brown's animations, the best visual intuition for neural nets and transformers." },
      { for: "Interactive articles", title: "Distill", why: "A journal of beautiful interactive explanations of how machine learning works." },
      { for: "Plain English, ten minutes at a time", title: "AI in Bed blog", href: "/blog", by: "AI in Bed", why: "Short, answer-first explainers of common AI questions." },
    ],
    faqs: [
      { q: "Who is Lilian Weng?", a: "An AI researcher, formerly at OpenAI, known for her blog Lil'Log, whose long posts on agents, diffusion models and reinforcement learning are widely used as study guides." },
      { q: "Who is Jay Alammar?", a: "A writer and educator known for The Illustrated Transformer and other visual guides to machine learning, and co-author of the book Hands-On Large Language Models." },
      { q: "What is the best blog to learn AI?", a: "For depth, Lil'Log. For pictures, Jay Alammar. For intuition from scratch, 3Blue1Brown. For short plain-English answers, the AI in Bed blog." },
    ],
  },
];

export const getGuide = (slug: string) => resourceGuides.find((g) => g.slug === slug);
