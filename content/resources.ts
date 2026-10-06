export type Resource = {
  title: string;
  url: string;
  by: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All levels";
  format: "Course" | "Book" | "Video" | "Interactive" | "Article" | "Paper";
  license?: string;
  blurb: string;
};

/** The open and free material this site's lessons are built on. */
export const resources: Resource[] = [
  { title: "Elements of AI", url: "https://www.elementsofai.com/", by: "University of Helsinki & MinnaLearn", level: "Beginner", format: "Course", blurb: "The gentlest free introduction to what AI is and isn't. No maths or code." },
  { title: "Ethics of AI", url: "https://ethics-of-ai.mooc.fi/", by: "University of Helsinki", level: "Beginner", format: "Course", blurb: "Fairness, accountability, transparency and the societal side of AI." },
  { title: "Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course", by: "Google", level: "Beginner", format: "Course", license: "CC BY 4.0", blurb: "Fast-paced, practical intro with interactive visualisations and exercises." },
  { title: "Neural Networks video series", url: "https://www.3blue1brown.com/topics/neural-networks", by: "3Blue1Brown", level: "Beginner", format: "Video", blurb: "The best visual intuition for neural nets, gradient descent, backprop and transformers." },
  { title: "TensorFlow Playground", url: "https://playground.tensorflow.org/", by: "Google", level: "Beginner", format: "Interactive", license: "Apache 2.0", blurb: "Train a tiny neural network in your browser and watch it learn." },
  { title: "Kaggle Learn", url: "https://www.kaggle.com/learn", by: "Kaggle", level: "Beginner", format: "Course", blurb: "Bite-sized hands-on courses in Python, pandas, ML and deep learning." },
  { title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/", by: "DAIR.AI", level: "Beginner", format: "Article", license: "MIT", blurb: "Techniques and examples for getting better results from LLMs." },
  { title: "Neural Networks and Deep Learning", url: "http://neuralnetworksanddeeplearning.com/", by: "Michael Nielsen", level: "Intermediate", format: "Book", license: "CC BY-NC 3.0", blurb: "A classic free book that builds a digit-recogniser from first principles." },
  { title: "Practical Deep Learning for Coders", url: "https://course.fast.ai/", by: "fast.ai (Jeremy Howard)", level: "Intermediate", format: "Course", license: "Apache 2.0 (code)", blurb: "Top-down, code-first: train state-of-the-art models from lesson one." },
  { title: "Dive into Deep Learning", url: "https://d2l.ai/", by: "Zhang, Lipton, Li & Smola", level: "Intermediate", format: "Book", license: "CC BY-SA 4.0", blurb: "Interactive textbook with runnable code in PyTorch, JAX and TensorFlow." },
  { title: "CS229: Machine Learning notes", url: "https://cs229.stanford.edu/", by: "Stanford University", level: "Intermediate", format: "Course", blurb: "The maths behind classical ML, from regression to SVMs." },
  { title: "CS231n: Deep Learning for Computer Vision", url: "https://cs231n.github.io/", by: "Stanford University", level: "Intermediate", format: "Course", blurb: "Superb notes on CNNs, backprop and training neural networks." },
  { title: "MIT 6.S191: Intro to Deep Learning", url: "http://introtodeeplearning.com/", by: "MIT", level: "Intermediate", format: "Course", blurb: "Yearly-updated lectures and labs covering the whole deep learning stack." },
  { title: "scikit-learn User Guide", url: "https://scikit-learn.org/stable/user_guide.html", by: "scikit-learn developers", level: "Intermediate", format: "Article", license: "BSD-3", blurb: "Practical reference for classical ML algorithms and evaluation." },
  { title: "CNN Explainer", url: "https://poloclub.github.io/cnn-explainer/", by: "Georgia Tech Polo Club", level: "Intermediate", format: "Interactive", license: "MIT", blurb: "Step inside a convolutional network, layer by layer." },
  { title: "Understanding LSTM Networks", url: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/", by: "Christopher Olah", level: "Intermediate", format: "Article", blurb: "The clearest explanation of LSTMs on the internet." },
  { title: "Distill", url: "https://distill.pub/", by: "Distill editors", level: "All levels", format: "Article", license: "CC BY 4.0", blurb: "Beautiful interactive research articles on how ML works." },
  { title: "Neural Networks: Zero to Hero", url: "https://karpathy.ai/zero-to-hero.html", by: "Andrej Karpathy", level: "Advanced", format: "Video", license: "MIT (code)", blurb: "Build backprop, then a GPT, from scratch in Python." },
  { title: "Hugging Face LLM Course", url: "https://huggingface.co/learn/llm-course", by: "Hugging Face", level: "Advanced", format: "Course", license: "Apache 2.0", blurb: "Transformers, tokenisers, fine-tuning and building LLM apps." },
  { title: "Hugging Face AI Agents Course", url: "https://huggingface.co/learn/agents-course", by: "Hugging Face", level: "Advanced", format: "Course", license: "Apache 2.0", blurb: "Build tool-using agents with open frameworks." },
  { title: "Hugging Face Diffusion Course", url: "https://huggingface.co/learn/diffusion-course", by: "Hugging Face", level: "Advanced", format: "Course", license: "Apache 2.0", blurb: "Theory and code for diffusion models." },
  { title: "Hugging Face Deep RL Course", url: "https://huggingface.co/learn/deep-rl-course", by: "Hugging Face", level: "Advanced", format: "Course", license: "Apache 2.0", blurb: "From Q-learning to PPO, with hands-on environments." },
  { title: "The Illustrated Transformer", url: "https://jalammar.github.io/illustrated-transformer/", by: "Jay Alammar", level: "Advanced", format: "Article", blurb: "The famous visual walkthrough of the transformer." },
  { title: "Transformer Explainer", url: "https://poloclub.github.io/transformer-explainer/", by: "Georgia Tech Polo Club", level: "Advanced", format: "Interactive", license: "MIT", blurb: "Watch GPT-2 process your own text in the browser." },
  { title: "CS224n: NLP with Deep Learning", url: "https://web.stanford.edu/class/cs224n/", by: "Stanford University", level: "Advanced", format: "Course", blurb: "Word vectors to transformers and LLMs, with public lectures." },
  { title: "Lil'Log", url: "https://lilianweng.github.io/", by: "Lilian Weng", level: "Advanced", format: "Article", blurb: "Deep, well-referenced posts on diffusion, agents, RL and more." },
  { title: "Reinforcement Learning: An Introduction", url: "http://incompleteideas.net/book/the-book-2nd.html", by: "Sutton & Barto", level: "Advanced", format: "Book", blurb: "The RL textbook, free online." },
  { title: "Spinning Up in Deep RL", url: "https://spinningup.openai.com/", by: "OpenAI", level: "Advanced", format: "Course", license: "MIT", blurb: "Concise intro to deep RL algorithms with clean implementations." },
  { title: "Transformer Circuits Thread", url: "https://transformer-circuits.pub/", by: "Anthropic", level: "Advanced", format: "Paper", blurb: "Research on reverse-engineering what happens inside transformers." },
  { title: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762", by: "Vaswani et al.", level: "Advanced", format: "Paper", blurb: "The 2017 paper that introduced the transformer." },
];
