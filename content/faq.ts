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

/** Questions on the 30-day plan. */
export const planFaqs: Faq[] = [
  {
    q: "Can you really learn AI in 30 days?",
    a: "You can learn how AI works in 30 days: what machine learning is, how neural networks learn, how chatbots and large language models work, and how to use them well and safely. Becoming an engineer who builds models takes longer, but this is the right foundation.",
  },
  {
    q: "How much time does the plan take each day?",
    a: `About ${Math.round(totalMinutes / 25)} minutes on a lesson night and ten minutes on a review night. Most nights are one or two short lessons you can read on your phone.`,
  },
  {
    q: "Do I need to know maths or coding?",
    a: "No. The first two weeks need no maths or code at all. Later lessons use light maths and optional Python examples that run in your browser.",
  },
  {
    q: "What if I miss a day?",
    a: "Just pick up where you left off. The plan remembers which lessons you have finished in this browser, and the Continue button always takes you to the next one.",
  },
  {
    q: "Is the 30-day AI plan free?",
    a: "Yes. Every lesson, quiz and review night is free with no sign-up. Your progress is saved only in your own browser.",
  },
  {
    q: "What should I learn after 30 days?",
    a: "Pick a longer free course for your goal: Google's Machine Learning Crash Course for hands-on basics, fast.ai's Practical Deep Learning for building models, or the Hugging Face LLM Course for working with large language models.",
  },
];

/** Questions on the certificates guide. */
export const certificateFaqs: Faq[] = [
  {
    q: "Can I get a free AI certificate?",
    a: "Yes. Elements of AI from the University of Helsinki, Harvard's CS50 Introduction to Artificial Intelligence with Python, Kaggle Learn, IBM SkillsBuild and several Hugging Face courses give a certificate or digital badge at no cost when you complete the work.",
  },
  {
    q: "What is the best free AI certificate for beginners?",
    a: "Elements of AI. It needs no maths or coding, takes a few weeks of part-time study, and the University of Helsinki issues a free certificate when you pass the exercises. IBM SkillsBuild's AI Fundamentals is a shorter option with a free digital badge.",
  },
  {
    q: "Are free AI certificates worth it?",
    a: "They show an employer you finished structured work, which helps most when you are starting out. Skills you can demonstrate, such as a project or a Kaggle notebook, count for more than the certificate itself.",
  },
  {
    q: "Is there a free AI certificate from Harvard?",
    a: "Yes. CS50's Introduction to Artificial Intelligence with Python is free, and CS50 issues a free certificate when you complete all the projects. A paid verified certificate is also available through edX.",
  },
  {
    q: "Does AI in Bed give a certificate?",
    a: "No formal certificate. Each level ends with a final check and a card you can share. Many people use AI in Bed to understand the ideas first, then take one of the free certificate courses on this page.",
  },
];
