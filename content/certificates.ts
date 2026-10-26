/** Free AI courses that end in a certificate or badge, for /free-ai-courses-with-certificates. */
export type CertCourse = {
  title: string;
  url: string;
  by: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  /** What you get, and what it takes. */
  certificate: string;
  coding: boolean;
  why: string;
};

/** Checked October 2026. Terms change, so the page tells readers to confirm on the course site. */
export const certCourses: CertCourse[] = [
  {
    title: "Elements of AI",
    url: "https://www.elementsofai.com/",
    by: "University of Helsinki & MinnaLearn",
    level: "Beginner",
    certificate: "Free certificate from the University of Helsinki when you complete the exercises.",
    coding: false,
    why: "The gentlest full introduction, with no maths or code. Available in many languages.",
  },
  {
    title: "Ethics of AI",
    url: "https://ethics-of-ai.mooc.fi/",
    by: "University of Helsinki",
    level: "Beginner",
    certificate: "Free certificate of completion through the university's MOOC platform.",
    coding: false,
    why: "Fairness, accountability, transparency and privacy, for anyone deploying or affected by AI.",
  },
  {
    title: "Artificial Intelligence Fundamentals",
    url: "https://skillsbuild.org/",
    by: "IBM SkillsBuild",
    level: "Beginner",
    certificate: "Free digital badge (Credly) when you finish the learning plan.",
    coding: false,
    why: "A short tour of AI concepts, chatbots and AI ethics, with a badge you can add to LinkedIn.",
  },
  {
    title: "Kaggle Learn",
    url: "https://www.kaggle.com/learn",
    by: "Kaggle (Google)",
    level: "Beginner",
    certificate: "Free certificate for each short course, such as Intro to Machine Learning, when you finish its exercises.",
    coding: true,
    why: "Hands-on notebooks in the browser: Python, pandas, machine learning and deep learning in a few hours each.",
  },
  {
    title: "CS50's Introduction to Artificial Intelligence with Python",
    url: "https://cs50.harvard.edu/ai/",
    by: "Harvard University",
    level: "Intermediate",
    certificate: "Free CS50 certificate when you complete every project; a paid verified certificate is optional through edX.",
    coding: true,
    why: "Search, knowledge, probability, machine learning, neural networks and language, with real Python projects.",
  },
  {
    title: "Hugging Face AI Agents Course",
    url: "https://huggingface.co/learn/agents-course",
    by: "Hugging Face",
    level: "Advanced",
    certificate: "Free certificates for the fundamentals unit and for completing the course assignments.",
    coding: true,
    why: "Build tool-using AI agents with open frameworks, from the core loop to a final project.",
  },
  {
    title: "Hugging Face Deep RL Course",
    url: "https://huggingface.co/learn/deep-rl-course",
    by: "Hugging Face",
    level: "Advanced",
    certificate: "Free certificate of completion, and a certificate of excellence for higher scores on the hands-on units.",
    coding: true,
    why: "Reinforcement learning from Q-learning to PPO, training agents that play games.",
  },
];

/** Excellent free courses with no free certificate, so readers know the trade-off. */
export const noCertCourses = [
  { title: "Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course", by: "Google", note: "Free, no certificate." },
  { title: "Practical Deep Learning for Coders", url: "https://course.fast.ai/", by: "fast.ai", note: "Free, no certificate." },
  { title: "Neural Networks: Zero to Hero", url: "https://karpathy.ai/zero-to-hero.html", by: "Andrej Karpathy", note: "Free videos, no certificate." },
  { title: "Microsoft Azure AI Fundamentals (AI-900) learning path", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/", by: "Microsoft Learn", note: "Training is free; the certification exam is paid." },
];
