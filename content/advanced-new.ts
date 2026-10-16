import type { Lesson } from "./types";

/** Round-three advanced lessons: serving, mixture of experts, small models and robotics. */
export const advancedNew: Lesson[] = [
  {
    slug: "inference-and-serving",
    title: "How models are served: prefill, decode and the KV cache",
    emoji: "⚡",
    minutes: 8,
    summary: "What happens on the computer when you press send. Why replies stream out word by word, why output tokens cost more, and the tricks that make it all faster.",
    blocks: [
      {
        kind: "p",
        text: "Training a model happens once. Answering questions happens millions of times a day. Running a trained model to get answers is called **inference**, and doing it quickly and cheaply for lots of people at once is called **serving**. It is its own craft, with its own clever tricks.",
      },
      {
        kind: "card",
        title: "Two phases: prefill and decode",
        body: [
          "**Prefill**: the model reads your whole prompt in one go. All the prompt tokens can be processed side by side, so the chip stays busy and this part is fast per token.",
          "**Decode**: the model writes its reply one token at a time. Each new token depends on the one before, so the steps cannot run in parallel. This is why answers stream out word by word.",
        ],
      },
      {
        kind: "card",
        title: "The KV cache",
        body: [
          "Inside attention, every token produces a key and a value: small lists of numbers that later tokens look back at. Without care, the model would recompute these for the whole conversation at every step.",
          "The **KV cache** stores the keys and values once and reuses them. Each decode step then only does fresh work for the one new token. The catch is memory: long conversations make the cache large.",
        ],
      },
      {
        kind: "code",
        title: "Counting the work a KV cache saves",
        code: "prompt = 1000   # tokens in the prompt\nreply = 500     # tokens the model writes\n\n# Without a cache: each new token re-processes everything so far.\nno_cache = sum(prompt + i for i in range(1, reply + 1))\n\n# With a KV cache: process the prompt once, then one new token per step.\nwith_cache = prompt + reply\n\nprint(f\"Token passes without cache: {no_cache:,}\")\nprint(f\"Token passes with cache:    {with_cache:,}\")\nprint(f\"Roughly {no_cache // with_cache}x less work\")",
        note: "A simplified count of token passes, not exact maths, but it shows why no serious system runs without a cache.",
      },
      {
        kind: "quiz",
        question: "Why do output tokens usually cost more than input tokens?",
        options: [
          "Output tokens are longer words",
          "Output is written one token at a time, so the chip does less useful work per step",
          "Input tokens are stored for free in the cloud",
          "Providers charge extra for the model's opinions",
        ],
        answer: 1,
        explain: "Prefill handles the prompt in parallel and keeps the hardware busy. Decode is sequential, so each output token ties up the hardware for longer.",
      },
      {
        kind: "card",
        title: "Batching, latency and throughput",
        body: [
          "**Latency** is how long one person waits. **Throughput** is how many tokens the whole system produces per second across everyone.",
          "A single decode step barely uses a modern chip, so servers group many users' requests into one batch. Throughput rises a lot, but each person may wait slightly longer. Good servers add new requests to the batch as old ones finish, which is called continuous batching.",
        ],
      },
      {
        kind: "tip",
        text: "Think of a lift. Taking one person at a time is quick for them but wastes the lift. Waiting a moment to fill it moves far more people per hour.",
      },
      {
        kind: "card",
        title: "Speculative decoding",
        body: [
          "A small, fast **draft model** guesses the next few tokens. The big model then checks all those guesses in a single pass, which is cheap because checking can run in parallel, like prefill.",
          "Correct guesses are kept, and at the first wrong one the big model supplies its own token. When the draft is often right, replies come out noticeably faster, and the final text matches what the big model would have written anyway.",
        ],
      },
      {
        kind: "quiz",
        question: "In speculative decoding, what does the big model do with the draft model's guesses?",
        options: [
          "Ignores them unless the user asks",
          "Checks several of them in one parallel pass and keeps the ones it agrees with",
          "Retrains itself on them",
          "Sends them straight to the user without checking",
        ],
        answer: 1,
        explain: "Verifying a run of tokens at once is cheap. Accepted guesses save whole decode steps, and the output quality is unchanged.",
      },
    ],
    takeaways: [
      "Prefill reads the prompt in parallel; decode writes one token at a time.",
      "The KV cache trades memory for a huge saving in repeated work.",
      "Batching boosts throughput, and speculative decoding cuts waiting time.",
    ],
    sources: [
      { title: "Fast Inference from Transformers via Speculative Decoding", url: "https://arxiv.org/abs/2211.17192", by: "Leviathan et al." },
      { title: "Efficient Memory Management for LLM Serving with PagedAttention", url: "https://arxiv.org/abs/2309.06180", by: "Kwon et al.", note: "The vLLM paper" },
      { title: "Assisted Generation: a new direction toward low-latency text generation", url: "https://huggingface.co/blog/assisted-generation", by: "Hugging Face" },
    ],
  },
  {
    slug: "mixture-of-experts",
    title: "Mixture of experts: big models, small bills",
    emoji: "🧩",
    minutes: 8,
    summary: "How some of the largest models only use a small slice of themselves for each token, and what that saves and costs.",
    blocks: [
      {
        kind: "p",
        text: "In a normal transformer, every token flows through every weight in every layer. A **mixture of experts**, or MoE, breaks that rule. Some layers are split into many smaller networks, and each token only visits a few of them.",
      },
      {
        kind: "card",
        title: "Experts and the router",
        body: [
          "An MoE layer replaces one feed-forward block with several copies, called **experts**. A tiny network called the **router** looks at each token and gives every expert a score.",
          "The token is sent to the top-k experts, often just one or two. Their outputs are blended, weighted by the router's scores, and the rest of the experts sit idle for that token.",
        ],
      },
      {
        kind: "code",
        title: "A router picking top-2 experts",
        code: "import math, random\n\nrandom.seed(7)\nnum_experts, top_k = 8, 2\n\ndef softmax(xs):\n    exps = [math.exp(x) for x in xs]\n    total = sum(exps)\n    return [e / total for e in exps]\n\nfor token in [\"The\", \"cat\", \"sat\", \"on\"]:\n    scores = [random.gauss(0, 1) for _ in range(num_experts)]  # router scores\n    probs = softmax(scores)\n    best = sorted(range(num_experts), key=lambda i: probs[i], reverse=True)[:top_k]\n    share = sum(probs[i] for i in best)\n    picks = \", \".join(f\"expert {i} ({probs[i] / share:.0%})\" for i in best)\n    print(f\"{token:>4} -> {picks}\")\n\nprint(f\"Each token used {top_k} of {num_experts} experts.\")",
        note: "Real routers learn their scores during training. Here they are random, just to show the softmax and top-k steps.",
      },
      {
        kind: "card",
        title: "Total versus active parameters",
        body: [
          "**Total parameters** count every weight in the model. **Active parameters** count only the weights a single token actually uses.",
          "An MoE model can have a very large total but a much smaller active count. That is the trick: lots of stored knowledge, but the compute cost per token of a far smaller model.",
        ],
      },
      {
        kind: "quiz",
        question: "An MoE model has 8 experts per layer and uses the top 2 for each token. What mostly sets its compute cost per token?",
        options: [
          "All 8 experts, because they are all stored",
          "The 2 chosen experts plus the shared parts of the model",
          "Only the router",
          "The length of the training data",
        ],
        answer: 1,
        explain: "Compute follows the active parameters. Idle experts take up memory but do no work for that token.",
      },
      {
        kind: "card",
        title: "Keeping the load balanced",
        body: [
          "Left alone, a router may fall in love with a few favourite experts and starve the rest. Those unused experts never improve, and the busy ones become a bottleneck.",
          "Training adds a **load-balancing loss**: a small penalty that nudges the router to spread tokens fairly. Systems also cap how many tokens each expert can take at once.",
        ],
      },
      {
        kind: "tip",
        text: "Experts rarely line up with neat human topics like \"maths\" or \"French\". Studies of trained routers often find they specialise in quieter patterns, such as punctuation or particular kinds of word.",
      },
      {
        kind: "list",
        items: [
          "Memory: every expert must still be loaded, so MoE models need lots of memory even though each token uses little.",
          "Routing instability: training can wobble as the router's choices shift, which takes careful tuning.",
          "Communication: experts are often spread across many chips, so tokens have to travel between them.",
          "Fine-tuning can be trickier, as small datasets may overfit some experts.",
        ],
      },
      {
        kind: "quiz",
        question: "What is the main job of a load-balancing loss in an MoE model?",
        options: [
          "To make the model's answers shorter",
          "To encourage the router to spread tokens across experts instead of overusing a few",
          "To reduce the total number of parameters",
          "To remove the need for a router",
        ],
        answer: 1,
        explain: "Without it, a few experts can grab most tokens, leaving others undertrained and creating bottlenecks.",
      },
    ],
    takeaways: [
      "A router sends each token to only a few experts per MoE layer.",
      "Compute follows active parameters; memory follows total parameters.",
      "Load balancing and stable routing are the hard parts.",
    ],
    sources: [
      { title: "Switch Transformers: Scaling to Trillion Parameter Models", url: "https://arxiv.org/abs/2101.03961", by: "Fedus, Zoph and Shazeer" },
      { title: "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer", url: "https://arxiv.org/abs/1701.06538", by: "Shazeer et al." },
      { title: "Mixture of Experts Explained", url: "https://huggingface.co/blog/moe", by: "Hugging Face" },
      { title: "Mixtral of Experts", url: "https://arxiv.org/abs/2401.04088", by: "Mistral AI", note: "Open-weight MoE model" },
    ],
  },
  {
    slug: "distillation-and-small-models",
    title: "Distillation and the rise of small models",
    emoji: "🫖",
    minutes: 7,
    summary: "How a big model can teach a small one, why small models keep getting better, and when a little model is the right choice.",
    blocks: [
      {
        kind: "p",
        text: "Big models are clever but slow and costly. Often we want something that fits on a phone or answers in a blink. The trick is to let a big model pass on what it knows to a small one.",
      },
      {
        kind: "card",
        title: "Teacher and student",
        body: [
          "In **knowledge distillation**, a large trained model, the **teacher**, produces answers. A smaller model, the **student**, is trained to copy them.",
          "The idea was popularised by Hinton and colleagues in 2015. With language models, the student often learns from the teacher's predicted probabilities for the next token, or simply from lots of text the teacher has written.",
        ],
      },
      {
        kind: "card",
        title: "Why soft labels help",
        body: [
          "A normal training label is hard: this photo is a cat, full stop. The teacher gives **soft labels**: mostly cat, a bit dog, a little fox, almost certainly not a car.",
          "Those small numbers carry hidden knowledge about how things relate. Raising the softmax temperature spreads them out so the student can see them more clearly.",
        ],
      },
      {
        kind: "code",
        title: "Soft labels at two temperatures",
        code: "import math\n\ndef softmax(scores, temperature=1.0):\n    exps = [math.exp(s / temperature) for s in scores]\n    total = sum(exps)\n    return [e / total for e in exps]\n\nlabels = [\"cat\", \"dog\", \"fox\", \"car\"]\nteacher_scores = [6.0, 4.0, 3.0, -2.0]   # the teacher's raw scores for one photo\n\nfor t in [1, 4]:\n    probs = softmax(teacher_scores, t)\n    row = \"  \".join(f\"{name} {p:.0%}\" for name, p in zip(labels, probs))\n    print(f\"T={t}:  {row}\")\n\nprint(\"Hard label: cat 100%, everything else 0%\")",
        note: "At a higher temperature the teacher's view that a cat looks more like a dog than a car shows up clearly. That is the extra signal the student learns from.",
      },
      {
        kind: "quiz",
        question: "What does a student model gain from a teacher's soft labels that a hard label lacks?",
        options: [
          "A faster chip to run on",
          "Information about which wrong answers are close and which are far off",
          "A larger context window",
          "Permission to skip training",
        ],
        answer: 1,
        explain: "Soft labels show how similar the classes look to the teacher, which is richer than a single right answer.",
      },
      {
        kind: "card",
        title: "Other ways to shrink a model",
        body: [
          "**Pruning** removes weights or whole parts of the network that contribute little, then often retrains briefly to recover. **Quantisation** stores each weight with fewer bits.",
          "These combine well: distil a small model, prune it, then quantise it to run on modest hardware.",
        ],
      },
      {
        kind: "card",
        title: "Why small models keep improving",
        body: [
          "Today's small models often beat much larger models from a few years ago. Reasons include training on far more and better-filtered data, learning from stronger teachers, and better training recipes.",
          "This makes **on-device AI** practical: models that run on your phone or laptop, working offline and keeping your data on the device.",
        ],
      },
      {
        kind: "list",
        items: [
          "Choose small when speed, cost, privacy or offline use matter, and the task is narrow, such as sorting emails or pulling out dates.",
          "Choose large for open-ended reasoning, tricky writing, broad knowledge, or tasks you cannot predict in advance.",
          "A common pattern: let a small model handle the easy majority and pass hard cases up to a large one.",
        ],
      },
      {
        kind: "quiz",
        question: "Which job is the best fit for a small on-device model?",
        options: [
          "Writing a long legal analysis of a novel case",
          "Suggesting the next word on a phone keyboard, offline",
          "Planning a multi-step research project",
          "Answering any question on any subject",
        ],
        answer: 1,
        explain: "Keyboard suggestions are narrow, need to be instant, and benefit from staying private on the device.",
      },
    ],
    takeaways: [
      "Distillation trains a small student to copy a big teacher's soft answers.",
      "Pruning and quantisation shrink models further.",
      "Pick small for narrow, fast, private tasks and large for open-ended ones.",
    ],
    sources: [
      { title: "Distilling the Knowledge in a Neural Network", url: "https://arxiv.org/abs/1503.02531", by: "Hinton, Vinyals and Dean" },
      { title: "DistilBERT, a distilled version of BERT", url: "https://arxiv.org/abs/1910.01108", by: "Sanh et al.", note: "From Hugging Face" },
      { title: "Learning both Weights and Connections for Efficient Neural Networks", url: "https://arxiv.org/abs/1506.02626", by: "Han et al.", note: "Classic pruning paper" },
    ],
  },
  {
    slug: "ai-and-robotics",
    title: "AI with a body: robots that learn",
    emoji: "🦾",
    minutes: 8,
    summary: "Why folding laundry is harder than passing exams, and how robots are starting to learn from simulation, demonstrations and language models.",
    blocks: [
      {
        kind: "p",
        text: "Chatbots live in text. Robots live in the messy physical world, where things slip, lights change and a mistake can break a glass. AI that senses and acts in the world is called **embodied AI**.",
      },
      {
        kind: "card",
        title: "Sense, plan, act",
        body: [
          "**Perception**: turn camera images, depth readings and touch sensors into an understanding of what is where.",
          "**Planning**: decide what to do, from \"pick up the cup\" down to a path for the arm.",
          "**Control**: send precise, rapid commands to the motors, correcting many times a second as things move.",
        ],
      },
      {
        kind: "card",
        title: "Moravec's paradox",
        body: [
          "In the 1980s, Hans Moravec and others noticed something odd: computers find chess and algebra easy but struggle with things a toddler does, like walking or grasping a toy.",
          "**Moravec's paradox** has a likely explanation. Evolution spent hundreds of millions of years polishing our senses and movement, so they feel effortless. Abstract reasoning is recent, so it only feels hard to us.",
        ],
      },
      {
        kind: "quiz",
        question: "According to Moravec's paradox, which is hardest for a robot?",
        options: [
          "Multiplying two large numbers",
          "Playing a good game of chess",
          "Picking a soft, crumpled towel out of a messy basket",
          "Sorting a list of names",
        ],
        answer: 2,
        explain: "Everyday handling of floppy, unpredictable objects needs rich perception and fine control, which is exactly what machines find hard.",
      },
      {
        kind: "card",
        title: "Where robots get their data",
        body: [
          "Chatbots learn from the internet. There is no internet of robot movements, so data is precious.",
          "**Simulation**: robots practise millions of times in a virtual world. The gap between simulation and reality is the **sim-to-real** problem. One fix is domain randomisation: vary colours, friction and lighting in the simulator so the real world looks like just another variation.",
          "**Learning from demonstrations**: a person guides the robot or controls it remotely, and the robot learns to imitate those movements. This is called imitation learning.",
        ],
      },
      {
        kind: "tip",
        text: "Learning to ride a bike from a video game helps a little, but the real wobble always feels different. That gap is sim-to-real.",
      },
      {
        kind: "card",
        title: "Vision-language-action models",
        body: [
          "A **vision-language-action model**, or VLA, starts from a model trained on images and text from the web, then is trained further on robot data. It takes in a camera view and an instruction, and outputs robot actions, often written as special tokens.",
          "Google DeepMind's RT-2, in 2023, showed this lets robots use web knowledge, for example following instructions about objects they never saw during robot training.",
        ],
      },
      {
        kind: "list",
        items: [
          "Data is scarce and slow to collect, one real movement at a time.",
          "Mistakes are physical: they can break things or hurt people, so safety matters more.",
          "Control must happen in real time; a robot cannot pause to think mid-grasp.",
          "Every home and warehouse is different, so robots must cope with endless variety.",
        ],
      },
      {
        kind: "quiz",
        question: "What is the sim-to-real problem?",
        options: [
          "Robots refusing to leave the simulator",
          "Skills learned in simulation working less well on real hardware because the virtual world is not quite real",
          "Simulators being too expensive to run",
          "Real robots being faster than simulated ones",
        ],
        answer: 1,
        explain: "Small differences in physics, friction, lighting and sensors mean behaviour that works in simulation can fail in reality.",
      },
    ],
    takeaways: [
      "Embodied AI must perceive, plan and control in the real world.",
      "Moravec's paradox: everyday movement is harder for machines than abstract thought.",
      "Simulation, demonstrations and VLA models are how robots are catching up.",
    ],
    sources: [
      { title: "RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control", url: "https://arxiv.org/abs/2307.15818", by: "Brohan et al., Google DeepMind" },
      { title: "Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World", url: "https://arxiv.org/abs/1703.06907", by: "Tobin et al." },
      { title: "Open X-Embodiment: Robotic Learning Datasets and RT-X Models", url: "https://arxiv.org/abs/2310.08864", by: "Open X-Embodiment Collaboration", note: "Shared open robot dataset" },
      { title: "LeRobot", url: "https://github.com/huggingface/lerobot", by: "Hugging Face", note: "Open-source robot learning library" },
    ],
  },
];
