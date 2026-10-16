import type { Lesson } from "./types";

/** Round-two intermediate lessons: testing LLMs, multimodal models, open models. */
export const intermediateMore: Lesson[] = [
  {
    slug: "testing-language-models",
    title: "How we test language models",
    emoji: "🧪",
    minutes: 7,
    summary: "Benchmarks, leaderboards, human votes and AI judges: how anyone decides one model is better than another, and why it's harder than it looks.",
    blocks: [
      {
        kind: "p",
        text: "For a spam filter, testing is easy: count right and wrong answers on held-out emails. For a chatbot that writes essays and code, \"right\" is fuzzy. The field uses several kinds of test, each with blind spots. A test suite for models is usually called an **eval**.",
      },
      {
        kind: "card",
        title: "Benchmarks",
        body: [
          "A fixed set of questions with known answers: maths problems, multiple-choice exams, coding tasks with unit tests. A **benchmark** gives one comparable number.",
          "Weakness: once a benchmark is famous, its questions leak onto the web and into training data. A model can score well by memory, not skill. This is called **contamination**.",
        ],
      },
      {
        kind: "card",
        title: "Human preference votes",
        body: [
          "Show people two anonymous answers to the same prompt and ask which is better. Thousands of votes produce a ranking, like chess ratings.",
          "Weakness: people favour confident, long, nicely formatted answers, even when a shorter one is more correct.",
        ],
      },
      {
        kind: "quiz",
        question: "Why can a model score highly on a famous benchmark without really having the skill?",
        options: [
          "Benchmarks are always too easy",
          "The test questions may have leaked into its training data",
          "Scores are made up by companies",
          "Models can see the answer key at test time",
        ],
        answer: 1,
        explain: "If the exact questions were in the training data, the model may recall answers rather than reason. Good evals keep fresh, private questions.",
      },
      {
        kind: "card",
        title: "AI as the judge",
        body: [
          "A strong model grades another model's answers against a rubric. It's cheap and fast, so teams can test thousands of cases on every change.",
          "Weakness: judges have biases too, such as preferring answers that sound like themselves. Teams spot-check a sample by hand.",
        ],
      },
      {
        kind: "card",
        title: "Your own evals beat leaderboards",
        body: [
          "If you build with AI, collect 50 to 100 real examples from your use case with what a good answer looks like. Run every model or prompt change against them. That tells you more than any public ranking.",
        ],
      },
      {
        kind: "code",
        title: "A tiny eval harness",
        code: "# Pretend model: answers arithmetic questions, but badly at big numbers.\ndef model(q):\n    a, b = map(int, q.split(\" + \"))\n    return a + b if a < 50 else a + b + 1\n\ntests = [(\"2 + 2\", 4), (\"10 + 7\", 17), (\"40 + 3\", 43), (\"75 + 5\", 80), (\"99 + 1\", 100)]\n\npassed = 0\nfor q, expected in tests:\n    got = model(q)\n    ok = got == expected\n    passed += ok\n    print(f\"{'PASS' if ok else 'FAIL'}  {q} = {got}  (expected {expected})\")\n\nprint(f\"score: {passed}/{len(tests)}\")",
        note: "Add your own test cases. Notice how a score alone hides where the model fails; reading the failures is where you learn.",
      },
      {
        kind: "quiz",
        question: "You're building a customer-support bot. What's the most useful way to compare two models?",
        options: [
          "Pick the one higher on a public leaderboard",
          "Run both on a set of your real support questions and compare the answers",
          "Choose the bigger one",
          "Ask each model which is better",
        ],
        answer: 1,
        explain: "Your own representative examples measure what you actually care about. Leaderboards measure someone else's task.",
      },
    ],
    takeaways: [
      "Benchmarks give comparable numbers but can be contaminated.",
      "Human votes and AI judges measure quality, each with their own biases.",
      "For real products, a small set of your own examples is the best eval.",
    ],
    sources: [
      { title: "HELM: Holistic Evaluation of Language Models", url: "https://crfm.stanford.edu/helm/", by: "Stanford CRFM" },
      { title: "LMArena", url: "https://lmarena.ai/", by: "LMArena", note: "Human-preference leaderboard" },
      { title: "The LLM Evaluation Guidebook", url: "https://github.com/huggingface/evaluation-guidebook", by: "Hugging Face", note: "Free" },
    ],
  },
  {
    slug: "multimodal-models",
    title: "Seeing and hearing: multimodal models",
    emoji: "🖼️",
    minutes: 6,
    summary: "How one model can read a photo, listen to speech and answer in words: everything becomes tokens.",
    blocks: [
      {
        kind: "p",
        text: "A **multimodal** model works with more than one kind of data: text, images, audio, sometimes video. The trick that makes it possible is simple: turn everything into the same currency, a sequence of vectors the transformer can attend over.",
      },
      {
        kind: "card",
        title: "Images become patches",
        body: [
          "A vision transformer cuts a picture into a grid of small squares, say 16 × 16 pixels each. Each patch is flattened and turned into an **embedding**, exactly like a word.",
          "To the transformer, a photo is just a sentence of a few hundred \"patch words\".",
        ],
      },
      {
        kind: "card",
        title: "Sound becomes pictures, then tokens",
        body: [
          "Speech models like Whisper turn audio into a spectrogram, a picture of which frequencies are loud over time, then process it much like an image.",
        ],
      },
      {
        kind: "quiz",
        question: "How does a vision transformer read an image?",
        options: [
          "It converts the image to text with OCR first",
          "It splits the image into patches and turns each into a vector, like word tokens",
          "It looks at one pixel at a time in order",
          "It can't; images need a separate non-transformer model",
        ],
        answer: 1,
        explain: "Patches become embeddings, and the transformer attends over them just as it attends over words.",
      },
      {
        kind: "card",
        title: "Teaching images and words to meet",
        body: [
          "CLIP, a 2021 model, was trained on hundreds of millions of image-caption pairs. It learned to put a photo of a dog and the words \"a photo of a dog\" close together in the same embedding space.",
          "That shared space lets you search photos with words, and lets text models \"see\".",
        ],
      },
      {
        kind: "card",
        title: "What they're good and bad at",
        body: [
          "Good: describing scenes, reading charts and handwriting, answering questions about screenshots.",
          "Still shaky: counting many small objects, exact spatial reasoning (\"is the cup left of the plate?\"), and reading tiny text.",
        ],
      },
      {
        kind: "quiz",
        question: "What did CLIP learn from image-caption pairs?",
        options: [
          "To generate videos",
          "A shared space where matching images and texts are close together",
          "To translate between languages",
          "To remove noise from photos",
        ],
        answer: 1,
        explain: "Contrastive training pulls matching image-text pairs together and pushes mismatched ones apart.",
      },
    ],
    takeaways: [
      "Multimodal models turn images and audio into token-like vectors.",
      "Vision transformers read images as grids of patches.",
      "Shared embedding spaces like CLIP's link pictures and words.",
    ],
    sources: [
      { title: "An Image is Worth 16x16 Words (ViT)", url: "https://arxiv.org/abs/2010.11929", by: "Dosovitskiy et al." },
      { title: "Learning Transferable Visual Models From Natural Language Supervision (CLIP)", url: "https://arxiv.org/abs/2103.00020", by: "Radford et al." },
      { title: "Hugging Face Computer Vision Course", url: "https://huggingface.co/learn/computer-vision-course", by: "Hugging Face community", note: "Free" },
    ],
  },
  {
    slug: "open-models",
    title: "Open-weight models and running AI yourself",
    emoji: "🔓",
    minutes: 6,
    summary: "What \"open\" really means for AI models, why it matters, and how a laptop can run a capable chatbot.",
    blocks: [
      {
        kind: "p",
        text: "Some AI models are only available through a company's app or API. Others publish their **weights**, the learned numbers, so anyone can download and run them. These are called **open-weight models**.",
      },
      {
        kind: "card",
        title: "Open weights isn't always open source",
        body: [
          "Truly open-source AI would also share the training code and enough detail about the data to rebuild the model. Many \"open\" models share only the weights, often under a licence with conditions.",
          "Always read the licence before building a product on one.",
        ],
      },
      {
        kind: "card",
        title: "Why people want open models",
        body: [
          "**Privacy:** data never leaves your machine. **Control:** the model won't change under you overnight. **Customisation:** you can fine-tune it on your own data. **Research:** scientists can look inside.",
        ],
      },
      {
        kind: "quiz",
        question: "What does an open-weight model let you do that an API-only model doesn't?",
        options: [
          "Get answers without any computer",
          "Download the model and run it on your own hardware",
          "Guarantee it never makes mistakes",
          "Use it without electricity",
        ],
        answer: 1,
        explain: "With the weights you can run, inspect and fine-tune the model yourself.",
      },
      {
        kind: "card",
        title: "Fitting a model on a laptop",
        body: [
          "A model with 8 billion parameters stored as 16-bit numbers needs about 16 GB just for weights. **Quantisation** stores each weight in 4 bits instead, cutting that to about 4 to 5 GB with a small quality loss.",
          "Tools like llama.cpp and Ollama do this for you, so many modern laptops can run a decent chatbot offline.",
        ],
      },
      {
        kind: "code",
        title: "How much memory does a model need?",
        code: "def memory_gb(billion_params, bits):\n    return billion_params * 1e9 * bits / 8 / 1e9\n\nfor size in [1, 8, 70]:\n    row = [f\"{bits}-bit: {memory_gb(size, bits):5.1f} GB\" for bits in (16, 8, 4)]\n    print(f\"{size:>3}B params  \" + \"   \".join(row))",
        note: "Weights only. Running the model needs some extra memory for the conversation, so add 10 to 20 percent.",
      },
      {
        kind: "quiz",
        question: "Roughly how much memory do the weights of an 8-billion-parameter model need at 4 bits?",
        options: ["About 32 GB", "About 16 GB", "About 4 GB", "About 4 MB"],
        answer: 2,
        explain: "8 billion × 4 bits = 32 billion bits = 4 billion bytes, about 4 GB.",
      },
    ],
    takeaways: [
      "Open-weight models publish their learned numbers; open source goes further.",
      "Open models give privacy, control and room to customise.",
      "Quantisation shrinks models enough to run on ordinary laptops.",
    ],
    sources: [
      { title: "The Open Source AI Definition", url: "https://opensource.org/ai/open-source-ai-definition", by: "Open Source Initiative" },
      { title: "llama.cpp", url: "https://github.com/ggml-org/llama.cpp", by: "ggml-org", note: "MIT" },
      { title: "Ollama", url: "https://ollama.com/", by: "Ollama", note: "MIT" },
    ],
  },
];
