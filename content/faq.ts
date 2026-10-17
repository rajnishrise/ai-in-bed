import { levels, totalLessons } from ".";

export type Faq = { q: string; a: string };

const totalMinutes = levels.reduce((n, l) => n + l.lessons.reduce((m, s) => m + s.minutes, 0), 0);
const hours = Math.round(totalMinutes / 60);

/** Questions on the home page. Plain text: the same words go into the FAQPage schema. */
export const homeFaqs: Faq[] = [
  {
    q: "Is AI in Bed really a free AI course?",
    a: `Yes. All ${totalLessons} lessons, quizzes, interactive explainers and learning tracks are free, with no sign-up, no paywall and no ads. Your progress is saved in your own browser.`,
  },
  {
    q: "Who is this AI course for?",
    a: "Anyone curious about artificial intelligence. The Beginner level assumes nothing, the Intermediate level covers how machine learning and neural networks work, and the Advanced level explains large language models, transformers, fine-tuning, agents and alignment. Tracks pick lessons for a goal, like using AI at work.",
  },
  {
    q: "Do I need maths or coding to learn AI here?",
    a: "No. Beginner lessons use plain English and pictures. Later lessons add light maths and optional Python examples that run right in your browser, so there is nothing to install.",
  },
  {
    q: "How long does it take to finish?",
    a: `Each lesson takes about five to ten minutes. The whole course is roughly ${hours} hours of reading, which most people spread over a few weeks of short evening sessions.`,
  },
  {
    q: "What will I learn?",
    a: "What AI is and isn't, how machines learn from data, neural networks and backpropagation, how ChatGPT-style chatbots and large language models work, prompting, embeddings, transformers and attention, retrieval-augmented generation (RAG), fine-tuning, AI agents, image generation with diffusion, and AI safety.",
  },
  {
    q: "Where does the material come from?",
    a: "Every lesson is an original, plain-English summary that credits and links to the free and open material it builds on, including Stanford courses, Google's Machine Learning Crash Course, fast.ai, Hugging Face, 3Blue1Brown and Andrej Karpathy.",
  },
  {
    q: "Do I get a certificate?",
    a: "There is no formal certificate. Each level ends with a final check and a card you can share. If you need a certificate, Elements of AI from the University of Helsinki and Kaggle Learn offer free ones; our free AI courses guide lists them.",
  },
  {
    q: "Can I learn on my phone or offline?",
    a: "Yes. AI in Bed is built for phones: lessons are swipeable cards and can be read aloud. You can install it on your home screen and save a whole level or track to read with no signal.",
  },
];

/** Questions on the free AI courses guide. */
export const coursesFaqs: Faq[] = [
  {
    q: "What is the best free AI course for complete beginners?",
    a: "Start with something short and non-technical: the AI in Bed Beginner level (ten-minute lessons, no maths) or Elements of AI from the University of Helsinki. Then move on to Google's Machine Learning Crash Course when you want hands-on practice.",
  },
  {
    q: "Are there free AI courses with a certificate?",
    a: "Yes. Elements of AI (University of Helsinki) and Kaggle Learn give free certificates of completion. Several Hugging Face courses, such as the AI Agents Course, also offer free certificates.",
  },
  {
    q: "Can I learn AI for free without coding?",
    a: "Yes. AI in Bed's Beginner level, Elements of AI and the Ethics of AI course need no code at all. 3Blue1Brown's neural network videos explain the ideas visually.",
  },
  {
    q: "How long does it take to learn AI?",
    a: "You can understand the core ideas in a few weeks of short daily sessions. Becoming a machine learning engineer takes months: a practical course like fast.ai's Practical Deep Learning, then Karpathy's Zero to Hero and the Hugging Face LLM Course.",
  },
  {
    q: "Which free course is best for generative AI and large language models?",
    a: "For understanding, the AI in Bed Advanced level. For building, the Hugging Face LLM Course and Andrej Karpathy's Neural Networks: Zero to Hero, where you build a GPT from scratch.",
  },
];
