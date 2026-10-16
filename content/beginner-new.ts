import type { Lesson } from "./types";

/** Beginner lessons added in round three: history, everyday AI, jobs and pictures. */
export const beginnerNew: Lesson[] = [
  {
    slug: "history-of-ai",
    title: "A short history of AI",
    emoji: "📜",
    minutes: 6,
    summary: "From a thought experiment in 1950 to chatbots in your pocket: the big moments, the long winters and why it all sped up.",
    blocks: [
      {
        kind: "p",
        text: "AI feels brand new, but people have been working on it for over seventy years. The story is not a straight line. It is a series of big hopes, long disappointments and a few sudden leaps.",
      },
      {
        kind: "card",
        title: "Where it began",
        body: [
          "In 1950 the mathematician Alan Turing asked a simple question: can machines think? He suggested a game instead of a definition. If a person chatting by text can't tell a machine from a human, perhaps that is good enough. We now call this the **Turing test**.",
          "In 1956 a small group of researchers met for a summer workshop at Dartmouth College in the USA. The name \"artificial intelligence\" comes from their proposal, and many people treat that summer as the birth of the field.",
        ],
      },
      {
        kind: "p",
        text: "Here are the big moments, in order:",
      },
      {
        kind: "list",
        items: [
          "**1950:** Turing publishes \"Computing Machinery and Intelligence\".",
          "**1956:** The Dartmouth workshop gives the field its name.",
          "**1970s:** Early promises go unmet and funding dries up: the first **AI winter**.",
          "**1980s:** **Expert systems** boom: programs built from hand-written rules by human experts.",
          "**Late 1980s to early 1990s:** Expert systems prove costly and brittle. A second winter follows.",
          "**1997:** IBM's Deep Blue beats world chess champion Garry Kasparov.",
          "**2012:** A neural network called AlexNet wins the ImageNet image recognition contest by a wide margin. Deep learning takes off.",
          "**2016:** DeepMind's AlphaGo beats Lee Sedol, one of the world's best Go players.",
          "**2017:** Google researchers publish the **transformer**, the design behind today's chatbots.",
          "**2022:** OpenAI releases ChatGPT, and AI chat reaches the public almost overnight.",
        ],
      },
      {
        kind: "tip",
        text: "An AI winter is a bit like a garden in January. Nothing much seems to grow, but researchers kept quietly planting ideas that bloomed decades later.",
      },
      {
        kind: "quiz",
        question: "What was an \"AI winter\"?",
        options: [
          "A season when computers ran too cold to work",
          "A period when hype faded and funding and interest in AI dropped",
          "The name of an early chess program",
          "A winter school where AI was invented",
        ],
        answer: 1,
        explain: "When early promises weren't met, money and enthusiasm dried up for years. It happened twice before the modern boom.",
      },
      {
        kind: "card",
        title: "Rules versus learning",
        body: [
          "Expert systems tried to write intelligence down as rules: \"if the patient has a fever and a rash, consider measles\". This worked in narrow areas, but the real world has too many exceptions to list.",
          "Modern AI flips the approach. Instead of writing rules, we show a system lots of examples and let it learn the patterns itself.",
        ],
      },
      {
        kind: "card",
        title: "Why it sped up after 2012",
        body: [
          "The ideas behind neural networks are decades old. What changed was three things arriving together: huge amounts of data from the internet, powerful graphics chips that could do the maths quickly, and better training methods.",
        ],
      },
      {
        kind: "quiz",
        question: "Which event in 2012 is often seen as the start of the deep learning boom?",
        options: [
          "Deep Blue beating Kasparov at chess",
          "The release of ChatGPT",
          "AlexNet winning the ImageNet contest",
          "The Dartmouth workshop",
        ],
        answer: 2,
        explain: "AlexNet beat the other entries by a large margin, which convinced many researchers that deep neural networks were the way forward.",
      },
    ],
    takeaways: [
      "AI began as a research field in the 1950s, with Turing and the Dartmouth workshop.",
      "Hand-written rules hit their limits, leading to two AI winters.",
      "Data, fast chips and better methods made learning from examples work, from AlexNet to ChatGPT.",
    ],
    sources: [
      { title: "History of artificial intelligence", url: "https://en.wikipedia.org/wiki/History_of_artificial_intelligence", by: "Wikipedia" },
      { title: "The Turing Test", url: "https://plato.stanford.edu/entries/turing-test/", by: "Stanford Encyclopedia of Philosophy" },
      { title: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762", by: "Vaswani et al., 2017", note: "The transformer paper" },
    ],
  },
  {
    slug: "everyday-ai",
    title: "AI you already use",
    emoji: "📱",
    minutes: 5,
    summary: "Long before chatbots, AI was quietly working in your phone, your inbox and your bank. A gentle tour of the hidden helpers.",
    blocks: [
      {
        kind: "p",
        text: "When people say \"AI\" they often mean chatbots. But you have probably used AI dozens of times today without noticing. Most of it works quietly in the background, making small guesses on your behalf.",
      },
      {
        kind: "card",
        title: "What to watch next",
        body: [
          "Streaming services, shops and social feeds use a **recommender system**: a program that guesses what you'll like based on what you and similar people have chosen before.",
          "Every click, skip and pause is a small clue it learns from.",
        ],
      },
      {
        kind: "card",
        title: "Your phone camera",
        body: [
          "Modern phones take several pictures in a split second and combine them. AI helps blend them, brighten dark scenes, blur the background in portrait mode and recognise faces so it can focus on them.",
        ],
      },
      {
        kind: "card",
        title: "Maps and travel times",
        body: [
          "Your maps app predicts how long a journey will take by learning from traffic patterns, the time of day and live data from other travellers. It then suggests a faster route if one appears.",
        ],
      },
      {
        kind: "quiz",
        question: "What does a recommender system do?",
        options: [
          "Writes reviews of films for you",
          "Guesses what you might like based on your past choices and those of similar people",
          "Checks that a website is safe",
          "Recommends which phone to buy, and nothing else",
        ],
        answer: 1,
        explain: "It looks for patterns in what you and people like you have picked, then suggests more of the same.",
      },
      {
        kind: "list",
        items: [
          "**Spam filters:** learn which emails look like junk and move them out of your inbox.",
          "**Autocomplete:** suggests the next word as you type a message or a search.",
          "**Voice assistants:** turn your speech into text, work out what you meant and reply.",
          "**Fraud detection:** your bank spots a payment that doesn't fit your usual pattern and asks you to confirm it.",
        ],
      },
      {
        kind: "tip",
        text: "Think of everyday AI as a very attentive shop assistant. It never sees the whole of you, only your habits, and it makes small, quick guesses from them.",
      },
      {
        kind: "p",
        text: "These systems are useful, but they also shape what you see. A feed that learns you like one kind of story may show you more and more of it. It is worth now and then searching for things yourself, rather than only following the suggestions.",
      },
      {
        kind: "quiz",
        question: "Your bank texts you to check a large payment abroad. What is most likely happening?",
        options: [
          "A person read every one of your payments",
          "A system noticed the payment didn't match your usual pattern",
          "The bank blocks all payments abroad",
          "Your phone's camera spotted something odd",
        ],
        answer: 1,
        explain: "Fraud detection learns what normal looks like for you and flags payments that stand out, so a human or you can check.",
      },
    ],
    takeaways: [
      "AI already runs quietly in recommendations, cameras, maps, inboxes and banks.",
      "Most of it learns from patterns in your behaviour and makes small guesses.",
      "It is helpful, but it also shapes what you see, so step outside the suggestions sometimes.",
    ],
    sources: [
      { title: "Elements of AI", url: "https://www.elementsofai.com/", by: "University of Helsinki & MinnaLearn" },
      { title: "Recommender system", url: "https://en.wikipedia.org/wiki/Recommender_system", by: "Wikipedia" },
      { title: "Computational photography", url: "https://en.wikipedia.org/wiki/Computational_photography", by: "Wikipedia" },
    ],
  },
  {
    slug: "ai-and-jobs",
    title: "Will AI take my job?",
    emoji: "🧑‍💼",
    minutes: 6,
    summary: "A calm, evidence-minded look at AI and work: tasks versus jobs, what history tells us, and which skills keep their value.",
    blocks: [
      {
        kind: "p",
        text: "It is a fair worry, and headlines don't help. The honest answer is that nobody knows exactly how things will unfold. But there are some useful ways to think about it that are calmer than most headlines.",
      },
      {
        kind: "card",
        title: "Jobs are bundles of tasks",
        body: [
          "A job is not one thing. A teacher plans lessons, marks work, explains ideas, notices a struggling pupil and talks to parents.",
          "AI might help with some of those tasks, such as drafting a worksheet, while others, like noticing that a child is upset, stay firmly human. Economists who study this usually look at tasks, not whole jobs.",
        ],
      },
      {
        kind: "card",
        title: "Helping versus replacing",
        body: [
          "**Automation** means a machine does a task instead of a person. **Augmentation** means a machine helps a person do the task better or faster.",
          "Many uses of AI today are closer to augmentation: a person still decides, checks and takes responsibility.",
        ],
      },
      {
        kind: "quiz",
        question: "What is the difference between automation and augmentation?",
        options: [
          "There is no difference",
          "Automation replaces a person on a task; augmentation helps a person do it",
          "Automation is for factories; augmentation is for offices",
          "Augmentation always means losing your job",
        ],
        answer: 1,
        explain: "Automation hands the task to the machine. Augmentation keeps the person in charge and makes them more capable.",
      },
      {
        kind: "card",
        title: "What history suggests",
        body: [
          "New technology has changed work many times: looms, tractors, computers, spreadsheets. Some jobs shrank sharply, and that was painful for the people in them.",
          "But new jobs also appeared, often ones nobody could have predicted. Cash machines were expected to wipe out bank tellers, yet in the United States teller jobs carried on for decades while the work shifted towards helping customers.",
        ],
      },
      {
        kind: "tip",
        text: "History is a guide, not a promise. AI may move faster than past changes, so it is sensible to stay curious and keep learning rather than to either panic or ignore it.",
      },
      {
        kind: "list",
        items: [
          "**Judgement:** deciding what matters and taking responsibility for it.",
          "**Working with people:** care, trust, teaching, persuading and calming things down.",
          "**Knowing your field well:** so you can spot when AI is confidently wrong.",
          "**Using AI tools well:** people who use AI effectively often outpace those who don't.",
        ],
      },
      {
        kind: "p",
        text: "A practical step: list the tasks in your own week. Mark which ones AI could draft, which it could help with, and which need you. That picture is usually more reassuring, and more useful, than any headline.",
      },
      {
        kind: "quiz",
        question: "Which approach is most likely to help you as AI changes your work?",
        options: [
          "Ignore AI and hope it goes away",
          "Assume your job will vanish and give up",
          "Learn which of your tasks AI can help with and build the skills it can't easily replace",
          "Let AI make all your decisions",
        ],
        answer: 2,
        explain: "Understanding your tasks and growing your judgement, people skills and AI know-how puts you in the strongest position.",
      },
    ],
    takeaways: [
      "AI changes tasks first; most jobs are bundles of tasks, not one thing.",
      "Past technologies removed some jobs but created others, though change can still be hard for individuals.",
      "Judgement, people skills, deep knowledge and using AI well tend to hold their value.",
    ],
    sources: [
      { title: "Why Are There Still So Many Jobs? The History and Future of Workplace Automation", url: "https://www.aeaweb.org/articles?id=10.1257/jep.29.3.3", by: "David Autor, Journal of Economic Perspectives, 2015" },
      { title: "AI for Everyone", url: "https://www.coursera.org/learn/ai-for-everyone", by: "Andrew Ng, DeepLearning.AI", note: "Free to audit" },
      { title: "Technological unemployment", url: "https://en.wikipedia.org/wiki/Technological_unemployment", by: "Wikipedia" },
    ],
  },
  {
    slug: "how-ai-makes-pictures",
    title: "How AI makes pictures",
    emoji: "🎨",
    minutes: 6,
    summary: "Type a sentence, get an image. A gentle, no-maths look at how image generators turn noise into pictures, and where they fall short.",
    blocks: [
      {
        kind: "p",
        text: "You type \"a fox reading a book under a lamp, watercolour style\" and a few seconds later there it is. It can feel like magic. The idea behind it is surprisingly gentle: start with static and tidy it up, one small step at a time.",
      },
      {
        kind: "card",
        title: "Learning from captioned pictures",
        body: [
          "Image generators are trained on a very large number of images, each paired with a short description. From these pairs the model learns how words connect to shapes, colours, textures and styles.",
          "It doesn't store the pictures like a photo album. It learns general patterns, such as what \"fox\" or \"watercolour\" tends to look like.",
        ],
      },
      {
        kind: "card",
        title: "Starting from noise",
        body: [
          "Most modern image generators are **diffusion models**. During training, the model sees pictures with random speckles of noise added, a little at a time, until they are pure static. Its job is to learn to undo that: to guess, at each step, what a slightly cleaner picture would look like.",
          "To make a new image, it begins with pure random noise and cleans it up step by step, guided by your words, until a picture appears.",
        ],
      },
      {
        kind: "interactive",
        id: "diffusion",
        caption: "Watch a picture emerge from noise as each clean-up step is applied.",
      },
      {
        kind: "tip",
        text: "It's a bit like a sculptor who sees a figure inside a block of marble and chips away, little by little. Your prompt tells the sculptor what to look for.",
      },
      {
        kind: "quiz",
        question: "How does a diffusion model make a new image?",
        options: [
          "It finds a matching photo online and copies it",
          "It starts from random noise and removes it step by step, guided by the prompt",
          "It draws lines one at a time like a pen plotter",
          "It glues together pieces of stored photos",
        ],
        answer: 1,
        explain: "It begins with static and repeatedly predicts a slightly cleaner version, steered by your text, until a picture forms.",
      },
      {
        kind: "card",
        title: "Where they still stumble",
        body: [
          "Image generators can struggle with exact counts, readable text, hands and complicated scenes with many objects in specific places. They can also repeat biases from their training images, such as who they picture as a doctor or a nurse.",
        ],
      },
      {
        kind: "card",
        title: "The copyright question",
        body: [
          "Many training images were collected from the internet, often without asking the artists. Whether that is allowed is being argued in courts and parliaments in several countries, and the answers are not settled yet.",
          "There are also open questions about who owns an AI-made picture. If you use these tools for work, check the tool's terms and your local rules.",
        ],
      },
      {
        kind: "quiz",
        question: "Which of these is a common weakness of AI image generators?",
        options: [
          "They can only make black and white images",
          "They need a camera to work",
          "They often get exact text, counts or hands wrong",
          "They can't follow any style",
        ],
        answer: 2,
        explain: "Precise details like spelling, numbers of objects and fingers are still tricky, though newer models are improving.",
      },
    ],
    takeaways: [
      "Image generators learn how words relate to pictures from huge sets of captioned images.",
      "Diffusion models start from noise and clean it up step by step, guided by your prompt.",
      "They still slip on fine details and raise unsettled questions about bias and copyright.",
    ],
    sources: [
      { title: "Denoising Diffusion Probabilistic Models", url: "https://arxiv.org/abs/2006.11239", by: "Ho, Jain & Abbeel, 2020" },
      { title: "High-Resolution Image Synthesis with Latent Diffusion Models", url: "https://arxiv.org/abs/2112.10752", by: "Rombach et al., 2022", note: "The paper behind Stable Diffusion" },
      { title: "Diffusion model", url: "https://en.wikipedia.org/wiki/Diffusion_model", by: "Wikipedia" },
    ],
  },
];
