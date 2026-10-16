import { beginnerMore } from "./beginner-more";
import { beginnerNew } from "./beginner-new";
import type { Level } from "./types";

export const beginner: Level = {
  id: "beginner",
  name: "Beginner",
  emoji: "🌙",
  tagline: "No maths, no code. Just the big ideas.",
  description:
    "Start here if AI feels like magic. You'll learn what AI actually is, how machines learn from examples, and how chatbots like ChatGPT and Claude work under the hood.",
  lessons: [
    {
      slug: "what-is-ai",
      title: "What is AI, really?",
      emoji: "🪆",
      minutes: 5,
      summary:
        "AI, machine learning, deep learning, generative AI: four words that fit inside each other like nesting dolls.",
      blocks: [
        {
          kind: "p",
          text: "People use \"AI\" to mean everything from a spam filter to a robot butler. Let's untangle it. **Artificial intelligence** is the broad goal: getting computers to do things we'd normally call intelligent, like recognising faces, translating languages, or planning a route.",
        },
        {
          kind: "figure",
          graphic: "ai-nesting",
          caption:
            "Each field is a smaller part of the one around it. Most AI news today is about the innermost circle.",
        },
        {
          kind: "card",
          title: "🤖 Artificial Intelligence",
          body: [
            "The whole umbrella. Early AI (1950s–1980s) was mostly **hand-written rules**: \"if the email contains 'lottery winner', mark it spam.\"",
            "Rules work until the world gets messy. Nobody can write rules for recognising every possible cat photo.",
          ],
        },
        {
          kind: "card",
          title: "📈 Machine Learning",
          body: [
            "Instead of writing rules, we show the computer **lots of examples** and let it figure out the rules itself.",
            "Show it 10,000 emails labelled spam or not-spam and it learns the patterns on its own.",
          ],
        },
        {
          kind: "card",
          title: "🧠 Deep Learning",
          body: [
            "Machine learning using **neural networks** with many layers. \"Deep\" just means lots of layers stacked up.",
            "This is what made computers suddenly good at images, speech and language from about 2012 onwards.",
          ],
        },
        {
          kind: "card",
          title: "✨ Generative AI",
          body: [
            "Deep learning models that **create** new things: text, images, music, code.",
            "Chatbots like ChatGPT, Claude and Gemini, and image tools like Stable Diffusion, all live here.",
          ],
        },
        {
          kind: "tip",
          text: "Pillow thought: a calculator follows rules someone wrote. A machine learning model writes its own rules by studying examples. That's the whole shift.",
        },
        {
          kind: "quiz",
          question:
            "A program that learns to spot spam by studying thousands of labelled emails is an example of…",
          options: [
            "Hand-written rules",
            "Machine learning",
            "A database",
            "Generative AI only",
          ],
          answer: 1,
          explain:
            "It learns the rules from examples instead of being told them, which is the definition of machine learning.",
        },
        {
          kind: "card",
          title: "🎯 Narrow vs. general AI",
          body: [
            "Every AI system that exists today is **narrow**: good at specific tasks. Even a chatbot that can write poems and code can't, say, ride a bike.",
            "**AGI** (artificial general intelligence) means a system as flexible as a human across almost any task. It's a goal and a debate, not a product you can buy.",
          ],
        },
        {
          kind: "quiz",
          question: "Which statement is true?",
          options: [
            "All deep learning is machine learning",
            "All machine learning is deep learning",
            "AI and deep learning mean exactly the same thing",
            "Generative AI doesn't use neural networks",
          ],
          answer: 0,
          explain:
            "Deep learning is a subset of machine learning, which is a subset of AI. The nesting only goes one way.",
        },
      ],
      takeaways: [
        "AI ⊃ Machine Learning ⊃ Deep Learning ⊃ Generative AI.",
        "Machine learning = learning rules from examples instead of writing them by hand.",
        "Every AI today is \"narrow\"; general AI is still a research goal.",
      ],
      sources: [
        {
          title: "Elements of AI: Introduction to AI",
          url: "https://www.elementsofai.com/",
          by: "University of Helsinki & MinnaLearn",
          note: "Free beginner course, no maths needed",
        },
        {
          title: "Machine Learning Crash Course",
          url: "https://developers.google.com/machine-learning/crash-course",
          by: "Google",
          note: "CC BY 4.0",
        },
      ],
    },
    {
      slug: "how-machines-learn",
      title: "How machines learn",
      emoji: "🔁",
      minutes: 5,
      summary:
        "Guess, check, adjust, repeat. Every model on Earth learns with the same simple loop.",
      blocks: [
        {
          kind: "p",
          text: "Imagine learning to throw a paper ball into a bin across the room. You throw, you miss to the left, you aim a little more right. Throw again. Closer. Adjust again. Machine learning is exactly that, done millions of times very fast.",
        },
        {
          kind: "figure",
          graphic: "learning-loop",
          caption:
            "The training loop: the model guesses, we measure how wrong it was, and nudge it to be a bit less wrong next time.",
        },
        {
          kind: "card",
          title: "1️⃣ The model makes a guess",
          body: [
            "A **model** is just a big mathematical function with lots of adjustable knobs called **parameters** (or weights).",
            "At the start the knobs are set randomly, so its guesses are rubbish.",
          ],
        },
        {
          kind: "card",
          title: "2️⃣ We measure the mistake",
          body: [
            "We compare the guess with the right answer. A **loss function** turns \"how wrong\" into a single number.",
            "Big number = very wrong. Small number = nearly right.",
          ],
        },
        {
          kind: "card",
          title: "3️⃣ We nudge the knobs",
          body: [
            "An algorithm works out which direction to turn each knob to make the loss smaller, and turns it a tiny bit.",
            "This is called **optimisation**. The most famous method is gradient descent (you'll meet it in Intermediate).",
          ],
        },
        {
          kind: "card",
          title: "4️⃣ Repeat… a lot",
          body: [
            "One pass through all the training data is an **epoch**. Models often train for many epochs.",
            "A big language model's knobs get nudged trillions of times during training.",
          ],
        },
        {
          kind: "quiz",
          question: "What does the loss function tell us?",
          options: [
            "How fast the computer is",
            "How wrong the model's guess was",
            "How many parameters the model has",
            "Which data to delete",
          ],
          answer: 1,
          explain:
            "The loss is a score for wrongness. Training is all about making it smaller.",
        },
        {
          kind: "card",
          title: "🏋️ Training vs. using",
          body: [
            "**Training** is the slow, expensive learning phase, where the knobs change.",
            "**Inference** is using the finished model. The knobs are frozen; it just answers. When you chat with an AI, you're doing inference.",
          ],
        },
        {
          kind: "tip",
          text: "Pillow thought: a model doesn't \"remember\" its training examples like a diary. It squeezes patterns from them into its knobs, a bit like how you remember the rules of grammar but not every sentence you ever read.",
        },
        {
          kind: "quiz",
          question: "When you ask a chatbot a question, the model is…",
          options: [
            "Training on your question",
            "Doing inference with frozen parameters",
            "Searching for the answer in its training data",
            "Rewriting its own code",
          ],
          answer: 1,
          explain:
            "Using a trained model is inference. Its parameters don't change while it answers you.",
        },
      ],
      takeaways: [
        "A model is a function with adjustable parameters.",
        "Training loop: predict → measure loss → adjust → repeat.",
        "Training changes the parameters; inference just uses them.",
      ],
      sources: [
        {
          title: "But what is a neural network? (video series)",
          url: "https://www.3blue1brown.com/topics/neural-networks",
          by: "3Blue1Brown (Grant Sanderson)",
          note: "Beautiful visual intuition",
        },
        {
          title: "ML Crash Course: Linear regression & loss",
          url: "https://developers.google.com/machine-learning/crash-course",
          by: "Google",
          note: "CC BY 4.0",
        },
      ],
    },
    {
      slug: "three-ways-to-learn",
      title: "Three ways to learn",
      emoji: "🧭",
      minutes: 5,
      summary:
        "Learning with answers, learning without answers, and learning by trial and error.",
      blocks: [
        {
          kind: "p",
          text: "Not every problem comes with an answer key. Depending on what data you have, machine learning comes in three main flavours.",
        },
        {
          kind: "figure",
          graphic: "three-learnings",
          caption:
            "Supervised learning has labels, unsupervised finds structure on its own, reinforcement learns from rewards.",
        },
        {
          kind: "card",
          title: "🏷️ Supervised learning",
          body: [
            "Every example comes with the right answer, called a **label**. Photo → \"cat\". House details → price.",
            "Predicting a category is **classification**. Predicting a number is **regression**.",
            "Most practical ML today is supervised.",
          ],
        },
        {
          kind: "card",
          title: "🔍 Unsupervised learning",
          body: [
            "No labels at all. The model looks for **structure** by itself.",
            "Example: grouping customers into types by shopping habits (**clustering**), without anyone saying what the types are.",
          ],
        },
        {
          kind: "card",
          title: "🎮 Reinforcement learning",
          body: [
            "An **agent** takes actions in an **environment** and gets **rewards** or penalties.",
            "No one tells it the right move; it learns which actions pay off over time. This is how AlphaGo learned to beat world champions at Go.",
          ],
        },
        {
          kind: "quiz",
          question:
            "You have 50,000 photos of skin spots, each labelled by a doctor as harmless or worrying. Which kind of learning fits?",
          options: [
            "Supervised",
            "Unsupervised",
            "Reinforcement",
            "None, you need rules",
          ],
          answer: 0,
          explain:
            "Each example has a label (the doctor's verdict), so this is supervised classification.",
        },
        {
          kind: "card",
          title: "🪄 Self-supervised: the secret behind chatbots",
          body: [
            "A clever trick: make labels out of the data itself. Hide the next word of a sentence and ask the model to guess it.",
            "The internet becomes one giant answer key. This is how large language models are pre-trained.",
          ],
        },
        {
          kind: "quiz",
          question:
            "A robot learns to walk by trying moves and getting points for staying upright. That's…",
          options: [
            "Supervised learning",
            "Unsupervised learning",
            "Reinforcement learning",
            "Clustering",
          ],
          answer: 2,
          explain:
            "Actions + rewards + trial and error = reinforcement learning.",
        },
      ],
      takeaways: [
        "Supervised: learn from labelled examples (classification or regression).",
        "Unsupervised: find hidden structure without labels.",
        "Reinforcement: learn actions from rewards.",
        "Self-supervised: make labels from the data itself, which is how LLMs pre-train.",
      ],
      sources: [
        {
          title: "Elements of AI, chapter 4: Machine learning",
          url: "https://www.elementsofai.com/",
          by: "University of Helsinki & MinnaLearn",
        },
        {
          title: "Kaggle Learn: Intro to Machine Learning",
          url: "https://www.kaggle.com/learn",
          by: "Kaggle",
          note: "Short free hands-on micro-courses",
        },
      ],
    },
    {
      slug: "neural-networks-gently",
      title: "Neural networks, gently",
      emoji: "🕸️",
      minutes: 6,
      summary:
        "Tiny calculators, wired in layers, that together can recognise a face or write a poem.",
      blocks: [
        {
          kind: "p",
          text: "Neural networks are loosely inspired by brains, but don't let the name intimidate you. Each \"neuron\" is a very simple calculator. The magic comes from wiring thousands or billions of them together.",
        },
        {
          kind: "figure",
          graphic: "neuron",
          caption:
            "One artificial neuron: multiply each input by a weight, add them up with a bias, then pass the total through an activation function.",
        },
        {
          kind: "interactive",
          id: "neuron",
          caption: "Play with one neuron: change the inputs, weights and bias and watch the output.",
        },
        {
          kind: "card",
          title: "⚖️ Weights: how much each input matters",
          body: [
            "Deciding whether to go for a run? Inputs: is it sunny, am I tired, is my friend coming.",
            "Each input gets a **weight**. Sunshine might matter a lot (big weight), tiredness might count against it (negative weight).",
          ],
        },
        {
          kind: "card",
          title: "➕ Add it up, then decide",
          body: [
            "The neuron adds up all the weighted inputs plus a **bias** (its baseline mood).",
            "Then an **activation function** decides how strongly to \"fire\". A popular one, ReLU, simply says: if the total is negative, output 0; otherwise pass it through.",
          ],
        },
        {
          kind: "card",
          title: "🥞 Layers make it powerful",
          body: [
            "Neurons are stacked in **layers**. The first layer sees raw input (pixels), middle (\"hidden\") layers build up features, and the last layer gives the answer.",
            "In an image model, early layers might detect edges, middle layers shapes like eyes, and later layers whole faces.",
          ],
        },
        {
          kind: "quiz",
          question: "What are a neural network's \"weights\"?",
          options: [
            "How heavy the computer is",
            "Numbers that set how much each input influences a neuron",
            "The number of layers",
            "The training data",
          ],
          answer: 1,
          explain:
            "Weights are the adjustable knobs (parameters). Training is the process of finding good weights.",
        },
        {
          kind: "tip",
          text: "Pillow thought: try it yourself tomorrow on TensorFlow Playground (link below). You can watch a tiny network learn to separate dots in your browser, no code needed.",
        },
        {
          kind: "card",
          title: "📏 How big are they?",
          body: [
            "A network that reads handwritten digits might have ~100,000 weights.",
            "Modern large language models have **billions to trillions**. Same idea, wildly bigger.",
          ],
        },
        {
          kind: "quiz",
          question:
            "Why do we need an activation function like ReLU between layers?",
          options: [
            "To make training slower",
            "To add non-linearity, so stacked layers can learn complex patterns",
            "To delete bad neurons",
            "It's only for decoration",
          ],
          answer: 1,
          explain:
            "Without a non-linear activation, any stack of layers collapses into one simple linear function. Activations let depth actually add power.",
        },
      ],
      takeaways: [
        "A neuron = weighted sum of inputs + bias → activation function.",
        "Layers build from simple features up to complex ones.",
        "Weights are learned during training.",
      ],
      sources: [
        {
          title: "Neural networks (chapters 1–4)",
          url: "https://www.3blue1brown.com/topics/neural-networks",
          by: "3Blue1Brown",
        },
        {
          title: "TensorFlow Playground",
          url: "https://playground.tensorflow.org/",
          by: "Daniel Smilkov & Shan Carter (Google)",
          note: "Apache 2.0, interactive in your browser",
        },
        {
          title: "Neural Networks and Deep Learning (free online book)",
          url: "http://neuralnetworksanddeeplearning.com/",
          by: "Michael Nielsen",
          note: "CC BY-NC 3.0",
        },
      ],
    },
    {
      slug: "data-is-everything",
      title: "Data is everything",
      emoji: "🗂️",
      minutes: 5,
      summary:
        "A model is only as good as what it learned from. Splits, bias, and why \"garbage in, garbage out\" still rules.",
      blocks: [
        {
          kind: "p",
          text: "Engineers joke that machine learning is 80% data cleaning and 20% complaining about data cleaning. It's funny because it's true: the data shapes everything a model will ever know.",
        },
        {
          kind: "card",
          title: "🧪 Never grade with the practice questions",
          body: [
            "If a student sees the exam answers while studying, a perfect score proves nothing.",
            "So we **split** data: most for training, some held back to check progress (validation), and some locked away for a final honest exam (test).",
          ],
        },
        {
          kind: "figure",
          graphic: "data-split",
          caption:
            "A common split. The test set is only opened once, at the very end.",
        },
        {
          kind: "quiz",
          question: "Why do we keep a separate test set?",
          options: [
            "To make training faster",
            "To measure how well the model handles data it has never seen",
            "Because the test data is better quality",
            "To store backups",
          ],
          answer: 1,
          explain:
            "The goal is to work on new, real-world data. Testing on unseen data is the honest way to estimate that.",
        },
        {
          kind: "card",
          title: "🗑️ Garbage in, garbage out",
          body: [
            "Wrong labels, duplicates, and missing values all teach the model wrong lessons.",
            "A smaller clean dataset often beats a bigger messy one.",
          ],
        },
        {
          kind: "card",
          title: "⚖️ Bias in, bias out",
          body: [
            "If a hiring model learns from past decisions that were unfair, it learns to be unfair too, and does it at scale.",
            "If a face-recognition dataset is mostly one skin tone, it will work worse for everyone else. Real systems have failed exactly this way.",
          ],
        },
        {
          kind: "tip",
          text: "Pillow thought: always ask \"who is missing from this data?\" It's one of the most useful questions in all of AI.",
        },
        {
          kind: "card",
          title: "🔢 Features",
          body: [
            "The pieces of information we feed a model are called **features**: for a house, things like size, location and age.",
            "Deep learning can learn its own features from raw data (pixels, words), which is a big reason it took off.",
          ],
        },
        {
          kind: "quiz",
          question:
            "A loan model was trained only on applicants from big cities. What's the most likely problem?",
          options: [
            "It will be too slow",
            "It may make poor or unfair predictions for rural applicants",
            "It will refuse to run",
            "Nothing, data location doesn't matter",
          ],
          answer: 1,
          explain:
            "Models struggle with groups they rarely saw during training. Unrepresentative data leads to unreliable or biased results.",
        },
      ],
      takeaways: [
        "Split data into train / validation / test, and keep the test set untouched.",
        "Data quality usually matters more than data quantity.",
        "Biased data produces biased models; ask who is missing.",
      ],
      sources: [
        {
          title: "ML Crash Course: Working with data & Fairness",
          url: "https://developers.google.com/machine-learning/crash-course",
          by: "Google",
          note: "CC BY 4.0",
        },
        {
          title: "Datasheets for Datasets",
          url: "https://arxiv.org/abs/1803.09010",
          by: "Gebru et al.",
          note: "Research paper on documenting datasets",
        },
        {
          title: "Ethics of AI (free course)",
          url: "https://ethics-of-ai.mooc.fi/",
          by: "University of Helsinki",
        },
      ],
    },
    {
      slug: "meet-llms",
      title: "Meet the chatbots: LLMs",
      emoji: "💬",
      minutes: 6,
      summary:
        "How ChatGPT, Claude and friends work: one word at a time, with surprising results.",
      blocks: [
        {
          kind: "p",
          text: "A **large language model** (LLM) is a neural network trained on a huge amount of text. Its core skill sounds almost too simple: given some text, predict what comes next.",
        },
        {
          kind: "figure",
          graphic: "next-token",
          caption:
            "The model scores every possible next token, picks one, appends it, and repeats.",
        },
        {
          kind: "interactive",
          id: "temperature",
          caption: "Temperature controls how adventurous the next-word pick is.",
        },
        {
          kind: "card",
          title: "🧩 Tokens, not words",
          body: [
            "Text is chopped into **tokens**: whole words, word pieces, or punctuation. \"unbelievable\" might become \"un\" + \"believ\" + \"able\".",
            "Roughly, 1 token ≈ ¾ of an English word.",
          ],
        },
        {
          kind: "card",
          title: "🎲 One token at a time",
          body: [
            "The model outputs a probability for every token in its vocabulary, picks one, adds it to the text, and runs again.",
            "A setting called **temperature** controls randomness: low = safe and predictable, high = more creative and more chaotic.",
          ],
        },
        {
          kind: "quiz",
          question: "At its core, what is an LLM trained to do?",
          options: [
            "Look up facts in a database",
            "Predict the next token in a sequence",
            "Translate only between two languages",
            "Copy and paste from websites",
          ],
          answer: 1,
          explain:
            "Next-token prediction, at enormous scale, is the foundation. Helpful chat behaviour is added later with extra training.",
        },
        {
          kind: "card",
          title: "🎓 From autocomplete to assistant",
          body: [
            "Step 1, **pre-training**: read a huge slice of the internet and books, predicting next tokens. Result: a brilliant but unruly autocomplete.",
            "Step 2, **fine-tuning**: train on example conversations and human feedback so it follows instructions and is helpful and safe.",
          ],
        },
        {
          kind: "card",
          title: "🌫️ Hallucinations",
          body: [
            "LLMs generate what *sounds* likely, not what is verified. Sometimes that's confidently wrong: a fake citation, an invented date.",
            "Always double-check facts that matter, especially names, numbers, quotes and sources.",
          ],
        },
        {
          kind: "card",
          title: "✍️ Prompting tips that actually work",
          body: [
            "**Be specific**: say who it's for, how long, what format.",
            "**Give context and examples** of what good looks like.",
            "**Ask it to think step by step** for reasoning tasks.",
            "**Iterate**: treat the first answer as a draft and refine.",
          ],
        },
        {
          kind: "tip",
          text: "Pillow thought: try asking an AI to \"explain backpropagation like I'm sleepy and in bed\". Then ask it again as \"a physics professor\". Same model, very different answers. That's prompting.",
        },
        {
          kind: "quiz",
          question:
            "An LLM gives you a book citation that sounds perfect. What should you do?",
          options: [
            "Trust it, LLMs don't make things up",
            "Verify it exists before relying on it",
            "Ask the same question again until it says yes",
            "Increase the temperature",
          ],
          answer: 1,
          explain:
            "LLMs can hallucinate plausible-looking references. Verify anything important.",
        },
      ],
      takeaways: [
        "LLMs predict the next token, one at a time.",
        "Pre-training makes them knowledgeable; fine-tuning makes them helpful.",
        "They can hallucinate, so verify facts that matter.",
        "Clear, specific prompts with context get better answers.",
      ],
      sources: [
        {
          title: "Intro to Large Language Models (1-hour talk)",
          url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
          by: "Andrej Karpathy",
        },
        {
          title: "Prompt Engineering Guide",
          url: "https://www.promptingguide.ai/",
          by: "DAIR.AI",
          note: "Open-source, MIT licensed",
        },
        {
          title: "Hugging Face LLM Course, chapter 1",
          url: "https://huggingface.co/learn/llm-course",
          by: "Hugging Face",
          note: "Apache 2.0",
        },
      ],
    },
    ...beginnerMore,
    ...beginnerNew,
  ],
};
