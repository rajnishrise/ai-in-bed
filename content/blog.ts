/**
 * Blog posts: answer-first explainers for the questions people type into
 * search engines and ask AI assistants. Plain data, like the lessons.
 *
 * Text supports **bold**, *italic*, `code` and [links](/path). A block is a
 * paragraph (string), a bulleted list (string[]), a numbered list ({ ol }) or
 * a highlighted note ({ tip }). Lessons are "level/slug" keys.
 */

import { morePosts } from "./blog-more";

export type BlogBlock = string | string[] | { ol: string[] } | { tip: string };

export type BlogSection = { heading: string; blocks: BlogBlock[] };

export type BlogPost = {
  slug: string;
  /** The page heading, phrased the way people ask. */
  title: string;
  /** The search title (the brand is added after it). */
  seoTitle: string;
  description: string;
  /** A short label shown above the title. */
  topic: string;
  published: string;
  updated?: string;
  /** Two to four sentences that answer the question on their own. */
  answer: string;
  takeaways: string[];
  sections: BlogSection[];
  faqs: { q: string; a: string }[];
  lessons: string[];
  sources: { title: string; url: string; by: string; note?: string }[];
};

export const posts: BlogPost[] = [
  {
    slug: "how-does-chatgpt-work",
    title: "How does ChatGPT work?",
    seoTitle: "How Does ChatGPT Work? A Simple Explanation for Beginners",
    description:
      "ChatGPT predicts the next word, one piece at a time, using a large language model trained on huge amounts of text and then tuned with human feedback. Here is how that works, in plain English.",
    topic: "How AI works",
    published: "2026-11-18",
    answer:
      "ChatGPT runs on a large language model (LLM): a neural network trained on a huge amount of text to predict the next token, a word or piece of a word. It writes every reply one token at a time, each time picking a likely next piece. Extra training with human feedback taught it to follow instructions and answer helpfully, which is why it feels like a conversation.",
    takeaways: [
      "At its core, ChatGPT predicts the next token, over and over, very well.",
      "It learns language and facts in pretraining, then learns to be a helpful assistant from example chats and human feedback.",
      "The transformer and its attention mechanism let it use the whole conversation when choosing each word.",
      "It can sound sure and still be wrong, so check anything that matters.",
    ],
    sections: [
      {
        heading: "It predicts the next word, very well",
        blocks: [
          "Type \"The capital of France is\" and ask what comes next. Almost anyone says \"Paris\". ChatGPT does something similar. It reads your text and works out how likely every possible next piece of text is, then picks one. Then it does it again, with that new piece added, until the answer is done.",
          "Those pieces are called **tokens**. A token is often a whole short word, sometimes part of a longer one: \"unbelievable\" might be split into \"un\", \"believ\" and \"able\". You can see how this works in the lesson on [tokenisation](/learn/intermediate/tokenisation), or read [what tokens are and how many words a token is](/blog/what-are-tokens-in-ai).",
          "The model doesn't always take the single most likely token. A setting called [temperature](/glossary/temperature) adds a little randomness, which is why you can ask the same question twice and get two different answers.",
          { tip: "Predicting the next word sounds simple. Doing it well across every topic means the model has to pick up grammar, facts, styles and a lot of reasoning patterns along the way." },
        ],
      },
      {
        heading: "Step 1: pretraining on a huge library of text",
        blocks: [
          "The model starts as a giant [neural network](/glossary/neural-network) with billions of adjustable numbers called parameters. At first it predicts nonsense.",
          "During pretraining it reads a vast amount of text from books, websites, code and other sources. For each snippet it guesses the next token, checks the real answer, and nudges its parameters so the right token becomes a little more likely next time. That nudging is [gradient descent](/learn/intermediate/gradient-descent), repeated trillions of times on thousands of chips.",
          "After pretraining the model is a powerful autocomplete. Ask it a question and it might continue with more questions, because that's what often follows a question on the web. It knows a lot, but it isn't yet an assistant.",
        ],
      },
      {
        heading: "Step 2: teaching it to be a helpful assistant",
        blocks: [
          "To turn autocomplete into ChatGPT, the model gets more training:",
          [
            "**Supervised fine-tuning.** People write example conversations showing good answers, and the model is trained on them. It learns the shape of a helpful reply.",
            "**Reinforcement learning from human feedback (RLHF).** The model writes several answers, people rank them, and a separate model learns to predict which answers people prefer. The chatbot is then trained to score well on that. OpenAI described this method in its 2022 InstructGPT paper.",
          ],
          "This stage is also where models learn to refuse harmful requests, admit uncertainty and follow a consistent style. Newer \"reasoning\" models get extra training that rewards working through a problem step by step before answering. Read more in the lesson on [training LLMs](/learn/advanced/training-llms).",
        ],
      },
      {
        heading: "The transformer: how it keeps track of meaning",
        blocks: [
          "The \"T\" in GPT stands for **transformer**, a design introduced by Google researchers in the 2017 paper \"Attention Is All You Need\". Its key idea is [attention](/glossary/attention): when the model looks at a word, it can weigh every other word in the text to work out what that word means here.",
          "In \"The cat sat on the mat because it was tired\", attention helps the model link \"it\" to \"the cat\", not \"the mat\". Stack dozens of these attention layers and the model can follow long, complicated text. The [transformers lesson](/learn/advanced/transformers) walks through it with pictures, and our guide to [transformers and attention](/blog/what-is-a-transformer) explains it step by step.",
        ],
      },
      {
        heading: "What happens when you send a message",
        blocks: [
          {
            ol: [
              "Your message, and the earlier messages in the chat, are turned into tokens.",
              "Everything fits in the model's [context window](/glossary/context-window), the amount of text it can look at once. Very long chats may push early messages out.",
              "The model predicts the reply one token at a time and streams it to your screen, which is why answers appear word by word.",
              "Some versions can also use tools: searching the web, running code or reading a file you upload, then using the results in the answer.",
            ],
          },
          "The model doesn't learn from your chat as you talk. Its parameters stay fixed while it answers. Some services may use conversations to train future models unless you turn that off, so check the privacy settings of the app you use.",
        ],
      },
      {
        heading: "Why ChatGPT sometimes gets things wrong",
        blocks: [
          "Because it predicts likely text rather than looking facts up, ChatGPT can produce fluent, confident answers that are false. This is called [hallucination](/glossary/hallucination), and we explain it fully in [why AI hallucinates](/blog/why-does-ai-hallucinate).",
          "Its knowledge also stops at a training cut-off date, unless it searches the web. And it can be swayed by how a question is phrased. Treat it like a fast, well-read helper whose work you still check.",
        ],
      },
      {
        heading: "Do Claude, Gemini and other chatbots work the same way?",
        blocks: [
          "Broadly, yes. Claude, Gemini, Llama, Mistral and most other chatbots are large language models built on the transformer, pretrained on large amounts of text and then tuned to be helpful. They differ in their training data, size, fine-tuning and safety work, and in the tools they can use, which is why they have different strengths. The lesson [meet the LLMs](/learn/beginner/meet-llms) compares them gently.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does GPT stand for?",
        a: "GPT stands for Generative Pre-trained Transformer: generative because it creates text, pre-trained because it first learns from a large amount of text, and transformer after the neural network design it uses.",
      },
      {
        q: "Does ChatGPT understand what it says?",
        a: "Researchers disagree on the right word. ChatGPT has no experiences or intentions, but to predict text well it builds internal patterns that capture a lot of meaning and reasoning. It can explain ideas well and still make mistakes no person with real understanding would make.",
      },
      {
        q: "Does ChatGPT search the internet?",
        a: "Not by default in every version. The model itself answers from what it learned in training. Some versions can run a web search and use the results, and they usually show links to the pages they used.",
      },
      {
        q: "Does ChatGPT learn from my conversations?",
        a: "Not during the conversation: the model's parameters don't change while it answers you. Some providers may use past conversations to train future models unless you opt out in the settings, so check before sharing anything private.",
      },
    ],
    lessons: ["beginner/meet-llms", "intermediate/tokenisation", "advanced/transformers", "advanced/training-llms"],
    sources: [
      { title: "[1hr Talk] Intro to Large Language Models", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g", by: "Andrej Karpathy", note: "Free video" },
      { title: "The Illustrated Transformer", url: "https://jalammar.github.io/illustrated-transformer/", by: "Jay Alammar" },
      { title: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762", by: "Vaswani et al., 2017" },
      { title: "Training language models to follow instructions with human feedback", url: "https://arxiv.org/abs/2203.02155", by: "Ouyang et al. (OpenAI), 2022" },
    ],
  },

  {
    slug: "ai-vs-machine-learning-vs-deep-learning",
    title: "AI vs machine learning vs deep learning: what's the difference?",
    seoTitle: "AI vs Machine Learning vs Deep Learning: The Difference, Simply Explained",
    description:
      "AI is the big goal, machine learning is one way to reach it, and deep learning is one kind of machine learning. A plain-English guide with everyday examples, including where generative AI fits.",
    topic: "AI basics",
    published: "2026-11-18",
    answer:
      "Artificial intelligence (AI) is the broad goal of making computers do things that normally need human intelligence. Machine learning is one way to get there: systems that learn patterns from data instead of following hand-written rules. Deep learning is a kind of machine learning that uses neural networks with many layers. Each one sits inside the one before, and generative AI, like ChatGPT, is built with deep learning.",
    takeaways: [
      "AI is the whole field; machine learning is a subset; deep learning is a subset of machine learning.",
      "Older AI followed rules people wrote. Machine learning learns the rules from examples.",
      "Deep learning took off around 2012 thanks to big datasets and fast graphics chips.",
      "Generative AI and large language models are uses of deep learning.",
    ],
    sections: [
      {
        heading: "Think of three circles, one inside the other",
        blocks: [
          "Picture a big circle labelled **AI**. Inside it sits a smaller circle, **machine learning**. Inside that sits a smaller one again, **deep learning**. Everything that is deep learning is also machine learning, and everything that is machine learning is also AI, but not the other way round.",
          [
            "**Artificial intelligence:** any technique that lets a computer do something we'd call intelligent, like planning, recognising speech or playing chess.",
            "**Machine learning:** AI that learns from data. Show it examples and it finds the patterns itself.",
            "**Deep learning:** machine learning with large neural networks made of many layers, good at messy data like images, sound and language.",
          ],
        ],
      },
      {
        heading: "Artificial intelligence: the big goal",
        blocks: [
          "The term \"artificial intelligence\" was coined for a 1956 summer workshop at Dartmouth College. For decades, much AI was built by hand: experts wrote thousands of if-then rules. These **expert systems** could diagnose some infections or configure computers, but they broke when the world didn't match the rules.",
          "A chess program that searches through possible moves is AI, even with no learning at all. So is the route planner in a sat-nav. The [history of AI lesson](/learn/beginner/history-of-ai) tells the story from those early days to today.",
        ],
      },
      {
        heading: "Machine learning: learning from examples",
        blocks: [
          "Writing rules for everything is impossible. How would you write rules to spot every spam email? [Machine learning](/glossary/machine-learning) flips the job around: you give the computer thousands of emails labelled \"spam\" or \"not spam\", and it learns the patterns that tell them apart.",
          "There are three main styles, covered in [three ways machines learn](/learn/beginner/three-ways-to-learn):",
          [
            "**Supervised learning:** learning from labelled examples, like spam filters or house-price predictions.",
            "**Unsupervised learning:** finding structure in unlabelled data, like grouping customers with similar habits.",
            "**Reinforcement learning:** learning by trial and error with rewards, like a program that learns to play a game.",
          ],
          "Many useful machine learning models are not deep at all. [Decision trees](/learn/intermediate/decision-trees) and [linear regression](/learn/intermediate/regression) are still used everywhere because they are fast and easy to explain.",
        ],
      },
      {
        heading: "Deep learning: neural networks with many layers",
        blocks: [
          "[Deep learning](/glossary/deep-learning) uses [neural networks](/learn/beginner/neural-networks-gently): layers of simple maths units loosely inspired by brain cells. \"Deep\" just means many layers. Early layers pick up simple patterns, like edges in a photo; later layers combine them into ears, faces and whole scenes. More in [how neural networks work](/blog/how-do-neural-networks-work).",
          "Neural networks are old, but they needed lots of data and computing power. Around 2012, a network called AlexNet, trained on graphics chips, won the ImageNet image-recognition contest by a wide margin. Since then deep learning has driven most AI breakthroughs: speech recognition, translation, self-driving research and chatbots.",
        ],
      },
      {
        heading: "Where generative AI and ChatGPT fit",
        blocks: [
          "[Generative AI](/blog/what-is-generative-ai) is AI that creates new text, images, audio or video. Today it is almost all deep learning. ChatGPT, Claude and Gemini are [large language models](/glossary/llm), very large deep learning models trained on text. So ChatGPT is AI, it is machine learning, and it is deep learning, all at once.",
          { tip: "A quick test: if a system learned from data, it's machine learning. If it learned with a big multi-layer neural network, it's deep learning." },
        ],
      },
      {
        heading: "Side by side",
        blocks: [
          [
            "**Rules or learning?** AI can use either. Machine learning and deep learning learn from data.",
            "**How much data?** Classic machine learning can work with hundreds or thousands of examples. Deep learning usually wants far more.",
            "**Explainable?** Rules and small models are easy to inspect. Deep networks are harder to explain, which is what [interpretability research](/glossary/interpretability) tries to fix.",
            "**Typical examples:** a chess engine (AI), a spam filter (machine learning), face unlock and ChatGPT (deep learning).",
          ],
        ],
      },
    ],
    faqs: [
      {
        q: "Is machine learning the same as AI?",
        a: "No. Machine learning is one part of AI. All machine learning is AI, but some AI, like a rule-based expert system or a chess engine that only searches moves, doesn't learn from data at all.",
      },
      {
        q: "Is ChatGPT machine learning or deep learning?",
        a: "Both. ChatGPT is a large language model, which is a deep learning model, and deep learning is a kind of machine learning. It is also, more broadly, AI.",
      },
      {
        q: "Should I learn machine learning before deep learning?",
        a: "It helps. Ideas like training data, loss, overfitting and gradient descent come from machine learning and carry straight over to deep learning. Many people learn the basics of both together.",
      },
      {
        q: "What is the difference between AI and data science?",
        a: "Data science is about getting insight from data, using statistics, visualisation and sometimes machine learning. AI is about building systems that act intelligently. They overlap in machine learning, which both fields use.",
      },
    ],
    lessons: ["beginner/what-is-ai", "beginner/how-machines-learn", "beginner/three-ways-to-learn", "beginner/neural-networks-gently", "beginner/history-of-ai"],
    sources: [
      { title: "Elements of AI", url: "https://www.elementsofai.com/", by: "University of Helsinki", note: "Free course" },
      { title: "Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course", by: "Google", note: "Free course" },
      { title: "Neural networks", url: "https://www.3blue1brown.com/topics/neural-networks", by: "3Blue1Brown", note: "Free videos" },
    ],
  },

  {
    slug: "how-to-learn-ai-for-free",
    title: "How to learn AI for free: a beginner's roadmap",
    seoTitle: "How to Learn AI for Free in 2026: A Step-by-Step Roadmap for Beginners",
    description:
      "A realistic, free roadmap to learn AI from scratch: understand the ideas first, learn to use AI tools well, then choose whether to build. With the best free courses for each step.",
    topic: "Learning AI",
    published: "2026-11-18",
    answer:
      "Start by learning what AI is and how it learns, which needs no maths or code. Next, practise using AI tools well. Then choose a direction: using AI in your work, or building AI, which means learning Python and machine learning basics. Ten to twenty minutes a day is enough to start, and everything you need is free, from Elements of AI and Google's Machine Learning Crash Course to fast.ai and Hugging Face.",
    takeaways: [
      "Learn the ideas before the code: it makes every later course easier.",
      "Using AI well is a real skill, and the quickest win for most people.",
      "Builders need Python, some maths and a project, in that order of urgency.",
      "Short, regular sessions beat weekend binges.",
    ],
    sections: [
      {
        heading: "Step 1: understand the big ideas (one to four weeks)",
        blocks: [
          "Before any code, get a feel for what AI is, how machines learn from data, what neural networks do and how chatbots like ChatGPT work. This is the part most people skip, and it's why so many give up on their first technical course.",
          [
            "The free [AI in Bed Beginner level](/level/beginner): ten-minute lessons with pictures and quick checks, made for a phone.",
            "[Elements of AI](https://www.elementsofai.com/) from the University of Helsinki: a gentle free course with a certificate.",
            "Our [AI vs machine learning vs deep learning](/blog/ai-vs-machine-learning-vs-deep-learning) guide, if the words still blur together.",
          ],
          { tip: "If you like structure, the [30-day plan](/learn-ai-in-30-days) takes you through every lesson one night at a time, with review nights built in." },
        ],
      },
      {
        heading: "Step 2: learn to use AI tools well",
        blocks: [
          "Most people will get more from AI by using it well than by building it. Learn to write clear prompts, give context, check answers and keep private data safe.",
          [
            "[Prompt engineering for beginners](/blog/prompt-engineering-for-beginners): eight techniques that reliably help.",
            "[Why AI hallucinates](/blog/why-does-ai-hallucinate), so you know when to double-check.",
            "The lessons on [prompting well](/learn/beginner/prompting-well), [AI at work](/learn/beginner/ai-at-work) and [using AI safely](/learn/beginner/using-ai-safely).",
          ],
          "Practise on your real tasks: summarising a report, planning a trip, drafting an email. You'll learn faster than with made-up exercises.",
        ],
      },
      {
        heading: "Step 3: decide where you're heading",
        blocks: [
          "Here the road splits. Both are worthwhile.",
          [
            "**AI user or professional.** You want to use AI in marketing, teaching, law, healthcare or management. Go deeper on prompting, AI tools in your field, risks and ethics. You can stop at no-code.",
            "**AI builder.** You want to make models or AI products: machine learning engineer, data scientist, AI developer. Carry on to step 4.",
          ],
        ],
      },
      {
        heading: "Step 4 (builders): Python, a little maths, then machine learning",
        blocks: [
          {
            ol: [
              "**Python.** It's the language of AI. Start with [Kaggle's free Python course](https://www.kaggle.com/learn/python) or the official [Python tutorial](https://docs.python.org/3/tutorial/). You need variables, loops, functions and lists, then the NumPy and pandas libraries.",
              "**Just enough maths.** Vectors and matrices, what a derivative is, and basic probability. Learn it alongside the code rather than first. Our guide [do you need maths to learn AI?](/blog/do-you-need-math-to-learn-ai) explains what matters and why.",
              "**Machine learning.** Google's [Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course) and [Kaggle Learn](https://www.kaggle.com/learn) are free and hands-on. Our [Intermediate level](/level/intermediate) covers the same ideas visually.",
              "**Deep learning.** [Practical Deep Learning for Coders](https://course.fast.ai/) from fast.ai starts with working code, and Andrej Karpathy's [Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html) builds a small GPT from scratch.",
              "**Language models and agents.** The free [Hugging Face LLM course](https://huggingface.co/learn/llm-course) and [agents course](https://huggingface.co/learn/agents-course), with our [Advanced level](/level/advanced) for the ideas.",
            ],
          },
        ],
      },
      {
        heading: "Step 5: build small things",
        blocks: [
          "Courses give you knowledge; projects make it stick and show others what you can do. Good first projects are small and personal:",
          [
            "A classifier that sorts your own photos or emails.",
            "A chatbot that answers questions about a document you care about, using [RAG](/blog/what-is-rag).",
            "A Kaggle competition entry, even if it ranks low.",
          ],
          "Share your work on GitHub with a short write-up of what you tried and what went wrong.",
        ],
      },
      {
        heading: "How long does it take to learn AI?",
        blocks: [
          "It depends on the goal. As a rough guide for someone studying a little each day: the core ideas take a few weeks, comfortable everyday use of AI tools takes a month or two of practice, and building machine learning models with Python takes several months. Job-ready skills usually take a year or more, and you keep learning after that, because the field moves fast.",
        ],
      },
      {
        heading: "Mistakes to avoid",
        blocks: [
          [
            "**Starting with heavy maths.** Many people quit before seeing anything work. Learn the ideas, then the maths you need.",
            "**Collecting courses.** Finishing one course beats starting five. Pick one per step.",
            "**Only watching.** Pause and try things. Run the code, change it, break it.",
            "**Chasing every new model.** The fundamentals change slowly. Learn them well and new releases make sense quickly.",
          ],
          "Want a certificate along the way? See our guide to [free AI courses with certificates](/free-ai-courses-with-certificates), or the full list of [the best free AI courses](/free-ai-courses).",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I learn AI without coding?",
        a: "Yes. You can understand how AI works and use it well with no coding at all. You only need code, usually Python, if you want to build or train models yourself.",
      },
      {
        q: "Can I learn AI on my own for free?",
        a: "Yes. Some of the best AI courses are free, including Elements of AI, Google's Machine Learning Crash Course, fast.ai, Kaggle Learn, Hugging Face courses and AI in Bed. Many universities also put their lectures online for free.",
      },
      {
        q: "How long does it take to learn AI?",
        a: "A few weeks for the core ideas, a month or two to use AI tools confidently, several months to build machine learning models with Python, and usually a year or more to be job-ready as a builder. It varies a lot with time and background.",
      },
      {
        q: "What is the best free AI course for beginners?",
        a: "For no maths or code, Elements of AI from the University of Helsinki and the AI in Bed Beginner level are good places to start. If you can code a little, Google's Machine Learning Crash Course and Kaggle Learn are excellent free next steps.",
      },
    ],
    lessons: ["beginner/what-is-ai", "beginner/prompting-well", "beginner/using-ai-safely", "intermediate/regression", "intermediate/gradient-descent"],
    sources: [
      { title: "Elements of AI", url: "https://www.elementsofai.com/", by: "University of Helsinki", note: "Free course with certificate" },
      { title: "Learn Python", url: "https://www.kaggle.com/learn/python", by: "Kaggle", note: "Free course" },
      { title: "Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course", by: "Google" },
      { title: "Practical Deep Learning for Coders", url: "https://course.fast.ai/", by: "fast.ai" },
      { title: "Neural Networks: Zero to Hero", url: "https://karpathy.ai/zero-to-hero.html", by: "Andrej Karpathy" },
    ],
  },

  {
    slug: "what-is-generative-ai",
    title: "What is generative AI? A simple guide with examples",
    seoTitle: "What Is Generative AI? A Simple Explanation with Examples",
    description:
      "Generative AI creates new text, images, code, audio and video from a prompt. Learn how it works, real examples, what it is good and bad at, and the risks to know.",
    topic: "AI basics",
    published: "2026-11-18",
    answer:
      "Generative AI is AI that creates new content, such as text, images, music, code or video, in response to a prompt. It learns patterns from huge collections of examples and then produces new material that follows those patterns. ChatGPT, Claude and Gemini generate text; image tools like Midjourney, DALL·E and Stable Diffusion generate pictures.",
    takeaways: [
      "Most AI sorts or predicts; generative AI makes something new.",
      "Text generators predict the next token; image generators turn noise into a picture step by step.",
      "It's great for drafts, ideas and variations, and weak at guaranteed facts.",
      "Watch for made-up facts, deepfakes, bias and privacy leaks.",
    ],
    sections: [
      {
        heading: "How generative AI differs from other AI",
        blocks: [
          "Much of the AI you meet every day makes a decision about something that already exists: is this email spam, which film will you like next, is that a cat in the photo. Generative AI does something different. You describe what you want, and it produces something that didn't exist before: a paragraph, a picture, a melody, a piece of code.",
          "It's built with [deep learning](/glossary/deep-learning): very large [neural networks](/glossary/neural-network) trained on millions or billions of examples. The model doesn't store and paste those examples. It learns the patterns behind them, then uses those patterns to make new ones.",
        ],
      },
      {
        heading: "How text generators work",
        blocks: [
          "Chatbots like ChatGPT, Claude and Gemini are [large language models](/glossary/llm). They write by predicting the next [token](/glossary/token), a word or part of a word, again and again. Training on a vast amount of text, then tuning with human feedback, makes those predictions useful and conversational. We explain the whole process in [how ChatGPT works](/blog/how-does-chatgpt-work).",
        ],
      },
      {
        heading: "How image generators work",
        blocks: [
          "Most image generators are [diffusion models](/glossary/diffusion-model). During training, the model sees real images with more and more random noise added, and learns to remove a little of that noise at each step.",
          "To make a new image, it starts from pure static and removes noise step by step, steered by your text prompt, until a picture appears. It's a bit like a sculptor finding a statue in a block of marble. See it happen in [how AI makes pictures](/learn/beginner/how-ai-makes-pictures) and, in more depth, the [diffusion lesson](/learn/advanced/diffusion).",
        ],
      },
      {
        heading: "Examples of generative AI",
        blocks: [
          [
            "**Text:** drafting emails, summarising reports, answering questions, translating, tutoring.",
            "**Images:** illustrations, product mock-ups, design ideas, photo editing such as filling in a background.",
            "**Code:** assistants that suggest and write code, explain errors and write tests.",
            "**Audio:** natural text-to-speech voices, music generation, voice cloning.",
            "**Video:** short clips generated from text or from a single image.",
          ],
          "Many newer models are [multimodal](/glossary/multimodal): one model that can read and produce several kinds of media, like describing a photo or answering a question about a chart. The lesson on [multimodal models](/learn/intermediate/multimodal-models) explains how.",
        ],
      },
      {
        heading: "What generative AI is good and bad at",
        blocks: [
          "It shines when there are many acceptable answers: first drafts, brainstorming, rewording, explaining a topic in a new way, or making variations of a design. It's fast and tireless.",
          "It struggles when there is exactly one right answer you can't easily check. It can invent facts, quotes and sources that sound real, called [hallucinations](/blog/why-does-ai-hallucinate). It can also miss things a human expert would catch, and image models still sometimes get small details wrong.",
          { tip: "A good rule: use generative AI to get to a first version faster, then use your own judgement to finish it." },
        ],
      },
      {
        heading: "Risks to know about",
        blocks: [
          [
            "**Made-up facts.** Fluent doesn't mean true. Check anything important.",
            "**Deepfakes.** Realistic fake images, audio and video can be used to mislead. Learn the warning signs in [spotting AI fakes](/learn/beginner/spotting-ai-fakes).",
            "**Bias.** Models learn from human data, so they can repeat its stereotypes.",
            "**Privacy.** Don't paste passwords, personal details or confidential work into tools you don't control.",
            "**Copyright.** Courts and lawmakers in several countries are still working out how copyright applies to training data and to AI-made work, so check the rules before using outputs commercially.",
          ],
        ],
      },
    ],
    faqs: [
      {
        q: "Is ChatGPT generative AI?",
        a: "Yes. ChatGPT is a generative AI chatbot built on a large language model. It generates new text, and some versions can also create images.",
      },
      {
        q: "What is the difference between AI and generative AI?",
        a: "AI is the whole field of making computers do intelligent tasks. Generative AI is the part of AI that creates new content, like text or images, rather than only classifying or predicting.",
      },
      {
        q: "Is generative AI the same as AGI?",
        a: "No. AGI, artificial general intelligence, means AI that can do most intellectual tasks as well as a person. Today's generative AI is impressive at many tasks but still makes basic mistakes, and whether or when AGI will arrive is debated.",
      },
      {
        q: "What are examples of generative AI tools?",
        a: "Text: ChatGPT, Claude, Gemini and open models like Llama. Images: Midjourney, DALL·E and Stable Diffusion. There are also generative tools for code, voices, music and video.",
      },
    ],
    lessons: ["beginner/meet-llms", "beginner/how-ai-makes-pictures", "advanced/diffusion", "beginner/spotting-ai-fakes", "intermediate/multimodal-models"],
    sources: [
      { title: "Hugging Face Diffusion Models Course", url: "https://huggingface.co/learn/diffusion-course", by: "Hugging Face", note: "Free course" },
      { title: "Denoising Diffusion Probabilistic Models", url: "https://arxiv.org/abs/2006.11239", by: "Ho, Jain and Abbeel, 2020" },
      { title: "Elements of AI", url: "https://www.elementsofai.com/", by: "University of Helsinki" },
    ],
  },

  {
    slug: "why-does-ai-hallucinate",
    title: "Why does AI hallucinate? And how to catch it",
    seoTitle: "Why Does AI Hallucinate? What AI Hallucinations Are and How to Avoid Them",
    description:
      "AI chatbots make things up because they are built to produce likely-sounding text, not to look facts up. Here is why hallucinations happen, when they're most likely, and how to reduce them.",
    topic: "Using AI well",
    published: "2026-11-18",
    answer:
      "AI chatbots hallucinate because they are trained to produce likely-sounding text, not to look facts up. When a model hasn't learned a fact well, it can still write a fluent, confident answer that fits the pattern of a right one. Training and testing have also tended to reward a confident guess over saying \"I don't know\". You can cut the risk by giving the AI sources, asking it to quote them and checking anything important.",
    takeaways: [
      "A hallucination is a confident answer that is false or made up.",
      "It happens because models predict plausible text rather than retrieve facts.",
      "Rare facts, exact numbers, quotes, citations and recent events are the danger zones.",
      "Give the model sources, let it say \"I don't know\", and verify what matters.",
    ],
    sections: [
      {
        heading: "What an AI hallucination looks like",
        blocks: [
          "A [hallucination](/glossary/hallucination) is when an AI states something false as if it were true. It isn't lying: it has no intention to deceive. It's producing text that looks right. Common examples:",
          [
            "A book, research paper or web link that doesn't exist.",
            "A quote someone never said.",
            "Wrong dates, statistics or prices, given with precision.",
            "A confident summary of a document that adds points the document never made.",
          ],
          "This has real consequences. In 2023 a US federal judge fined two lawyers who had filed a brief citing court cases that ChatGPT had invented.",
        ],
      },
      {
        heading: "Why it happens",
        blocks: [
          "A chatbot is a [large language model](/glossary/llm) that writes by predicting the next [token](/glossary/token). It learned from a huge amount of text, but it doesn't keep a tidy database of facts it can look up. Its knowledge is spread across billions of numbers, a bit like a very well-read person's fuzzy memory.",
          [
            "**Plausible beats true.** The model is trained to continue text in a likely way. A made-up citation can look exactly like a real one.",
            "**Rare facts are weak.** Things that appeared often in training, like the capital of France, are solid. A niche fact seen once or twice is easy to blur or invent.",
            "**Guessing gets rewarded.** In a September 2025 article, OpenAI argued that common tests score a confident guess better than \"I don't know\", so models learn to guess.",
            "**No live knowledge.** Without a search tool, the model knows nothing after its training cut-off, but may still answer as if it does.",
          ],
          { tip: "The model's tone tells you nothing about accuracy. A hallucinated answer sounds just as sure as a correct one." },
        ],
      },
      {
        heading: "When hallucinations are most likely",
        blocks: [
          [
            "Questions about obscure people, places or small companies.",
            "Exact figures, dates, quotes and references.",
            "Recent news, unless the tool searched the web.",
            "Long, multi-step answers, where one early mistake carries through.",
            "Questions with a false assumption built in, like asking why something happened when it didn't.",
          ],
        ],
      },
      {
        heading: "How to reduce hallucinations",
        blocks: [
          {
            ol: [
              "**Give it the source.** Paste the document or data and ask it to answer only from that. This is the idea behind [RAG](/blog/what-is-rag), retrieval-augmented generation, which you can try in the [RAG and agents lesson](/learn/advanced/rag-and-agents).",
              "**Ask for quotes and links.** Ask it to quote the exact passage it used. Then open the link or find the quote yourself.",
              "**Give it permission not to know.** Add \"If you're not sure, say so\" to your prompt.",
              "**Turn on search for current facts.** A tool that searches the web and shows its sources is far safer for recent events.",
              "**Ask again, differently.** If two phrasings give different answers, at least one is wrong.",
              "**Check what matters.** Health, money, legal and anything you'll publish deserve a reliable second source.",
            ],
          },
          "More prompting tips are in [prompt engineering for beginners](/blog/prompt-engineering-for-beginners) and the lesson on [using AI safely](/learn/beginner/using-ai-safely).",
        ],
      },
      {
        heading: "How AI companies are fixing it",
        blocks: [
          "Developers ground answers in search results or company documents, train models to express uncertainty and decline when unsure, and measure hallucination rates with [evals](/glossary/eval), test sets with known answers. [Reasoning models](/learn/advanced/reasoning-models) that check their own work can also help on some tasks. Hallucinations have become less frequent in newer models, but no model is free of them yet, so checking is still your job.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is an AI hallucination?",
        a: "An AI hallucination is when an AI system, usually a chatbot, states something false or made up as if it were fact, such as a fake quote, a wrong statistic or a source that doesn't exist.",
      },
      {
        q: "Why does ChatGPT make up sources?",
        a: "Because it predicts what a plausible reference looks like rather than looking one up. A made-up title, author and year can fit the pattern perfectly. Always open and check any source a chatbot gives you.",
      },
      {
        q: "Can AI hallucinations be completely fixed?",
        a: "Not yet. Grounding answers in real documents, web search and better training reduce them a lot, but every current language model can still be wrong. Checking important facts remains essential.",
      },
      {
        q: "Which AI hallucinates the least?",
        a: "It changes with every new model release and depends on the task. Models that search the web or answer from documents you provide, and that show their sources, are usually the most reliable for factual questions.",
      },
    ],
    lessons: ["beginner/using-ai-safely", "beginner/meet-llms", "advanced/rag-and-agents", "intermediate/testing-language-models"],
    sources: [
      { title: "Why language models hallucinate", url: "https://openai.com/index/why-language-models-hallucinate/", by: "OpenAI, September 2025" },
      { title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/", by: "DAIR.AI" },
      { title: "Hugging Face LLM Course", url: "https://huggingface.co/learn/llm-course", by: "Hugging Face", note: "Free course" },
    ],
  },

  {
    slug: "prompt-engineering-for-beginners",
    title: "Prompt engineering for beginners: 8 techniques that work",
    seoTitle: "Prompt Engineering for Beginners: 8 Techniques That Actually Work",
    description:
      "How to write better prompts for ChatGPT, Claude and Gemini: be specific, give context, show examples, set the format, ask for step-by-step thinking and iterate. With before-and-after examples.",
    topic: "Using AI well",
    published: "2026-11-18",
    answer:
      "Prompt engineering means writing instructions that get useful answers from an AI. The techniques that help most are: be specific about the task, give context and your goal, show an example, describe the format you want, break big jobs into steps, ask it to reason step by step, and refine the answer with follow-ups. Clear and specific beats clever tricks.",
    takeaways: [
      "Write prompts like a brief for a smart new colleague who knows nothing about your situation.",
      "Examples and a described format are the quickest upgrades.",
      "Big tasks work better as a chain of small ones.",
      "Treat the first answer as a draft and keep talking.",
    ],
    sections: [
      {
        heading: "What prompt engineering is",
        blocks: [
          "A [prompt](/glossary/prompt) is whatever you type to an AI. Prompt engineering is just the craft of writing prompts that get the result you want. You don't need code or special words. Think of it as briefing a capable assistant who has read almost everything but knows nothing about you, your audience or your goal.",
        ],
      },
      {
        heading: "1. Be specific",
        blocks: [
          "Vague prompts get generic answers. Compare:",
          [
            "**Weak:** \"Write about exercise.\"",
            "**Better:** \"Write a 150-word note for busy parents explaining why two 10-minute walks a day help, in a warm, encouraging tone.\"",
          ],
          "The second says who it's for, how long, what angle and what tone.",
        ],
      },
      {
        heading: "2. Give context and your goal",
        blocks: [
          "Tell it why you need the answer and what you'll do with it. \"I'm preparing for a job interview as a junior data analyst. Ask me five likely questions, one at a time, and give feedback on each answer\" works far better than \"interview questions\". Context helps the model make good choices you didn't spell out.",
        ],
      },
      {
        heading: "3. Set a role, if it helps",
        blocks: [
          "\"You are an experienced primary-school teacher\" can shift vocabulary and tone in a useful way. It isn't magic: it won't add knowledge the model lacks, and clear instructions matter more. Use roles to set the voice, not to replace the details.",
        ],
      },
      {
        heading: "4. Show an example",
        blocks: [
          "One or two examples of what you want are often worth a paragraph of description. This is called [few-shot prompting](/glossary/few-shot-prompting). For instance: \"Turn these notes into product descriptions. Here's one I like: ...\". The model copies the length, style and structure.",
        ],
      },
      {
        heading: "5. Describe the format",
        blocks: [
          "Say exactly what shape the answer should take: \"a table with columns for tool, price and best for\", \"three bullet points, under 15 words each\", or \"a short email with a subject line\". Asking for a specific length also stops answers from rambling.",
        ],
      },
      {
        heading: "6. Ask it to think step by step",
        blocks: [
          "For maths, logic or planning, ask the model to work through the problem before answering. Researchers at Google showed in 2022 that this [chain-of-thought](/glossary/chain-of-thought) prompting improves results on reasoning tasks. Newer [reasoning models](/learn/advanced/reasoning-models) do this on their own, so with them you can simply ask the question clearly.",
        ],
      },
      {
        heading: "7. Break big tasks into steps",
        blocks: [
          "Instead of \"write my business plan\", go in stages: first an outline, then each section, then a review. Each step's answer becomes the input to the next. You can correct course early, and the model does better on smaller, clearer jobs.",
        ],
      },
      {
        heading: "8. Iterate, and let it ask you questions",
        blocks: [
          "The first answer is a draft. Say what to change: \"shorter\", \"more formal\", \"add a real-world example\", \"you missed the budget limit\". Or start with: \"Before you answer, ask me any questions you need.\" The model will often ask exactly what you forgot to say.",
          { tip: "Paste in your own material, such as notes, a document or data, and ask it to work from that. It's the single best way to get accurate, relevant answers." },
        ],
      },
      {
        heading: "What doesn't matter as much as people think",
        blocks: [
          "Secret \"magic\" phrases, threats, offers of tips and ALL-CAPS demands rarely beat a clear, specific request. Saying what you *do* want also tends to work better than a long list of what you don't.",
        ],
      },
      {
        heading: "Stay safe while prompting",
        blocks: [
          [
            "Don't paste passwords, personal data or confidential work into tools you don't control.",
            "Check facts, figures and sources: models can [hallucinate](/blog/why-does-ai-hallucinate).",
            "If an AI reads web pages or emails for you, hidden text in them can try to hijack its instructions. This is called [prompt injection](/glossary/prompt-injection).",
          ],
          "Practise these in the lesson on [prompting well](/learn/beginner/prompting-well), and see how they apply to everyday tasks in [AI at work](/learn/beginner/ai-at-work).",
        ],
      },
    ],
    faqs: [
      {
        q: "What is prompt engineering in simple terms?",
        a: "Prompt engineering is writing clear instructions for an AI so it gives you the answer you want. It means saying what the task is, who it's for, what context matters and what format you need.",
      },
      {
        q: "Do I need coding skills for prompt engineering?",
        a: "No. Prompting is written in plain language. Coding only helps if you want to build apps that send prompts automatically.",
      },
      {
        q: "Do these techniques work for ChatGPT, Claude and Gemini?",
        a: "Yes. Being specific, giving context, showing examples, setting the format and iterating help with every major chatbot. Each provider also publishes its own free prompting guide with tips for its models.",
      },
      {
        q: "Is prompt engineering still useful with newer AI models?",
        a: "Yes, though it has changed. Newer models need fewer tricks, but they still can't guess your goal, audience or constraints. Clear context and a good brief matter as much as ever.",
      },
    ],
    lessons: ["beginner/prompting-well", "beginner/ai-at-work", "advanced/reasoning-models", "beginner/using-ai-safely"],
    sources: [
      { title: "Prompt engineering overview", url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview", by: "Anthropic" },
      { title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/", by: "DAIR.AI" },
      { title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models", url: "https://arxiv.org/abs/2201.11903", by: "Wei et al. (Google), 2022" },
    ],
  },

  {
    slug: "do-you-need-math-to-learn-ai",
    title: "Do you need maths or coding to learn AI?",
    seoTitle: "Do You Need Math or Coding to Learn AI? What You Really Need",
    description:
      "You don't need maths or code to understand and use AI. To build it you need Python plus some linear algebra, calculus and probability. Here's what each is for, and free ways to learn them.",
    topic: "Learning AI",
    published: "2026-11-18",
    answer:
      "Not to understand or use AI: you can learn how it works and use it well with no maths or code. To build AI models, you'll want Python and three areas of maths at roughly late-school to early-university level: linear algebra (vectors and matrices), calculus (derivatives, for gradient descent) and probability and statistics. You can learn them as you go rather than all up front.",
    takeaways: [
      "Understanding and using AI needs no maths or code.",
      "Building AI needs Python and a working grasp of three areas of maths.",
      "Libraries do the heavy calculations; you need the intuition.",
      "Learn the maths alongside code, when you need it.",
    ],
    sections: [
      {
        heading: "It depends what you want to do",
        blocks: [
          [
            "**Understand and use AI.** No maths or code. You need clear explanations and practice. This is where most people should start, and where our [Beginner level](/level/beginner) lives.",
            "**Build with AI.** Using AI services in apps, or fine-tuning existing models: you need Python and a light touch of maths. See [how to become an AI engineer](/blog/how-to-become-an-ai-engineer).",
            "**Build models from scratch or do research.** You need solid maths, mostly linear algebra, calculus and probability, plus strong programming.",
          ],
        ],
      },
      {
        heading: "The maths, and where it shows up",
        blocks: [
          "Here's what each area does inside an AI model, which makes it much easier to learn:",
          [
            "**Linear algebra: vectors and matrices.** AI stores words, images and users as lists of numbers called vectors. Similar things get similar vectors: that's an [embedding](/blog/what-are-embeddings). A neural network layer is mostly multiplying a vector by a matrix.",
            "**Calculus: derivatives.** Training means repeatedly adjusting a model to make its errors smaller. A derivative says which way to adjust each number, and [gradient descent](/learn/intermediate/gradient-descent) follows it downhill. [Backpropagation](/learn/intermediate/backpropagation) is the chain rule applied efficiently.",
            "**Probability: uncertainty.** A chatbot chooses each next word from a probability distribution. Probability also explains [temperature](/glossary/temperature) and why models can be confidently wrong.",
            "**Statistics: measuring.** Judging whether a model is good, avoiding [overfitting](/learn/intermediate/overfitting), and understanding [precision](/glossary/precision) and [recall](/glossary/recall) all rely on statistics.",
          ],
          { tip: "You rarely do these calculations by hand. Libraries like NumPy and PyTorch do them. What you need is the intuition: what a gradient means, why vectors that point the same way are similar." },
        ],
      },
      {
        heading: "How much coding you need",
        blocks: [
          "Python is the standard language for AI. For most practical work you need:",
          [
            "Python basics: variables, loops, functions, lists and dictionaries.",
            "**NumPy** for working with arrays of numbers, and **pandas** for tables of data.",
            "**scikit-learn** for classic machine learning, and **PyTorch** for deep learning.",
          ],
          "That's a few months of steady practice for a beginner. You can try small runnable Python examples right in the browser in lessons like [regression](/learn/intermediate/regression).",
        ],
      },
      {
        heading: "Ways in if you're not a maths person",
        blocks: [
          [
            "**Go top-down.** fast.ai's free course starts with working models and adds theory later, which suits many people better than starting with equations.",
            "**Learn visually.** 3Blue1Brown's videos on neural networks, linear algebra and calculus build intuition with animation.",
            "**Learn the maths for a reason.** When a lesson mentions gradients, that's the moment to learn derivatives.",
            "**No-code tools.** Many AI tools let you train simple models or build AI workflows without code, a good way to learn the ideas.",
          ],
        ],
      },
      {
        heading: "Free resources for the maths",
        blocks: [
          [
            "[Mathematics for Machine Learning](https://mml-book.github.io/): a free book covering exactly the linear algebra, calculus and probability ML uses.",
            "[3Blue1Brown](https://www.3blue1brown.com/): the Essence of Linear Algebra and Essence of Calculus video series.",
            "Google's [Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course): explains the maths as it's needed.",
          ],
          "For the full path from no background to building, see [how to learn AI for free](/blog/how-to-learn-ai-for-free).",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I learn AI without maths?",
        a: "Yes, to understand and use AI. You can learn how models learn, how chatbots work and how to use AI tools well with no maths. You'll need some maths only if you want to build or research models.",
      },
      {
        q: "What maths do I need for machine learning?",
        a: "Mainly linear algebra (vectors and matrices), calculus (derivatives and the chain rule), and probability and statistics. Roughly late-school to first-year university level covers most practical machine learning.",
      },
      {
        q: "Is Python required for AI?",
        a: "Not to use AI, but Python is the standard language for building it. Nearly all major AI libraries, including PyTorch, TensorFlow, scikit-learn and Hugging Face Transformers, are used mainly from Python.",
      },
      {
        q: "Am I too old or too bad at maths to learn AI?",
        a: "No. Many people learn AI later in life, and the intuition matters more than calculation speed. Start with the ideas, then learn the maths slowly, alongside small coding projects.",
      },
    ],
    lessons: ["beginner/how-machines-learn", "intermediate/gradient-descent", "intermediate/embeddings", "intermediate/regression", "intermediate/backpropagation"],
    sources: [
      { title: "Mathematics for Machine Learning", url: "https://mml-book.github.io/", by: "Deisenroth, Faisal and Ong", note: "Free PDF" },
      { title: "Neural networks", url: "https://www.3blue1brown.com/topics/neural-networks", by: "3Blue1Brown", note: "Free videos" },
      { title: "Practical Deep Learning for Coders", url: "https://course.fast.ai/", by: "fast.ai" },
      { title: "Learn Python", url: "https://www.kaggle.com/learn/python", by: "Kaggle" },
    ],
  },

  {
    slug: "what-is-an-ai-agent",
    title: "What is an AI agent? A simple explanation with examples",
    seoTitle: "What Is an AI Agent? Simple Explanation, Examples and How They Work",
    description:
      "An AI agent is an AI that takes actions toward a goal: it plans, uses tools like search or code, checks the results and keeps going. How agents work, real examples and the risks.",
    topic: "How AI works",
    published: "2026-11-18",
    answer:
      "An AI agent is an AI system that works toward a goal by taking actions, not just answering questions. It's usually a large language model running in a loop: it decides on a step, uses a tool such as web search, code or an app, looks at the result and decides what to do next, until the task is done. A chatbot answers; an agent acts.",
    takeaways: [
      "Agents = a language model + tools + a loop of plan, act and observe.",
      "Tools let agents search, run code, read files and use apps.",
      "Mistakes can add up over many steps, so oversight matters.",
      "Give agents only the access they need, and check before anything irreversible.",
    ],
    sections: [
      {
        heading: "Chatbot vs agent",
        blocks: [
          "Ask a chatbot \"what's a good flight to Rome next Friday?\" and it gives you advice. Ask an agent, and it might search flight sites, compare prices, check your calendar and come back with options, perhaps even book one if you've allowed it. The difference is **action**: an [agent](/glossary/agent) can do things in the world through tools, over several steps, on its own.",
        ],
      },
      {
        heading: "How an AI agent works: think, act, observe",
        blocks: [
          "Most agents follow a simple loop, described in the 2022 ReAct research paper:",
          {
            ol: [
              "**Think.** The language model reads the goal and everything so far, and decides the next step.",
              "**Act.** It calls a tool: searches the web, runs some code, reads a file, sends a request to an app.",
              "**Observe.** The tool's result is added to the model's context.",
              "**Repeat** until the goal is met, or it decides to ask you.",
            ],
          },
          "The model never touches the outside world directly. It writes a structured request, like \"search: flights Rome Friday\", and the surrounding program carries it out. Open standards such as the Model Context Protocol (MCP) make it easier to plug the same tools into different AI apps. The [agents in depth lesson](/learn/advanced/agents-in-depth) goes further.",
        ],
      },
      {
        heading: "What \"tools\" means",
        blocks: [
          [
            "**Search and browsing:** find and read current information.",
            "**Code:** run calculations, analyse data, test software.",
            "**Files and documents:** read your reports, spreadsheets or a company knowledge base, often through [RAG](/blog/what-is-rag).",
            "**Apps:** calendars, email, shops, project trackers, through their APIs.",
            "**The computer itself:** some agents can look at a screen and click and type like a person.",
          ],
        ],
      },
      {
        heading: "Examples of AI agents",
        blocks: [
          [
            "**Coding agents** that read a codebase, make changes, run the tests and fix what fails.",
            "**Research agents** that search many sources and write a summary with citations.",
            "**Customer support agents** that look up an order, check the policy and issue a refund within set limits.",
            "**Personal assistants** that sort your inbox, draft replies and schedule meetings.",
            "**Data agents** that query a database, make charts and explain the trend.",
          ],
        ],
      },
      {
        heading: "Why agents are hard to get right",
        blocks: [
          [
            "**Errors compound.** A small mistake at step 3 can derail step 10. Long tasks fail more often than short ones.",
            "**Hallucinations can turn into actions.** A made-up fact in a chat is annoying; an agent acting on it can cost money.",
            "**Prompt injection.** A web page or email an agent reads can contain hidden instructions trying to hijack it. See [prompt injection](/glossary/prompt-injection).",
            "**Cost and speed.** Many steps means many model calls.",
          ],
          { tip: "The safe pattern: give an agent only the access it needs, log what it does, and have a person approve anything that can't be undone, like payments, deletions or messages to other people." },
        ],
      },
      {
        heading: "Agents vs workflows",
        blocks: [
          "Not everything needs a fully independent agent. Anthropic's guide \"Building effective agents\" separates **workflows**, where the steps are fixed in code and the model fills them in, from **agents**, where the model decides the steps itself. Workflows are more predictable; agents are more flexible. Many good products start simple and add autonomy only where it helps.",
          "To see how agents fit with retrieval and reasoning, read [RAG and agents](/learn/advanced/rag-and-agents) and [reasoning models](/learn/advanced/reasoning-models). New to the basics? Start with [how ChatGPT works](/blog/how-does-chatgpt-work).",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between an AI agent and a chatbot?",
        a: "A chatbot answers in conversation. An AI agent works toward a goal by taking actions with tools, such as searching, running code or using apps, over several steps, deciding what to do next based on the results.",
      },
      {
        q: "Is ChatGPT an AI agent?",
        a: "Plain ChatGPT chat is a chatbot. When it searches the web, runs code or completes multi-step tasks with tools on its own, it is acting as an agent. Many AI assistants now have both modes.",
      },
      {
        q: "What are examples of AI agents?",
        a: "Coding agents that edit and test software, research agents that search and summarise sources, support agents that look up orders and process refunds, and assistants that manage email and calendars.",
      },
      {
        q: "Are AI agents safe?",
        a: "They can be, with limits. Give agents only the permissions they need, keep logs, watch for prompt injection in content they read, and require human approval for actions that can't be undone.",
      },
    ],
    lessons: ["advanced/rag-and-agents", "advanced/agents-in-depth", "advanced/reasoning-models", "beginner/using-ai-safely"],
    sources: [
      { title: "Building effective agents", url: "https://www.anthropic.com/engineering/building-effective-agents", by: "Anthropic" },
      { title: "ReAct: Synergizing Reasoning and Acting in Language Models", url: "https://arxiv.org/abs/2210.03629", by: "Yao et al., 2022" },
      { title: "Hugging Face AI Agents Course", url: "https://huggingface.co/learn/agents-course", by: "Hugging Face", note: "Free course" },
      { title: "Model Context Protocol", url: "https://modelcontextprotocol.io/", by: "Open standard" },
    ],
  },
  ...morePosts,
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** All the readable text of a post, for word counts, search and term matching. */
export function postText(p: BlogPost): string {
  const block = (b: BlogBlock) =>
    typeof b === "string" ? b : Array.isArray(b) ? b.join(" ") : "ol" in b ? b.ol.join(" ") : b.tip;
  return [p.answer, ...p.sections.flatMap((s) => [s.heading, ...s.blocks.map(block)]), ...p.takeaways]
    .join("\n")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*`]/g, "");
}

export const postMinutes = (p: BlogPost) =>
  Math.max(3, Math.round(`${postText(p)} ${p.faqs.map((f) => `${f.q} ${f.a}`).join(" ")}`.split(/\s+/).length / 200));

/** Newest first. */
export const sortedPosts = [...posts].sort((a, b) => b.published.localeCompare(a.published));
