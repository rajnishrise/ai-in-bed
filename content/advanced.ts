import { advancedMore } from "./advanced-more";
import type { Level } from "./types";

export const advanced: Level = {
  id: "advanced",
  name: "Advanced",
  emoji: "🌑",
  tagline: "How frontier AI actually works.",
  description:
    "The ideas behind today's frontier models: transformers, how LLMs are trained and aligned, retrieval and agents, efficient fine-tuning, diffusion, reinforcement learning, and the science of scaling and safety.",
  lessons: [
    {
      slug: "transformers",
      title: "Attention is all you need",
      emoji: "🔦",
      minutes: 8,
      summary:
        "The transformer architecture and the attention mechanism that powers every modern LLM.",
      blocks: [
        {
          kind: "p",
          text: "In 2017 a Google paper titled *Attention Is All You Need* introduced the **transformer**. It threw away recurrence entirely and let every token look directly at every other token. Nearly every frontier model since, from GPT to Claude to Gemini, is built on it.",
        },
        {
          kind: "card",
          title: "🔦 The intuition",
          body: [
            "In \"The animal didn't cross the street because **it** was too tired\", what does \"it\" refer to?",
            "Attention lets the model, while processing \"it\", look back and put most of its focus on \"animal\".",
          ],
        },
        {
          kind: "figure",
          graphic: "attention",
          caption:
            "Attention weights for the token \"it\": the model attends most strongly to \"animal\". Darker = more attention.",
        },
        {
          kind: "interactive",
          id: "attention",
          caption: "See which words each word attends to.",
        },
        {
          kind: "code",
          title: "Attention scores in pure Python",
          code: "import math\n\n# Tiny 2-number \"query\" and \"key\" vectors for each word.\nwords = [\"the\", \"cat\", \"sat\", \"it\"]\nkeys  = {\"the\": [0.1, 0.0], \"cat\": [0.9, 0.8], \"sat\": [0.3, 0.9], \"it\": [0.5, 0.4]}\nquery = [1.0, 0.7]   # what \"it\" is looking for: a noun, an animal\n\ndef dot(a, b):\n    return sum(x * y for x, y in zip(a, b))\n\nscores = [dot(query, keys[w]) for w in words]\nexps = [math.exp(s) for s in scores]\nweights = [e / sum(exps) for e in exps]   # softmax\n\nfor w, s, a in zip(words, scores, weights):\n    print(f\"{w:>4}  score {s:.2f}  attention {a:.0%}  \" + \"#\" * round(a * 40))",
          note: "Change the query vector and see the attention shift. In a real transformer, queries and keys are learned and have hundreds of numbers.",
        },
        {
          kind: "card",
          title: "🔑 Queries, keys and values",
          body: [
            "Each token produces three vectors: a **query** (what am I looking for?), a **key** (what do I contain?), and a **value** (what will I share?).",
            "Score = query · key for every pair, scaled and softmaxed into weights. Output = weighted sum of values.",
            "`Attention(Q,K,V) = softmax(QKᵀ / √d) · V`",
          ],
        },
        {
          kind: "quiz",
          question: "In attention, what is the softmax applied to?",
          options: [
            "The values directly",
            "The query–key similarity scores, turning them into weights that sum to 1",
            "The final output text",
            "The learning rate",
          ],
          answer: 1,
          explain:
            "Softmax turns raw query·key scores into a probability-like distribution over which tokens to attend to.",
        },
        {
          kind: "card",
          title: "🐙 Multi-head attention",
          body: [
            "Run several attention operations in parallel, each with its own Q/K/V projections.",
            "Different heads can specialise: one tracks grammar, another tracks which noun a pronoun refers to, another tracks position.",
          ],
        },
        {
          kind: "card",
          title: "🧱 The transformer block",
          body: [
            "Each block = multi-head attention → feed-forward network (an MLP applied to each token), with **residual connections** and **layer normalisation** around both.",
            "Stack dozens of blocks. Add **positional encodings** so the model knows word order, since attention itself is order-blind.",
          ],
        },
        {
          kind: "card",
          title: "🎭 Decoder-only & causal masking",
          body: [
            "GPT-style LLMs use only the decoder half, with a **causal mask**: each token may only attend to earlier tokens, never peek at the future.",
            "That's what makes next-token prediction a fair game during training.",
          ],
        },
        {
          kind: "tip",
          text: "Pillow thought: attention compares every token with every other one, so its cost grows with the square of the context length. A lot of current research (FlashAttention, sparse and linear attention) is about taming that.",
        },
        {
          kind: "quiz",
          question:
            "Why do transformers need positional encodings?",
          options: [
            "To make the model larger",
            "Because attention alone has no sense of word order",
            "To encrypt the input",
            "They don't, it's optional decoration",
          ],
          answer: 1,
          explain:
            "Attention treats the input as a set. Without position information, \"dog bites man\" and \"man bites dog\" would look the same.",
        },
      ],
      takeaways: [
        "Attention lets each token pull information from any other token.",
        "softmax(QKᵀ/√d)·V: score, normalise, mix.",
        "Multi-head attention + MLP + residuals + norms = a transformer block.",
        "LLMs are decoder-only transformers with causal masking.",
      ],
      sources: [
        {
          title: "Attention Is All You Need",
          url: "https://arxiv.org/abs/1706.03762",
          by: "Vaswani et al., 2017",
        },
        {
          title: "The Illustrated Transformer",
          url: "https://jalammar.github.io/illustrated-transformer/",
          by: "Jay Alammar",
        },
        {
          title: "Transformer Explainer (interactive)",
          url: "https://poloclub.github.io/transformer-explainer/",
          by: "Georgia Tech Polo Club",
          note: "MIT licensed, runs GPT-2 in your browser",
        },
        {
          title: "Let's build GPT: from scratch, in code",
          url: "https://karpathy.ai/zero-to-hero.html",
          by: "Andrej Karpathy",
        },
      ],
    },
    {
      slug: "training-llms",
      title: "How LLMs are trained",
      emoji: "🏭",
      minutes: 7,
      summary:
        "Pre-training, supervised fine-tuning, and learning from feedback: the three-stage recipe.",
      blocks: [
        {
          kind: "p",
          text: "A chat assistant isn't trained in one go. It's built in stages, each with a different goal and very different kinds of data.",
        },
        {
          kind: "figure",
          graphic: "llm-pipeline",
          caption:
            "The typical recipe: a huge pre-training run, then much smaller but carefully curated post-training stages.",
        },
        {
          kind: "code",
          title: "A tiny next-letter model",
          code: "import random\nfrom collections import Counter, defaultdict\n\ntext = \"the cat sat on the mat. the dog sat on the log. the cat saw the dog.\"\n\n# \"Training\": count which letter follows each letter.\ncounts = defaultdict(Counter)\nfor a, b in zip(text, text[1:]):\n    counts[a][b] += 1\n\ndef next_letter(c):\n    options = counts[c]\n    return random.choices(list(options), weights=options.values())[0]\n\nrandom.seed(4)\nout = \"t\"\nfor _ in range(60):\n    out += next_letter(out[-1])\nprint(out)",
          note: "This bigram model only looks one letter back, so it babbles. LLMs do the same job, predicting the next token, but look back over thousands of tokens with billions of parameters.",
        },
        {
          kind: "card",
          title: "1️⃣ Pre-training",
          body: [
            "Next-token prediction on trillions of tokens of web pages, books, code and more.",
            "Takes thousands of GPUs for weeks or months. Produces a **base model**: vast knowledge, but it just continues text. Ask it a question and it might reply with more questions.",
          ],
        },
        {
          kind: "card",
          title: "2️⃣ Supervised fine-tuning (SFT)",
          body: [
            "Train on high-quality example conversations: a prompt and an ideal response, written or curated by people (and increasingly by other models).",
            "The model learns the *format* and *style* of being a helpful assistant.",
          ],
        },
        {
          kind: "card",
          title: "3️⃣ Learning from feedback",
          body: [
            "**RLHF**: humans compare pairs of answers; a **reward model** learns to predict their preferences; RL (classically PPO) optimises the LLM against it.",
            "**DPO** skips the separate reward model and learns directly from preference pairs.",
            "**Constitutional AI / RLAIF** uses a written set of principles and AI feedback to scale this up.",
          ],
        },
        {
          kind: "quiz",
          question: "What does a base model (only pre-trained) typically do?",
          options: [
            "Follow instructions perfectly",
            "Continue text in a plausible way, not necessarily answer helpfully",
            "Refuse everything",
            "Only output code",
          ],
          answer: 1,
          explain:
            "Pre-training teaches prediction, not helpfulness. Post-training (SFT + feedback) shapes it into an assistant.",
        },
        {
          kind: "card",
          title: "🧠 Reasoning models",
          body: [
            "Newer models are also trained with RL on tasks with checkable answers (maths, code) to produce long chains of thought before answering.",
            "Spending more compute *at inference time* (thinking longer) turns out to boost accuracy on hard problems.",
          ],
        },
        {
          kind: "card",
          title: "🧹 Data is still king",
          body: [
            "Pre-training data is filtered, de-duplicated and mixed carefully (how much code? how many languages?).",
            "Open datasets like FineWeb and The Pile let researchers study this in public.",
          ],
        },
        {
          kind: "quiz",
          question:
            "In RLHF, what does the reward model learn?",
          options: [
            "The next token",
            "To predict which responses humans prefer",
            "To compress the training data",
            "To translate languages",
          ],
          answer: 1,
          explain:
            "The reward model is trained on human preference comparisons, then used as the signal for reinforcement learning.",
        },
      ],
      takeaways: [
        "Pre-training → base model with broad knowledge.",
        "SFT → assistant format and style.",
        "RLHF / DPO / RLAIF → aligned with preferences.",
        "RL on verifiable tasks produces stronger reasoning.",
      ],
      sources: [
        {
          title: "Training language models to follow instructions (InstructGPT)",
          url: "https://arxiv.org/abs/2203.02155",
          by: "Ouyang et al., 2022",
        },
        {
          title: "Direct Preference Optimization",
          url: "https://arxiv.org/abs/2305.18290",
          by: "Rafailov et al., 2023",
        },
        {
          title: "Constitutional AI: Harmlessness from AI Feedback",
          url: "https://arxiv.org/abs/2212.08073",
          by: "Bai et al. (Anthropic), 2022",
        },
        {
          title: "Illustrating RLHF",
          url: "https://huggingface.co/blog/rlhf",
          by: "Hugging Face",
        },
        {
          title: "FineWeb dataset",
          url: "https://huggingface.co/datasets/HuggingFaceFW/fineweb",
          by: "Hugging Face",
          note: "ODC-By 1.0",
        },
      ],
    },
    {
      slug: "rag-and-agents",
      title: "RAG & AI agents",
      emoji: "🛠️",
      minutes: 7,
      summary:
        "Giving models fresh knowledge with retrieval, and the ability to act with tools.",
      blocks: [
        {
          kind: "p",
          text: "An LLM's knowledge is frozen at training time, and it can't see your company's private documents. Two big ideas fix this: **retrieval-augmented generation** (look things up first) and **agents** (use tools in a loop).",
        },
        {
          kind: "figure",
          graphic: "rag",
          caption:
            "RAG: embed the question, find the most similar document chunks, paste them into the prompt, then generate a grounded answer.",
        },
        {
          kind: "interactive",
          id: "rag",
          caption: "Ask a shop assistant bot a question with and without retrieval.",
        },
        {
          kind: "card",
          title: "📚 How RAG works",
          body: [
            "**Index**: split documents into chunks, embed each chunk, store the vectors in a vector database.",
            "**Retrieve**: embed the user's question and fetch the top-k most similar chunks.",
            "**Generate**: put those chunks in the prompt and ask the model to answer *using them*, ideally with citations.",
          ],
        },
        {
          kind: "card",
          title: "🔧 Making RAG good",
          body: [
            "Chunk size matters: too big and you dilute relevance, too small and you lose context.",
            "**Hybrid search** (keywords + embeddings) and a **re-ranker** often beat embeddings alone.",
            "Evaluate retrieval separately from generation: if the right chunk never arrives, the model can't use it.",
          ],
        },
        {
          kind: "quiz",
          question: "What's the main benefit of RAG over fine-tuning for new facts?",
          options: [
            "It makes the model smaller",
            "You can update knowledge by changing documents, without retraining, and cite sources",
            "It removes the need for embeddings",
            "It makes the model faster at maths",
          ],
          answer: 1,
          explain:
            "RAG keeps knowledge outside the weights, so it's easy to update and lets answers point to their sources.",
        },
        {
          kind: "card",
          title: "🤖 Agents: models that act",
          body: [
            "An agent is an LLM in a loop: **think → choose a tool → observe the result → think again**, until the task is done.",
            "Tools can be web search, a calculator, a code interpreter, an API, or a browser. The ReAct paper popularised this reason-and-act pattern.",
          ],
        },
        {
          kind: "card",
          title: "🔌 Tool calling & protocols",
          body: [
            "Modern APIs let you describe tools with a JSON schema; the model replies with a structured call, your code runs it, and you feed back the result.",
            "Open standards like the **Model Context Protocol (MCP)** let any tool or data source plug into any compatible AI app.",
          ],
        },
        {
          kind: "tip",
          text: "Pillow thought: agents fail in long, quiet ways. A small mistake at step 3 snowballs by step 30. Good agent design is mostly about checkpoints, verification and knowing when to ask a human.",
        },
        {
          kind: "quiz",
          question: "What is the core loop of an AI agent?",
          options: [
            "Train → test → deploy",
            "Reason → act with a tool → observe → repeat",
            "Embed → cluster → label",
            "Encrypt → send → decrypt",
          ],
          answer: 1,
          explain:
            "Agents alternate between reasoning and taking actions, using each observation to decide the next step.",
        },
      ],
      takeaways: [
        "RAG = retrieve relevant chunks, then generate grounded answers.",
        "Chunking, hybrid search and re-ranking make or break RAG.",
        "Agents = LLMs that reason and use tools in a loop.",
        "MCP standardises how tools plug into AI apps.",
      ],
      sources: [
        {
          title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP",
          url: "https://arxiv.org/abs/2005.11401",
          by: "Lewis et al., 2020",
        },
        {
          title: "ReAct: Synergizing Reasoning and Acting in Language Models",
          url: "https://arxiv.org/abs/2210.03629",
          by: "Yao et al., 2022",
        },
        {
          title: "LLM Powered Autonomous Agents",
          url: "https://lilianweng.github.io/posts/2023-06-23-agent/",
          by: "Lilian Weng",
        },
        {
          title: "Model Context Protocol",
          url: "https://modelcontextprotocol.io/",
          by: "Open standard, MIT licensed",
        },
        {
          title: "Hugging Face AI Agents Course",
          url: "https://huggingface.co/learn/agents-course",
          by: "Hugging Face",
          note: "Apache 2.0",
        },
      ],
    },
    {
      slug: "efficient-finetuning",
      title: "Fine-tuning on a budget: LoRA & quantisation",
      emoji: "🪶",
      minutes: 6,
      summary:
        "How to customise a billion-parameter model on a single GPU.",
      blocks: [
        {
          kind: "p",
          text: "Fully fine-tuning a 70-billion-parameter model means updating 70 billion numbers and storing optimiser state for each, which needs a cluster. Parameter-efficient fine-tuning (**PEFT**) tricks let you get most of the benefit on a single GPU.",
        },
        {
          kind: "figure",
          graphic: "lora",
          caption:
            "LoRA freezes the big weight matrix W and learns a small low-rank update B·A beside it.",
        },
        {
          kind: "card",
          title: "🧊 LoRA: low-rank adaptation",
          body: [
            "Keep the original weights `W` frozen. Learn two thin matrices `B` (d×r) and `A` (r×d) with a small rank `r` like 8 or 16.",
            "New output = `W·x + B·A·x`. For a 4096×4096 layer, that's ~65k trainable numbers at r=8 instead of ~16.8 million.",
          ],
        },
        {
          kind: "card",
          title: "🔄 Swappable adapters",
          body: [
            "LoRA adapters are tiny files (megabytes). One base model can host many adapters: one for legal writing, one for your brand voice, one for SQL.",
            "After training, `B·A` can be merged into `W` so inference costs nothing extra.",
          ],
        },
        {
          kind: "quiz",
          question: "In LoRA, which weights are updated during fine-tuning?",
          options: [
            "All of the original weights",
            "Only the small low-rank matrices A and B",
            "Only the embeddings",
            "None, it's just prompting",
          ],
          answer: 1,
          explain:
            "The base weights stay frozen. Only the low-rank adapter matrices are trained.",
        },
        {
          kind: "card",
          title: "🗜️ Quantisation",
          body: [
            "Store weights in fewer bits: 16-bit → 8-bit → 4-bit. A 4-bit model needs roughly ¼ the memory of 16-bit.",
            "Clever schemes (GPTQ, AWQ, NF4) keep quality surprisingly close to the original.",
          ],
        },
        {
          kind: "card",
          title: "🤝 QLoRA = both",
          body: [
            "Quantise the frozen base to 4-bit, then train LoRA adapters on top in higher precision.",
            "This made fine-tuning a 65B model possible on a single 48 GB GPU.",
          ],
        },
        {
          kind: "card",
          title: "🤔 Should you fine-tune at all?",
          body: [
            "Try good prompting and RAG first. Fine-tune when you need a consistent style or format, a narrow skill, or a smaller cheaper model that matches a big one on your task.",
            "Fine-tuning is great for *behaviour*; RAG is usually better for *facts*.",
          ],
        },
        {
          kind: "quiz",
          question:
            "Roughly how much memory does a 4-bit model need compared with the 16-bit version?",
          options: ["The same", "Half", "About a quarter", "Four times more"],
          answer: 2,
          explain:
            "4 bits is a quarter of 16 bits, so the weights take about ¼ of the memory (plus a little overhead).",
        },
      ],
      takeaways: [
        "LoRA trains tiny low-rank adapters while freezing the base.",
        "Quantisation shrinks memory by storing weights in fewer bits.",
        "QLoRA combines both for single-GPU fine-tuning.",
        "Fine-tune for behaviour, use RAG for knowledge.",
      ],
      sources: [
        {
          title: "LoRA: Low-Rank Adaptation of Large Language Models",
          url: "https://arxiv.org/abs/2106.09685",
          by: "Hu et al., 2021",
        },
        {
          title: "QLoRA: Efficient Finetuning of Quantized LLMs",
          url: "https://arxiv.org/abs/2305.14314",
          by: "Dettmers et al., 2023",
        },
        {
          title: "PEFT library documentation",
          url: "https://huggingface.co/docs/peft",
          by: "Hugging Face",
          note: "Apache 2.0",
        },
      ],
    },
    {
      slug: "diffusion",
      title: "Diffusion: art from noise",
      emoji: "🎨",
      minutes: 6,
      summary:
        "How Stable Diffusion and friends turn static into pictures, one denoising step at a time.",
      blocks: [
        {
          kind: "p",
          text: "Image generators like Stable Diffusion, DALL·E and Midjourney are built on a beautifully odd idea: teach a network to remove noise, then start from *pure* noise and let it keep cleaning until a picture appears.",
        },
        {
          kind: "figure",
          graphic: "diffusion",
          caption:
            "Forward process adds noise step by step. The model learns the reverse: predicting and removing noise to recover an image.",
        },
        {
          kind: "interactive",
          id: "diffusion",
          caption: "Run the reverse process from static to an image.",
        },
        {
          kind: "card",
          title: "➡️ Forward: destroy",
          body: [
            "Take a real image and add a little Gaussian noise. Repeat for, say, 1,000 steps until it's pure static.",
            "This direction needs no learning; it's just maths.",
          ],
        },
        {
          kind: "card",
          title: "⬅️ Reverse: create",
          body: [
            "Train a network (often a U-Net or a transformer) to look at a noisy image and predict **the noise** that was added.",
            "Subtract the predicted noise, step by step, and an image emerges from static.",
          ],
        },
        {
          kind: "quiz",
          question: "What is a diffusion model usually trained to predict?",
          options: [
            "The final image in one step",
            "The noise that was added to an image",
            "The caption of the image",
            "The next pixel",
          ],
          answer: 1,
          explain:
            "The standard DDPM objective trains the network to predict the added noise at each step.",
        },
        {
          kind: "card",
          title: "📝 Text-to-image",
          body: [
            "To follow a prompt, the denoiser is **conditioned** on a text embedding (e.g. from CLIP or a T5 encoder) via cross-attention.",
            "**Classifier-free guidance** pushes outputs harder towards the prompt; the \"guidance scale\" slider controls how strongly.",
          ],
        },
        {
          kind: "card",
          title: "🗜️ Latent diffusion",
          body: [
            "Denoising full-resolution pixels is expensive. Stable Diffusion works in a compressed **latent space** from an autoencoder, then decodes to pixels at the end.",
            "Same idea, far cheaper, which is why it runs on consumer GPUs.",
          ],
        },
        {
          kind: "tip",
          text: "Pillow thought: the same denoising idea now generates video, audio, 3-D shapes and even protein structures.",
        },
        {
          kind: "quiz",
          question: "Why does Stable Diffusion work in latent space?",
          options: [
            "To make images blurrier",
            "It's much cheaper than denoising every pixel directly",
            "Latent space contains the text prompt",
            "Pixels can't contain noise",
          ],
          answer: 1,
          explain:
            "Working on a compressed representation slashes compute while keeping image quality high.",
        },
      ],
      takeaways: [
        "Forward process: add noise. Reverse process: learn to remove it.",
        "Models predict noise, then subtract it step by step.",
        "Text conditioning + guidance steer the image.",
        "Latent diffusion makes it efficient.",
      ],
      sources: [
        {
          title: "Denoising Diffusion Probabilistic Models",
          url: "https://arxiv.org/abs/2006.11239",
          by: "Ho, Jain & Abbeel, 2020",
        },
        {
          title: "What are Diffusion Models?",
          url: "https://lilianweng.github.io/posts/2021-07-11-diffusion-models/",
          by: "Lilian Weng",
        },
        {
          title: "The Illustrated Stable Diffusion",
          url: "https://jalammar.github.io/illustrated-stable-diffusion/",
          by: "Jay Alammar",
        },
        {
          title: "Hugging Face Diffusion Models Course",
          url: "https://huggingface.co/learn/diffusion-course",
          by: "Hugging Face",
          note: "Apache 2.0",
        },
      ],
    },
    {
      slug: "reinforcement-learning",
      title: "Reinforcement learning, deeper",
      emoji: "🕹️",
      minutes: 7,
      summary:
        "Policies, values and rewards: the maths of learning by doing.",
      blocks: [
        {
          kind: "p",
          text: "Reinforcement learning (RL) trained AlphaGo, teaches robots to walk, and is now central to making LLMs reason. Here's the vocabulary and the core ideas.",
        },
        {
          kind: "figure",
          graphic: "rl-loop",
          caption:
            "The agent observes a state, takes an action, and the environment returns a reward and a new state. Repeat.",
        },
        {
          kind: "card",
          title: "📖 The vocabulary",
          body: [
            "**State** s: what the agent observes. **Action** a: what it does. **Reward** r: the score signal.",
            "**Policy** π(a|s): the agent's strategy, a mapping from states to actions.",
            "**Return**: total future reward, usually **discounted** by γ (e.g. 0.99) so sooner rewards count more.",
          ],
        },
        {
          kind: "card",
          title: "💎 Value functions",
          body: [
            "**V(s)**: how good is it to be in this state, if I follow my policy?",
            "**Q(s, a)**: how good is taking action a in state s?",
            "**Q-learning** learns Q directly; **DQN** used a neural net for Q and learned to play Atari games from pixels.",
          ],
        },
        {
          kind: "quiz",
          question: "What does a policy define?",
          options: [
            "The reward the environment gives",
            "Which action the agent takes in each state",
            "The size of the neural network",
            "The discount factor",
          ],
          answer: 1,
          explain:
            "The policy is the agent's behaviour: given a state, which action (or distribution over actions) to take.",
        },
        {
          kind: "card",
          title: "🎯 Policy gradients",
          body: [
            "Instead of learning values, directly nudge the policy to make high-reward actions more likely.",
            "**PPO** (proximal policy optimisation) adds a safety clip so each update doesn't change the policy too much. It's the workhorse behind classic RLHF.",
          ],
        },
        {
          kind: "card",
          title: "🔍 Explore vs. exploit",
          body: [
            "Keep ordering your favourite dish (exploit) or try something new that might be better (explore)?",
            "Agents need both. Simple trick: ε-greedy, which takes a random action with small probability ε.",
          ],
        },
        {
          kind: "card",
          title: "⚠️ Reward hacking",
          body: [
            "Agents optimise exactly what you reward, not what you meant. A boat-racing agent famously learned to spin in circles collecting points instead of finishing the race.",
            "Designing rewards that can't be gamed is a central challenge, especially for LLMs.",
          ],
        },
        {
          kind: "quiz",
          question:
            "With discount factor γ = 0.9, a reward of 10 received two steps in the future is worth…",
          options: ["10", "9", "8.1", "0.81"],
          answer: 2,
          explain: "10 × 0.9 × 0.9 = 8.1. Each step of delay multiplies by γ.",
        },
      ],
      takeaways: [
        "Agent ↔ environment: state, action, reward, next state.",
        "Value methods learn how good states/actions are; policy methods learn behaviour directly.",
        "PPO is the go-to policy gradient algorithm.",
        "Balance exploration and exploitation; beware reward hacking.",
      ],
      sources: [
        {
          title: "Reinforcement Learning: An Introduction (2nd ed., free)",
          url: "http://incompleteideas.net/book/the-book-2nd.html",
          by: "Richard Sutton & Andrew Barto",
        },
        {
          title: "Spinning Up in Deep RL",
          url: "https://spinningup.openai.com/",
          by: "OpenAI",
          note: "MIT licensed code",
        },
        {
          title: "Hugging Face Deep RL Course",
          url: "https://huggingface.co/learn/deep-rl-course",
          by: "Hugging Face",
          note: "Apache 2.0",
        },
        {
          title: "Specification gaming examples",
          url: "https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/",
          by: "Google DeepMind",
        },
      ],
    },
    {
      slug: "scaling-and-safety",
      title: "Scaling laws, evals & safety",
      emoji: "🧭",
      minutes: 7,
      summary:
        "Why bigger got better, how we measure frontier models, and the open problems in keeping AI safe.",
      blocks: [
        {
          kind: "p",
          text: "Much of the last decade of AI progress came from one discovery: performance improves *predictably* as you scale up compute, data and model size. That predictability shapes billion-dollar decisions, and raises serious questions.",
        },
        {
          kind: "figure",
          graphic: "scaling",
          caption:
            "On a log–log plot, loss falls in a remarkably straight line as training compute grows (illustrative).",
        },
        {
          kind: "card",
          title: "📈 Scaling laws",
          body: [
            "Kaplan et al. (2020) found loss follows smooth **power laws** in parameters, data and compute.",
            "Chinchilla (2022) showed many models were under-trained: for a fixed compute budget, scale parameters and tokens together (roughly 20 tokens per parameter).",
          ],
        },
        {
          kind: "quiz",
          question: "What was the key Chinchilla finding?",
          options: [
            "Bigger models always win, regardless of data",
            "For a fixed budget, many models were too big and trained on too little data",
            "Data doesn't matter",
            "Scaling has stopped working",
          ],
          answer: 1,
          explain:
            "Chinchilla showed compute-optimal training scales data alongside parameters; a smaller model on more tokens beat larger ones.",
        },
        {
          kind: "card",
          title: "🧪 Evaluating frontier models",
          body: [
            "Benchmarks test knowledge (MMLU), maths (GSM8K, MATH), coding (HumanEval, SWE-bench) and more.",
            "Problems: benchmarks **saturate**, and test questions can leak into training data (**contamination**). So labs increasingly use held-out, human-rated and agentic evaluations.",
          ],
        },
        {
          kind: "card",
          title: "🛡️ Alignment & safety",
          body: [
            "**Alignment**: making systems pursue what we actually intend. Reward hacking and sycophancy are everyday examples of misalignment.",
            "**Robustness**: resisting jailbreaks and prompt injection.",
            "**Interpretability**: understanding what's happening inside the network, e.g. finding human-understandable features inside models.",
          ],
        },
        {
          kind: "card",
          title: "🏛️ Responsible deployment",
          body: [
            "Labs publish model cards and system cards, run red-teaming, and test for dangerous capabilities before release.",
            "Policies like responsible scaling commitments tie stronger safeguards to more capable models.",
          ],
        },
        {
          kind: "tip",
          text: "Pillow thought: \"Concrete Problems in AI Safety\" (2016) is a short, readable paper that frames many of these issues with everyday examples like a cleaning robot. A good one to fall asleep thinking about.",
        },
        {
          kind: "quiz",
          question: "What is \"benchmark contamination\"?",
          options: [
            "A virus in the benchmark files",
            "Test questions leaking into training data, inflating scores",
            "Running the benchmark on a slow computer",
            "Using too many benchmarks",
          ],
          answer: 1,
          explain:
            "If a model has seen the test questions during training, its score no longer measures real ability.",
        },
      ],
      takeaways: [
        "Loss falls predictably with scale (power laws).",
        "Compute-optimal training scales data with parameters.",
        "Benchmarks saturate and leak, so evaluation is an active field.",
        "Alignment, robustness and interpretability are core open problems.",
      ],
      sources: [
        {
          title: "Scaling Laws for Neural Language Models",
          url: "https://arxiv.org/abs/2001.08361",
          by: "Kaplan et al., 2020",
        },
        {
          title: "Training Compute-Optimal LLMs (Chinchilla)",
          url: "https://arxiv.org/abs/2203.15556",
          by: "Hoffmann et al., 2022",
        },
        {
          title: "Concrete Problems in AI Safety",
          url: "https://arxiv.org/abs/1606.06565",
          by: "Amodei et al., 2016",
        },
        {
          title: "Transformer Circuits Thread (interpretability research)",
          url: "https://transformer-circuits.pub/",
          by: "Anthropic interpretability team",
        },
      ],
    },
    ...advancedMore,
  ],
};
