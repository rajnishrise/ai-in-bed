import type { Lesson } from "./types";

/** Everyday-AI lessons added in round two: using AI well, at work and safely. */
export const beginnerMore: Lesson[] = [
  {
    slug: "prompting-well",
    title: "Talking to AI: prompting well",
    emoji: "🗣️",
    minutes: 6,
    summary: "A chatbot is only as good as what you ask it. Five habits that turn vague answers into great ones.",
    blocks: [
      {
        kind: "p",
        text: "A **prompt** is everything you give a chatbot before it answers. The model has never met you, can't see your screen and doesn't know what you already tried. Most bad answers come from prompts that leave it guessing.",
      },
      {
        kind: "tip",
        text: "Imagine briefing a brilliant new colleague on their first day. They're quick and well read, but they know nothing about you, your project or your taste.",
      },
      {
        kind: "card",
        title: "1. Give context",
        body: [
          "Say who it's for and why. \"Explain inflation\" gets a textbook paragraph. \"Explain inflation to my 12-year-old who just asked why sweets cost more than last year\" gets something useful.",
        ],
      },
      {
        kind: "card",
        title: "2. Show an example",
        body: [
          "If you want a particular style or format, paste one. Models are excellent at copying a pattern they can see, and poor at guessing one they can't.",
          "This trick has a name: **few-shot prompting**. One or two examples often beat a paragraph of instructions.",
        ],
      },
      {
        kind: "card",
        title: "3. Say what good looks like",
        body: [
          "Length, tone, format, what to leave out. \"Three bullet points, plain English, no jargon, under 80 words\" is a complete spec in one line.",
        ],
      },
      {
        kind: "quiz",
        question: "Which prompt will most likely get the most useful answer?",
        options: [
          "Write an email",
          "Write a short, friendly email to my landlord asking to fix the boiler this week. Keep it under 100 words.",
          "EMAIL!!! URGENT!!!",
          "Can you maybe possibly help with something?",
        ],
        answer: 1,
        explain: "It says who it's for, what it's about, the tone and the length. The model doesn't have to guess anything.",
      },
      {
        kind: "card",
        title: "4. Ask it to think first",
        body: [
          "For maths, logic or tricky decisions, ask the model to work through the problem step by step before answering. Writing out the steps gives it room to catch its own mistakes.",
        ],
      },
      {
        kind: "card",
        title: "5. Iterate, don't restart",
        body: [
          "Treat the first answer as a draft. \"Shorter.\" \"Less formal.\" \"Why did you suggest that?\" The conversation is the tool.",
        ],
      },
      {
        kind: "p",
        text: "And always check facts that matter. A well-prompted model is still a model: it can sound certain and be wrong. That's called a **hallucination**.",
      },
      {
        kind: "quiz",
        question: "What is few-shot prompting?",
        options: [
          "Asking the same question several times",
          "Including a few examples of the output you want in the prompt",
          "Using very short prompts",
          "Training a new model from scratch",
        ],
        answer: 1,
        explain: "You show the model a couple of examples and it follows the pattern. It is one of the most reliable prompting tricks.",
      },
    ],
    takeaways: [
      "Context, examples and a clear picture of a good answer do most of the work.",
      "Ask for step-by-step thinking on hard problems.",
      "Iterate on the draft, and verify facts that matter.",
    ],
    sources: [
      { title: "Prompt Engineering Guide", url: "https://www.promptingguide.ai/", by: "DAIR.AI", note: "Free, MIT licensed" },
      { title: "Learn Prompting", url: "https://learnprompting.org/", by: "Learn Prompting", note: "Free beginner course" },
    ],
  },
  {
    slug: "ai-at-work",
    title: "AI at work: good at, bad at",
    emoji: "💼",
    minutes: 6,
    summary: "Where today's AI genuinely saves time, where it quietly makes things worse, and how to tell the difference.",
    blocks: [
      {
        kind: "p",
        text: "AI is not good or bad at \"work\". It is very good at some tasks inside a job and poor at others. The skill is splitting your work into tasks and handing over the right ones.",
      },
      {
        kind: "card",
        title: "Good at: first drafts",
        body: [
          "Emails, outlines, summaries, meeting notes, slide structure. A first draft in seconds that you then fix is often faster than a blank page.",
        ],
      },
      {
        kind: "card",
        title: "Good at: translating between forms",
        body: [
          "Turning notes into a table, jargon into plain English, a long report into five bullets, English into Spanish, a description into a spreadsheet formula.",
        ],
      },
      {
        kind: "card",
        title: "Bad at: facts you can't check",
        body: [
          "Ask for statistics, citations or legal details and it may invent convincing ones. Use AI to find and explain sources, then read the sources yourself.",
        ],
      },
      {
        kind: "card",
        title: "Bad at: knowing your context",
        body: [
          "It doesn't know your company's politics, last week's decision or what your boss really meant. That judgement is still yours.",
        ],
      },
      {
        kind: "quiz",
        question: "Which task is the best fit to hand to an AI assistant?",
        options: [
          "Deciding which employee to promote",
          "Turning your messy meeting notes into a tidy summary you then check",
          "Quoting the exact figure from a law you haven't looked up",
          "Signing a contract on your behalf",
        ],
        answer: 1,
        explain: "It's a transformation task with a human check at the end. The others need judgement, accountability or verified facts.",
      },
      {
        kind: "tip",
        text: "A useful rule: use AI where checking the answer is much faster than producing it yourself.",
      },
      {
        kind: "card",
        title: "Mind what you paste",
        body: [
          "Many workplaces have rules about what you may share with AI tools. Customer data, passwords and confidential plans usually shouldn't go into a public chatbot. Check your company's policy.",
        ],
      },
      {
        kind: "quiz",
        question: "Why is \"easy to check\" a good test for handing a task to AI?",
        options: [
          "Because AI is never wrong on easy tasks",
          "Because you can catch its mistakes cheaply, so you keep the time saved",
          "Because hard tasks are illegal for AI",
          "Because checking makes the AI learn",
        ],
        answer: 1,
        explain: "AI makes mistakes. When checking is quick you catch them and still come out ahead. When checking is as hard as doing, you've saved nothing.",
      },
    ],
    takeaways: [
      "Split jobs into tasks: drafting and reformatting suit AI; judgement and unchecked facts don't.",
      "Use AI where checking is faster than doing.",
      "Follow your workplace's rules on what data you share.",
    ],
    sources: [
      { title: "AI for Everyone", url: "https://www.coursera.org/learn/ai-for-everyone", by: "Andrew Ng, DeepLearning.AI", note: "Free to audit" },
      { title: "Elements of AI", url: "https://www.elementsofai.com/", by: "University of Helsinki & MinnaLearn" },
    ],
  },
  {
    slug: "spotting-ai-fakes",
    title: "Spotting AI fakes",
    emoji: "🕵️",
    minutes: 5,
    summary: "AI can make convincing photos, voices and articles. How to slow down, check the source and not get fooled.",
    blocks: [
      {
        kind: "p",
        text: "Generative AI can now produce a realistic photo of an event that never happened, clone a voice from a few seconds of audio, or write a fake news article in any style. A fake picture or video of a real person is called a **deepfake**.",
      },
      {
        kind: "card",
        title: "Looking for glitches isn't enough",
        body: [
          "Extra fingers and melted text used to be giveaways. Newer models rarely make those mistakes, so \"it looks real\" proves very little.",
          "The better question is not \"does it look fake?\" but \"where did it come from?\"",
        ],
      },
      {
        kind: "card",
        title: "The three-question check",
        body: [
          "**Who posted it first?** A named news organisation, or an anonymous account created last month?",
          "**Is anyone else reporting it?** Real big events get covered by several independent sources within hours.",
          "**Does it want you angry or scared?** Content designed to make you share fast deserves the slowest look.",
        ],
      },
      {
        kind: "quiz",
        question: "A shocking video of a politician is going viral. What's the most reliable first check?",
        options: [
          "Zoom in and look for blurry edges",
          "See whether reputable news outlets are reporting it and who posted it first",
          "Count how many likes it has",
          "Ask a chatbot whether it's real",
        ],
        answer: 1,
        explain: "Provenance and independent confirmation beat pixel-peeping. Likes measure popularity, not truth, and detectors are unreliable.",
      },
      {
        kind: "card",
        title: "Voice clones and scams",
        body: [
          "Scammers use cloned voices of family members asking for money urgently. Agree a family code word, and if a call feels off, hang up and call back on a number you know.",
        ],
      },
      {
        kind: "card",
        title: "Labels and watermarks",
        body: [
          "Some tools now add invisible watermarks or signed \"content credentials\" (the C2PA standard) that record how an image was made. They help when present, but their absence proves nothing.",
        ],
      },
      {
        kind: "tip",
        text: "If something online makes you instantly furious, that's the moment to wait ten minutes before sharing.",
      },
    ],
    takeaways: [
      "Realism is no longer evidence. Ask where content came from.",
      "Check who posted first and whether independent sources confirm it.",
      "Use a family code word against voice-clone scams.",
    ],
    sources: [
      { title: "News Literacy Project", url: "https://www.newslit.org/", by: "News Literacy Project", note: "Free resources" },
      { title: "C2PA: Content Credentials", url: "https://c2pa.org/", by: "Coalition for Content Provenance and Authenticity" },
      { title: "Ethics of AI (free course)", url: "https://ethics-of-ai.mooc.fi/", by: "University of Helsinki" },
    ],
  },
  {
    slug: "using-ai-safely",
    title: "Using AI wisely: privacy, bias, judgement",
    emoji: "🛡️",
    minutes: 5,
    summary: "The four habits that keep you in charge when you use AI: guard your data, expect bias, check facts, and own the decision.",
    blocks: [
      {
        kind: "p",
        text: "You don't need to understand transformers to use AI responsibly. You need a few habits, the same way you don't need to be a mechanic to drive safely.",
      },
      {
        kind: "card",
        title: "Guard your data",
        body: [
          "What you type into an AI service may be stored, reviewed by staff or used to improve future models, depending on the service and your settings.",
          "Read the privacy settings once, and keep medical details, passwords and other people's private information out unless you're sure how it's handled.",
        ],
      },
      {
        kind: "card",
        title: "Expect bias",
        body: [
          "Models learn from human writing, which carries human stereotypes. Ask for \"a picture of a doctor\" or \"a CEO\" and you may see the same narrow picture again and again.",
          "When an answer is about people, ask yourself who might be missing or misdescribed.",
        ],
      },
      {
        kind: "quiz",
        question: "Why might an AI image generator keep drawing the same kind of person for \"a nurse\"?",
        options: [
          "It's been told to by law",
          "It learned from data that over-represents certain people in that role",
          "Nurses all look the same",
          "Image models can only draw one face",
        ],
        answer: 1,
        explain: "Models reflect patterns in their training data, including stereotypes. That's bias in, bias out.",
      },
      {
        kind: "card",
        title: "Check what matters",
        body: [
          "For health, money and legal questions, use AI to understand the topic and prepare questions, then confirm with a trusted source or a professional.",
        ],
      },
      {
        kind: "card",
        title: "Own the decision",
        body: [
          "\"The AI said so\" isn't a reason. If you act on an answer, you're responsible for it. Use AI as an adviser, never as the person in charge.",
        ],
      },
      {
        kind: "quiz",
        question: "Which is the healthiest way to use AI for a health worry?",
        options: [
          "Follow its advice instead of seeing a doctor",
          "Use it to understand terms and prepare questions, then talk to a professional",
          "Never mention health to an AI under any circumstances",
          "Ask three chatbots and go with the majority",
        ],
        answer: 1,
        explain: "AI is great for understanding and preparing. Decisions about your health belong with you and a qualified professional.",
      },
    ],
    takeaways: [
      "Know what happens to the data you share.",
      "Expect bias, especially in answers about people.",
      "Verify high-stakes facts and keep the final decision yours.",
    ],
    sources: [
      { title: "Ethics of AI (free course)", url: "https://ethics-of-ai.mooc.fi/", by: "University of Helsinki" },
      { title: "AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework", by: "NIST", note: "Public domain" },
    ],
  },
];
