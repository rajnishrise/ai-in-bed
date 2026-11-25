import type { BlogPost } from "./blog";

/**
 * Round two of the blog (November 2026): the long-tail questions behind the
 * glossary terms people search for most (RAG, LoRA, tokens, embeddings,
 * attention, neural networks), plus running models locally and AI careers.
 */
export const morePosts: BlogPost[] = [
  {
    slug: "what-is-rag",
    title: "What is RAG (retrieval-augmented generation)? A simple explanation",
    seoTitle: "What Is RAG in AI? Retrieval-Augmented Generation Explained Simply",
    description:
      "RAG (retrieval-augmented generation) lets an AI look things up before it answers: it searches your documents, adds the best passages to the prompt and answers from them. How RAG works, examples, and when to use it.",
    topic: "How AI works",
    published: "2026-11-25",
    answer:
      "RAG, short for retrieval-augmented generation, is a way to make an AI answer from specific documents instead of only from memory. When you ask a question, the system first searches a collection of text, such as your company's help pages, picks the most relevant passages and pastes them into the prompt. The language model then writes its answer from those passages, often with citations, so answers are more current, more accurate and easier to check.",
    takeaways: [
      "RAG = search first, then generate: retrieve relevant text, add it to the prompt, answer from it.",
      "It lets an AI use private or recent information it was never trained on.",
      "It cuts down on hallucinations and makes answers checkable with sources.",
      "Most RAG systems find passages by meaning using embeddings, not just keywords.",
    ],
    sections: [
      {
        heading: "RAG in one sentence",
        blocks: [
          "A large language model on its own answers from what it absorbed during training, like a student taking a test from memory. [RAG](/glossary/rag) turns that into an open-book test: before answering, the AI looks up the right pages and reads them.",
          "The idea and the name come from a 2020 research paper by Patrick Lewis and colleagues at Facebook AI Research. Today it's the most common way companies connect chatbots to their own documents.",
        ],
      },
      {
        heading: "How RAG works, step by step",
        blocks: [
          "There are two phases. First you prepare your documents once, then every question runs a quick search.",
          {
            ol: [
              "**Split** your documents into short chunks, say a few paragraphs each.",
              "**Embed** each chunk: turn it into a list of numbers that captures its meaning. These are [embeddings](/glossary/embedding), and similar meanings get similar numbers. They're stored in a search index, often called a vector database.",
              "**Retrieve.** When a question comes in, embed it the same way and find the chunks whose numbers are closest. Many systems also mix in ordinary keyword search.",
              "**Augment.** Put the best few chunks into the [prompt](/glossary/prompt), with an instruction like \"answer using only these sources and cite them\".",
              "**Generate.** The [LLM](/glossary/llm) writes the answer from the passages in front of it.",
            ],
          },
          "Want the details of step 2? Read [what embeddings are](/blog/what-are-embeddings). You can also try a small retriever yourself in the [RAG and agents lesson](/learn/advanced/rag-and-agents).",
        ],
      },
      {
        heading: "Why RAG is so popular",
        blocks: [
          [
            "**Fresh information.** Models stop learning at their training cutoff. RAG can search documents updated this morning.",
            "**Private knowledge.** Your internal wiki, contracts or support tickets were never in the training data. RAG lets the model use them without retraining.",
            "**Fewer made-up answers.** A model that reads the source is less likely to invent one. See [why AI hallucinates](/blog/why-does-ai-hallucinate).",
            "**Citations.** Because the system knows which passages it used, it can show them, so people can check.",
            "**Cheap to update.** Add a document to the index and it's searchable straight away. No training run needed.",
          ],
        ],
      },
      {
        heading: "Examples of RAG",
        blocks: [
          [
            "A **customer support bot** that answers from the help centre and links the article it used.",
            "An **internal assistant** that searches HR policies, engineering docs or past tickets.",
            "**AI search engines** that search the web, read the top pages and write a summary with links.",
            "A **legal or medical research tool** that only answers from an approved library of documents.",
          ],
        ],
      },
      {
        heading: "Where RAG goes wrong",
        blocks: [
          "RAG is only as good as its search. If the right passage isn't retrieved, the model can still guess. Common problems:",
          [
            "**Bad chunks.** Split a table or a list in half and neither half makes sense on its own.",
            "**Wrong passages.** The question uses different words from the document, or many documents look similar.",
            "**Too much context.** Stuffing in dozens of passages can bury the useful one. More isn't always better, even with a big [context window](/glossary/context-window).",
            "**Hidden instructions.** A retrieved document can contain text that tries to hijack the model, a form of [prompt injection](/glossary/prompt-injection).",
          ],
          { tip: "Test a RAG system on real questions with known answers. Check two things separately: did it retrieve the right passage, and did it answer correctly from it?" },
        ],
      },
      {
        heading: "RAG vs fine-tuning",
        blocks: [
          "RAG gives a model **knowledge** at the moment it answers. [Fine-tuning](/glossary/fine-tuning) changes the model itself, which is better for teaching a **style, format or skill**. For facts that change, RAG is usually the better first choice. We compare all the options in [fine-tuning vs RAG vs prompt engineering](/blog/fine-tuning-vs-rag-vs-prompt-engineering).",
          "When RAG is put in a loop, where the model decides what to search for next, it becomes an [AI agent](/blog/what-is-an-ai-agent).",
        ],
      },
    ],
    faqs: [
      {
        q: "What does RAG stand for in AI?",
        a: "RAG stands for retrieval-augmented generation. The AI retrieves relevant text from a collection of documents, adds it to the prompt, and generates an answer based on it.",
      },
      {
        q: "Is RAG better than fine-tuning?",
        a: "For giving a model up-to-date or private facts, RAG is usually better: it's cheaper, easy to update and can cite sources. Fine-tuning is better for changing how a model behaves, such as its style, format or a narrow skill. Many systems use both.",
      },
      {
        q: "Does ChatGPT use RAG?",
        a: "When ChatGPT or similar assistants search the web or read files you upload before answering, they are using a form of retrieval-augmented generation.",
      },
      {
        q: "What is a vector database in RAG?",
        a: "A vector database stores the embeddings of your document chunks and quickly finds the ones closest in meaning to a question. It's the search engine part of a RAG system.",
      },
    ],
    lessons: ["advanced/rag-and-agents", "intermediate/embeddings", "beginner/meet-llms", "intermediate/testing-language-models"],
    sources: [
      { title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", url: "https://arxiv.org/abs/2005.11401", by: "Lewis et al., 2020" },
      { title: "Hugging Face LLM Course", url: "https://huggingface.co/learn/llm-course", by: "Hugging Face", note: "Free course" },
      { title: "The Illustrated Word2vec", url: "https://jalammar.github.io/illustrated-word2vec/", by: "Jay Alammar" },
    ],
  },

  {
    slug: "fine-tuning-vs-rag-vs-prompt-engineering",
    title: "Fine-tuning vs RAG vs prompt engineering: which should you use?",
    seoTitle: "Fine-Tuning vs RAG vs Prompt Engineering: Which to Use (and LoRA Explained)",
    description:
      "Three ways to make an AI model do what you need: better prompts, RAG or fine-tuning. What each one changes, what it costs, when to use it, and how LoRA makes fine-tuning cheap.",
    topic: "Using AI well",
    published: "2026-11-25",
    answer:
      "Start with prompt engineering, add RAG when the model needs facts it doesn't have, and fine-tune only when you need to change how the model behaves. Prompting changes the instructions, RAG changes what the model can read when it answers, and fine-tuning changes the model's weights by training it on examples. LoRA is a cheap way to fine-tune that trains a small add-on instead of the whole model.",
    takeaways: [
      "Prompt engineering: change the instructions. Fastest and free.",
      "RAG: give the model the right documents at answer time. Best for facts.",
      "Fine-tuning: train the model on examples. Best for style, format and narrow skills.",
      "LoRA and QLoRA make fine-tuning affordable on a single GPU.",
    ],
    sections: [
      {
        heading: "The short version",
        blocks: [
          "Think of a new employee. **Prompting** is giving them clear instructions. **RAG** is handing them the right binder before each question. **Fine-tuning** is sending them on a training course so the skill sticks.",
          [
            "**Prompt engineering** changes: the instructions. Cost: minutes. Good for: almost everything, first.",
            "**RAG** changes: what the model reads when it answers. Cost: some setup and a search index. Good for: private, changing or citable facts.",
            "**Fine-tuning** changes: the model's weights. Cost: example data, a training run and evaluation. Good for: consistent style, strict formats, specialist tasks, smaller cheaper models.",
          ],
        ],
      },
      {
        heading: "1. Prompt engineering: always try this first",
        blocks: [
          "A clear [prompt](/glossary/prompt) with a role, context, the exact output format and a couple of examples ([few-shot prompting](/glossary/few-shot-prompting)) solves more problems than people expect. It costs nothing, you can change it in seconds, and it works with any model.",
          "Its limit: the model still only knows what it learned in training, and long, complicated prompts get expensive and fragile. Our [prompt engineering guide](/blog/prompt-engineering-for-beginners) has templates to start from.",
        ],
      },
      {
        heading: "2. RAG: when the model needs your facts",
        blocks: [
          "If the answer lives in documents the model has never seen, such as your product manual, last week's prices or internal policies, use retrieval-augmented generation. The system searches your documents and puts the best passages in the prompt. You can update the knowledge just by adding a file, and answers can cite their sources.",
          "RAG doesn't teach the model new habits, though. If it writes in the wrong tone or ignores your format, more documents won't fix that. Full explanation: [what is RAG](/blog/what-is-rag).",
        ],
      },
      {
        heading: "3. Fine-tuning: when you need new behaviour",
        blocks: [
          "[Fine-tuning](/glossary/fine-tuning) continues training a model on your own examples, usually hundreds to thousands of input and ideal-output pairs. The model's [parameters](/glossary/parameters-weights) shift so the behaviour becomes the default, without long instructions.",
          "Fine-tuning is worth it when you need:",
          [
            "A **consistent voice or format**, every time, such as a strict JSON layout or a house style.",
            "A **narrow skill** done well, like classifying support tickets or extracting fields from invoices.",
            "A **smaller, cheaper model** that matches a big one on your one task. This is related to [knowledge distillation](/glossary/knowledge-distillation).",
          ],
          "It's a poor way to add facts. Models learn facts from fine-tuning unreliably and can mix them up, and you'd have to retrain every time something changes. It can also make a model worse at things you didn't train on, so you need an [eval](/glossary/eval) to check.",
        ],
      },
      {
        heading: "What is LoRA? Fine-tuning on a budget",
        blocks: [
          "Fully fine-tuning a model with billions of parameters needs lots of GPU memory. [LoRA](/glossary/lora) (low-rank adaptation, from a 2021 Microsoft paper) freezes the original model and trains a pair of small extra matrices next to some of its layers. Those adapters are often well under 1% of the model's size, so training is far cheaper and the result is a small file you can swap in and out.",
          "**QLoRA** (2023) goes further: it stores the frozen model in 4-bit [quantisation](/glossary/quantisation) and trains LoRA adapters on top, which made it possible to fine-tune large models on a single GPU. The [efficient fine-tuning lesson](/learn/advanced/efficient-finetuning) walks through both.",
          { tip: "Fine-tuning tools are free and open: Hugging Face's PEFT and TRL libraries support LoRA and QLoRA, and many cloud AI providers offer fine-tuning through their APIs." },
        ],
      },
      {
        heading: "Using them together",
        blocks: [
          "These aren't rivals. A strong production system often uses all three: a fine-tuned model that reliably follows the format, RAG to supply current facts, and a carefully written prompt holding it together. Build in that order, and measure at each step whether the next one is worth it.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between fine-tuning and RAG?",
        a: "RAG gives a model relevant documents to read at the moment it answers, without changing the model. Fine-tuning trains the model on examples, changing its weights so it behaves differently. RAG is better for facts; fine-tuning is better for style, format and narrow skills.",
      },
      {
        q: "When should I fine-tune an LLM?",
        a: "Fine-tune when good prompts and RAG still don't give consistent results: you need a fixed format or voice every time, a specialist task done reliably, or a smaller, cheaper model that matches a bigger one on one job.",
      },
      {
        q: "What is LoRA in AI?",
        a: "LoRA (low-rank adaptation) is a cheap way to fine-tune a large model. It freezes the original weights and trains small add-on matrices, so it needs much less memory and produces a small adapter file.",
      },
      {
        q: "Is prompt engineering enough?",
        a: "Often, yes. Clear instructions, context and a few examples solve many tasks. Add RAG when the model needs information it doesn't have, and fine-tuning only when behaviour still isn't consistent.",
      },
    ],
    lessons: ["advanced/efficient-finetuning", "advanced/rag-and-agents", "beginner/prompting-well", "advanced/distillation-and-small-models"],
    sources: [
      { title: "LoRA: Low-Rank Adaptation of Large Language Models", url: "https://arxiv.org/abs/2106.09685", by: "Hu et al. (Microsoft), 2021" },
      { title: "QLoRA: Efficient Finetuning of Quantized LLMs", url: "https://arxiv.org/abs/2305.14314", by: "Dettmers et al., 2023" },
      { title: "Hugging Face LLM Course", url: "https://huggingface.co/learn/llm-course", by: "Hugging Face", note: "Free course" },
    ],
  },

  {
    slug: "what-are-tokens-in-ai",
    title: "What are tokens in AI? Tokens and context windows explained",
    seoTitle: "What Are Tokens in AI? How Many Words Is a Token, and What Is a Context Window",
    description:
      "AI models read and write text in tokens: words or pieces of words. How tokenisation works, how many words a token is, what a context window is, and why tokens decide what AI costs.",
    topic: "AI basics",
    published: "2026-11-25",
    answer:
      "A token is the unit of text an AI language model reads and writes: often a whole short word, sometimes part of a longer word, a number or a punctuation mark. In English, one token is about four characters, or roughly three quarters of a word, so 100 tokens is about 75 words. A model's context window is the maximum number of tokens it can take in at once, and AI services usually charge per token.",
    takeaways: [
      "Models don't see letters or words; they see tokens, each mapped to a number.",
      "Rule of thumb for English: 1 token ≈ 4 characters ≈ ¾ of a word.",
      "The context window is the model's working memory, measured in tokens.",
      "Pricing, speed and limits are all counted in tokens, in and out.",
    ],
    sections: [
      {
        heading: "What a token is",
        blocks: [
          "Before a language model can read your message, a program called a **tokeniser** chops it into pieces from a fixed vocabulary, often tens of thousands to a couple of hundred thousand entries. Each piece is a [token](/glossary/token), and each token has an ID number. The model only ever sees those numbers.",
          "Common words get their own token. Rarer words are built from parts: \"tokenisation\" might become \"token\", \"isation\". A space is usually attached to the start of the next word, and numbers are often split into chunks of digits.",
          "Try pasting a sentence into a free tokeniser tool, like OpenAI's, to watch it split. The [tokenisation lesson](/learn/intermediate/tokenisation) shows how vocabularies are learned.",
        ],
      },
      {
        heading: "How many words is a token?",
        blocks: [
          "For ordinary English text, OpenAI's rule of thumb is that one token is about four characters, or about ¾ of a word:",
          [
            "**1 token** ≈ 4 characters ≈ ¾ of a word",
            "**100 tokens** ≈ 75 words, about a paragraph",
            "**1,000 tokens** ≈ 750 words, about a page and a half",
            "**100,000 tokens** ≈ 75,000 words, a full-length novel",
          ],
          "Other languages often take more tokens for the same meaning, because tokeniser vocabularies are built mostly from English-heavy text. Code, maths and unusual names can also use more tokens than you'd guess.",
        ],
      },
      {
        heading: "Why AI uses tokens instead of words or letters",
        blocks: [
          "Letters alone would make every text very long and slow to process. Whole words would need an enormous vocabulary and still fail on new words, typos and names. Subword tokens, usually built with a method called byte-pair encoding, are the compromise: common words stay whole, and anything else can still be spelled out from pieces.",
          "Tokens explain some odd AI behaviour. Models have historically struggled to count the letters in a word, because they see \"strawberry\" as one or two tokens, not ten letters.",
        ],
      },
      {
        heading: "What is a context window?",
        blocks: [
          "The [context window](/glossary/context-window) is the most tokens a model can handle in one go: your messages, any documents or instructions, the conversation so far and its own reply. Think of it as working memory. When a chat gets longer than the window, the oldest parts have to be dropped or summarised, which is why a long chat can \"forget\" what you said at the start.",
          "Context windows have grown fast, from a couple of thousand tokens in early models to hundreds of thousands or more today. But a big window isn't perfect memory: models can miss details buried in the middle of very long inputs, and longer inputs cost more and run slower. That's why tools like [RAG](/blog/what-is-rag) still pick only the most relevant passages.",
        ],
      },
      {
        heading: "Why tokens matter for cost and speed",
        blocks: [
          [
            "**Price.** AI APIs charge per million tokens, usually with separate prices for input and output. Output tokens often cost several times more.",
            "**Speed.** A model writes one token at a time, so a long answer takes longer. Speed is quoted in tokens per second.",
            "**Limits.** Maximum reply lengths and usage caps are set in tokens.",
            "**Reasoning.** Reasoning models \"think\" in tokens too, which is why harder questions can cost more. See [test-time compute](/glossary/test-time-compute).",
          ],
          { tip: "To save tokens: trim long pasted documents to the relevant parts, ask for concise answers, and start a fresh chat when you change topic." },
        ],
      },
    ],
    faqs: [
      {
        q: "How many words is 1,000 tokens?",
        a: "About 750 words of ordinary English text. The rule of thumb is that one token is roughly four characters, or three quarters of a word. Other languages and code usually take more tokens.",
      },
      {
        q: "What is a token in ChatGPT?",
        a: "A token is a piece of text ChatGPT reads or writes: a short word, part of a longer word, a number or punctuation. Your message is split into tokens, and the reply is generated one token at a time.",
      },
      {
        q: "What is a context window in an LLM?",
        a: "It's the maximum number of tokens the model can consider at once, including your input, the conversation history and its reply. Anything beyond it has to be dropped or summarised.",
      },
      {
        q: "Why do AI models charge per token?",
        a: "Because the computing work grows with the number of tokens processed and generated. Counting tokens is a fair, simple way to measure how much the model did.",
      },
    ],
    lessons: ["intermediate/tokenisation", "beginner/meet-llms", "advanced/inference-and-serving", "advanced/transformers"],
    sources: [
      { title: "Tokenizer", url: "https://platform.openai.com/tokenizer", by: "OpenAI", note: "Free tool" },
      { title: "Let's build the GPT Tokenizer", url: "https://www.youtube.com/watch?v=zduSFxRajkE", by: "Andrej Karpathy", note: "Free video" },
      { title: "Hugging Face LLM Course", url: "https://huggingface.co/learn/llm-course", by: "Hugging Face", note: "Free course" },
    ],
  },

  {
    slug: "what-are-embeddings",
    title: "What are embeddings in AI? A simple explanation",
    seoTitle: "What Are Embeddings in AI? Vector Embeddings Explained Simply",
    description:
      "An embedding turns a word, sentence or image into a list of numbers that captures its meaning, so AI can measure how similar things are. How embeddings work and where they're used: search, RAG and recommendations.",
    topic: "How AI works",
    published: "2026-11-25",
    answer:
      "An embedding is a list of numbers, called a vector, that represents the meaning of something: a word, a sentence, a document, an image or a product. Things with similar meanings get vectors that are close together, so a computer can find related items by measuring distance. Embeddings power semantic search, RAG chatbots, recommendations and clustering.",
    takeaways: [
      "An embedding is a point in a space with hundreds or thousands of dimensions.",
      "Close together means similar in meaning; far apart means unrelated.",
      "They're learned by a neural network, not written by hand.",
      "Uses: search by meaning, RAG, recommendations, duplicates, clustering.",
    ],
    sections: [
      {
        heading: "Meaning as coordinates",
        blocks: [
          "Imagine placing every word on a map so that similar words sit near each other: \"cat\" next to \"kitten\", both near \"dog\", all far from \"spreadsheet\". An [embedding](/glossary/embedding) is a word's coordinates on that map.",
          "A real embedding map doesn't have two dimensions but hundreds or thousands, so each embedding is a list of that many numbers. No single number means anything obvious on its own; meaning comes from where the whole point sits relative to others.",
          "The [embeddings lesson](/learn/intermediate/embeddings) has an interactive map you can explore.",
        ],
      },
      {
        heading: "How similarity is measured",
        blocks: [
          "To compare two embeddings, systems usually use **cosine similarity**: how closely the two vectors point in the same direction. A score near 1 means very similar, near 0 means unrelated.",
          "This is what lets you search by meaning. A search for \"how do I get my money back\" can find a page titled \"Refund policy\" even though they share no words, because their embeddings land close together.",
          "Famously, the 2013 word2vec work showed directions in the space can capture relationships: the vector for \"king\" minus \"man\" plus \"woman\" lands near \"queen\". Modern embeddings are messier, but the idea of meaning as geometry stuck.",
        ],
      },
      {
        heading: "Where embeddings come from",
        blocks: [
          "Embeddings are learned. A [neural network](/glossary/neural-network) is trained on a huge amount of data with a task that forces it to understand meaning, such as predicting nearby words or matching questions with their answers. Along the way it learns to place similar things close together.",
          "Inside a [large language model](/glossary/llm), the very first step turns each [token](/glossary/token) into an embedding, and every layer after that refines those vectors using [attention](/glossary/attention). Separate **embedding models** are trained just to produce one good vector per sentence or document for search.",
        ],
      },
      {
        heading: "What embeddings are used for",
        blocks: [
          [
            "**Semantic search:** find documents by meaning, not exact words.",
            "**RAG chatbots:** find the passages an AI should read before it answers. See [what is RAG](/blog/what-is-rag).",
            "**Recommendations:** embed users and items, and suggest items close to what you liked. See the [recommender systems lesson](/learn/intermediate/recommender-systems).",
            "**Clustering:** group similar support tickets, reviews or articles automatically ([clustering](/glossary/clustering)).",
            "**Duplicates and anomalies:** spot near-identical items or ones that don't fit.",
            "**Images and multimodal:** models like CLIP put pictures and captions in the same space, so you can search photos with words. See [multimodal](/glossary/multimodal).",
          ],
        ],
      },
      {
        heading: "Vector databases",
        blocks: [
          "Comparing a question against millions of embeddings one by one would be slow. A **vector database** or vector index stores embeddings and uses clever shortcuts (approximate nearest-neighbour search) to find the closest ones in milliseconds. Open-source options include FAISS, and many ordinary databases now support vectors too.",
          { tip: "Always use the same embedding model for your documents and your queries. Vectors from different models live on different maps and can't be compared." },
        ],
      },
    ],
    faqs: [
      {
        q: "What is an embedding in simple terms?",
        a: "It's a list of numbers that represents the meaning of a piece of data, like a word or sentence. Similar meanings get similar numbers, so a computer can tell which things are related.",
      },
      {
        q: "What is the difference between a token and an embedding?",
        a: "A token is a piece of text, such as a word or part of a word, with an ID number. An embedding is the list of numbers a model uses to represent that token's, or a whole text's, meaning.",
      },
      {
        q: "What are embeddings used for?",
        a: "Semantic search, finding passages for RAG chatbots, recommendations, clustering similar items, spotting duplicates, and searching images with text.",
      },
      {
        q: "What is a vector embedding?",
        a: "The same thing as an embedding: the word vector just stresses that it's a list of numbers that can be treated as a point or direction in a high-dimensional space.",
      },
    ],
    lessons: ["intermediate/embeddings", "advanced/rag-and-agents", "intermediate/recommender-systems", "intermediate/clustering"],
    sources: [
      { title: "The Illustrated Word2vec", url: "https://jalammar.github.io/illustrated-word2vec/", by: "Jay Alammar" },
      { title: "Efficient Estimation of Word Representations in Vector Space", url: "https://arxiv.org/abs/1301.3781", by: "Mikolov et al., 2013" },
      { title: "Machine Learning Crash Course: Embeddings", url: "https://developers.google.com/machine-learning/crash-course", by: "Google", note: "Free course" },
    ],
  },

  {
    slug: "how-do-neural-networks-work",
    title: "How do neural networks work? A beginner's guide",
    seoTitle: "How Do Neural Networks Work? A Simple Explanation for Beginners",
    description:
      "A neural network is layers of simple maths units that learn patterns from examples by adjusting millions of numbers. Neurons, layers, weights, training and backpropagation explained without the maths.",
    topic: "AI basics",
    published: "2026-11-25",
    answer:
      "A neural network is a stack of layers made of simple units called neurons. Each neuron multiplies its inputs by weights, adds them up and passes the result through an activation function to the next layer. The network learns by comparing its outputs with correct answers and nudging all the weights to reduce the error, using backpropagation and gradient descent, millions of times over.",
    takeaways: [
      "Neuron = weighted sum of inputs + an activation function.",
      "Layers stack up: early ones find simple patterns, later ones combine them.",
      "Learning means adjusting weights to shrink a loss, step by step.",
      "\"Deep learning\" just means neural networks with many layers.",
    ],
    sections: [
      {
        heading: "A neuron is a tiny calculator",
        blocks: [
          "Despite the name, an artificial neuron is very simple. It takes a few numbers in, multiplies each by a **weight** that says how much it matters, adds them up with a **bias**, and passes the total through an [activation function](/glossary/activation-function) that decides how strongly to \"fire\".",
          "Example: deciding whether to go for a run. Inputs might be \"is it sunny\", \"am I tired\" and \"do I have time\". The weights say sunshine helps a bit, tiredness hurts a lot. The neuron's output is a score for \"go\". That's it: one neuron is a weighted vote.",
        ],
      },
      {
        heading: "Layers turn simple votes into rich patterns",
        blocks: [
          "One neuron can't do much. Wire thousands together in **layers** and it gets powerful:",
          [
            "The **input layer** takes raw data: pixel brightness, word embeddings, sensor readings.",
            "**Hidden layers** each take the previous layer's outputs and combine them. In an image network, early layers respond to edges, middle layers to shapes like eyes or wheels, later layers to whole objects.",
            "The **output layer** gives the answer: \"92% cat\", a predicted price, or the next word.",
          ],
          "A network with many hidden layers is a **deep** network, which is where [deep learning](/glossary/deep-learning) gets its name. The activation functions matter here: without them, all the layers would collapse into one big linear sum and the network couldn't learn curves or complex patterns.",
          "Play with one in the [neural networks lesson](/learn/beginner/neural-networks-gently).",
        ],
      },
      {
        heading: "How a neural network learns",
        blocks: [
          "Nobody sets the weights by hand. A network starts with random weights and learns from labelled examples:",
          {
            ol: [
              "**Forward pass.** Feed in an example, say a photo, and get a guess.",
              "**Measure the error.** A [loss function](/glossary/loss-function) scores how wrong the guess was.",
              "**Backpropagation.** Work backwards through the network to calculate how much each weight contributed to the error. See [backpropagation](/glossary/backpropagation).",
              "**Gradient descent.** Nudge every weight slightly in the direction that reduces the error. The size of the nudge is the [learning rate](/glossary/learning-rate).",
              "**Repeat** over many examples and many passes ([epochs](/glossary/epoch)) until the error stops falling.",
            ],
          },
          "The lessons on [gradient descent](/learn/intermediate/gradient-descent) and [backpropagation](/learn/intermediate/backpropagation) show each step with sliders you can move.",
        ],
      },
      {
        heading: "Types of neural networks",
        blocks: [
          [
            "**Feedforward networks (MLPs):** the basic layered kind above.",
            "**Convolutional networks ([CNNs](/glossary/cnn)):** scan images with small filters; long the standard for vision.",
            "**Recurrent networks (RNNs):** read sequences one step at a time; once common for text and speech.",
            "**Transformers:** use [attention](/glossary/attention) to relate every part of the input to every other part; they power ChatGPT and most modern AI. See [what is a transformer](/blog/what-is-a-transformer).",
            "**Diffusion models:** learn to remove noise step by step to generate images.",
          ],
        ],
      },
      {
        heading: "Are neural networks like the brain?",
        blocks: [
          "Only loosely. They were inspired by neurons in the 1940s and 50s, but real brain cells are far more complex, and brains don't learn by backpropagation as far as we know. A better mental model is a huge, flexible formula with millions or billions of adjustable [parameters](/glossary/parameters-weights), tuned automatically to fit the examples.",
          { tip: "A big risk is memorising the training examples instead of learning the pattern. That's called [overfitting](/glossary/overfitting), and it's why networks are always tested on data they haven't seen." },
        ],
      },
    ],
    faqs: [
      {
        q: "How does a neural network work in simple terms?",
        a: "It passes numbers through layers of simple units. Each unit weighs its inputs, adds them up and passes the result on. The network learns by adjusting those weights, over many examples, to make its answers less wrong.",
      },
      {
        q: "What is the difference between a neural network and deep learning?",
        a: "Deep learning is the use of neural networks with many layers. All deep learning uses neural networks; a very small, shallow network isn't usually called deep learning.",
      },
      {
        q: "What are weights in a neural network?",
        a: "Weights are the adjustable numbers that set how strongly each input affects each neuron. Training a network means finding good values for its weights.",
      },
      {
        q: "Do I need maths to understand neural networks?",
        a: "Not to understand the idea. To build them from scratch, a little algebra, the idea of a derivative and some Python help. See our guide on whether you need maths to learn AI.",
      },
    ],
    lessons: ["beginner/neural-networks-gently", "intermediate/backpropagation", "intermediate/gradient-descent", "intermediate/cnns-and-rnns"],
    sources: [
      { title: "Neural networks", url: "https://www.3blue1brown.com/topics/neural-networks", by: "3Blue1Brown", note: "Free videos" },
      { title: "Neural Networks and Deep Learning", url: "http://neuralnetworksanddeeplearning.com/", by: "Michael Nielsen", note: "Free book" },
      { title: "TensorFlow Playground", url: "https://playground.tensorflow.org/", by: "Google", note: "Try it in your browser" },
      { title: "Neural Networks: Zero to Hero", url: "https://karpathy.ai/zero-to-hero.html", by: "Andrej Karpathy" },
    ],
  },

  {
    slug: "what-is-a-transformer",
    title: "What is a transformer in AI? Attention explained simply",
    seoTitle: "What Is a Transformer in AI? Attention and Self-Attention Explained Simply",
    description:
      "The transformer is the neural network design behind ChatGPT, Claude and Gemini. What attention and self-attention mean, how a transformer processes text, and why it replaced older models.",
    topic: "How AI works",
    published: "2026-11-25",
    answer:
      "A transformer is a type of neural network, introduced in the 2017 paper \"Attention Is All You Need\", that powers almost every modern large language model. Its key idea is attention: for every word, the model looks at all the other words in the text and decides which ones matter most for understanding it. Because it processes all the words at once instead of one by one, it trains fast on huge amounts of data.",
    takeaways: [
      "The \"T\" in GPT stands for transformer.",
      "Attention lets each word gather meaning from the words most relevant to it.",
      "Transformers stack many layers of attention plus small feed-forward networks.",
      "Processing in parallel made it possible to train on internet-scale text.",
    ],
    sections: [
      {
        heading: "The problem transformers solved",
        blocks: [
          "Language is full of references. In \"The trophy didn't fit in the suitcase because **it** was too big\", you know \"it\" is the trophy. Change \"big\" to \"small\" and \"it\" becomes the suitcase. Understanding a word means looking at the right other words, sometimes far away.",
          "Before 2017, the best language models were recurrent neural networks that read text one word at a time, carrying a running summary. They were slow to train, because each step waited for the last, and they tended to forget details from far back.",
        ],
      },
      {
        heading: "Attention, in plain English",
        blocks: [
          "[Attention](/glossary/attention) lets every word look directly at every other word and pull in information from the ones that matter. For each word the model asks, roughly: \"which other words help me understand this one, and how much?\"",
          "Under the hood each word, as an [embedding](/glossary/embedding), produces three vectors:",
          [
            "a **query**: what I'm looking for,",
            "a **key**: what I contain, for others to match against,",
            "a **value**: the information I'll pass on if chosen.",
          ],
          "Each word's query is compared with every key to get attention scores, the scores become weights that add up to 1, and the word takes a weighted mix of the values. So \"it\" can put most of its attention on \"trophy\" and absorb that meaning. When the words attend to others in the same text, it's called **self-attention**.",
          "See it move in the [transformers lesson](/learn/advanced/transformers), which has an attention demo.",
        ],
      },
      {
        heading: "Inside a transformer",
        blocks: [
          {
            ol: [
              "**Tokens in.** Text is split into [tokens](/glossary/token) and each becomes an embedding. Position information is added so the model knows word order. See [what are tokens](/blog/what-are-tokens-in-ai).",
              "**Multi-head attention.** Several attention \"heads\" run side by side, each free to track a different kind of relationship, such as grammar, references or topic.",
              "**Feed-forward layer.** A small neural network processes each position on its own, where much of the model's stored knowledge is thought to live.",
              "**Repeat.** These blocks are stacked dozens of times. Each layer refines the meaning a bit more.",
              "**Predict.** At the end, the model scores every token in its vocabulary for what comes next.",
            ],
          },
          "Models like GPT, Claude, Llama and Gemini use the \"decoder\" style, where each token can only attend to earlier ones, which suits writing text left to right. That's the loop described in [how ChatGPT works](/blog/how-does-chatgpt-work).",
        ],
      },
      {
        heading: "Why transformers took over",
        blocks: [
          [
            "**Parallel training.** All tokens are processed at once, which suits GPUs and made training on trillions of tokens practical.",
            "**Long-range understanding.** Any word can connect directly to any other, however far apart.",
            "**They scale.** Bigger transformers trained on more data kept getting better, which led to today's [LLMs](/glossary/llm).",
            "**Not just text.** The same design works for images (vision transformers), audio, code, proteins and [multimodal](/glossary/multimodal) models.",
          ],
          { tip: "The catch: attention compares every token with every other, so cost grows quickly with length. Tricks like the [KV cache](/glossary/kv-cache) and [mixture of experts](/glossary/mixture-of-experts) help keep big models affordable." },
        ],
      },
    ],
    faqs: [
      {
        q: "What does GPT stand for?",
        a: "Generative Pre-trained Transformer: a model that generates text, is pretrained on a large amount of data, and uses the transformer architecture.",
      },
      {
        q: "What is attention in AI?",
        a: "Attention is a mechanism that lets a model weigh how relevant every other part of the input is when processing each part. It lets each word take in meaning from the words that matter most to it.",
      },
      {
        q: "What is the difference between attention and self-attention?",
        a: "Self-attention is attention where the words of one text attend to each other. Attention can also connect two different sequences, such as a sentence and its translation.",
      },
      {
        q: "Who invented the transformer?",
        a: "A team at Google, in the 2017 paper \"Attention Is All You Need\" by Vaswani and colleagues. It was first designed for translation.",
      },
    ],
    lessons: ["advanced/transformers", "beginner/meet-llms", "advanced/training-llms", "advanced/mixture-of-experts"],
    sources: [
      { title: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762", by: "Vaswani et al., 2017" },
      { title: "The Illustrated Transformer", url: "https://jalammar.github.io/illustrated-transformer/", by: "Jay Alammar" },
      { title: "Neural networks (includes transformers)", url: "https://www.3blue1brown.com/topics/neural-networks", by: "3Blue1Brown", note: "Free videos" },
      { title: "Let's build GPT: from scratch, in code, spelled out", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", by: "Andrej Karpathy", note: "Free video" },
    ],
  },

  {
    slug: "how-to-run-an-llm-locally",
    title: "How to run an LLM locally on your own computer",
    seoTitle: "How to Run an LLM Locally: Free, Private AI on Your Laptop (Beginner Guide)",
    description:
      "You can run open-weight AI models like Llama, Mistral, Qwen or Gemma on your own laptop, for free and offline. What hardware you need, which tools to use (Ollama, LM Studio, llama.cpp) and how quantisation makes it fit.",
    topic: "Using AI well",
    published: "2026-11-25",
    answer:
      "To run an LLM locally, install a free app such as Ollama or LM Studio, download an open-weight model such as Llama, Qwen, Mistral or Gemma, and chat with it on your own machine, with no internet or account needed. Small models of about 1 to 8 billion parameters run on most modern laptops with 8 to 16 GB of memory, thanks to quantisation, which shrinks the model to around 4 bits per weight.",
    takeaways: [
      "Local AI is free to use, private and works offline.",
      "Tools: Ollama (simple, command line), LM Studio (point and click), llama.cpp (the engine many use).",
      "Rough memory need: billions of parameters × bits per weight ÷ 8, in GB, plus some headroom.",
      "Local models are smaller than the biggest cloud models, so expect less polish on hard tasks.",
    ],
    sections: [
      {
        heading: "Why run AI locally?",
        blocks: [
          [
            "**Privacy.** Your prompts and documents never leave your computer.",
            "**Free.** No subscription or per-token fees once you have the hardware.",
            "**Offline.** Works on a plane or with no signal.",
            "**Control.** Pick the model, change settings like [temperature](/glossary/temperature), and build your own tools on top.",
            "**Learning.** Seeing a model run on your own machine makes the ideas click.",
          ],
          "This is possible because of [open-weight models](/glossary/open-weight-model): companies and labs publish the trained weights for anyone to download. The [open models lesson](/learn/intermediate/open-models) covers who releases them and their licences.",
        ],
      },
      {
        heading: "What hardware do you need?",
        blocks: [
          "The main limit is memory. The model's weights have to fit in your RAM, or your graphics card's VRAM if you have one. A quick estimate:",
          { tip: "Memory in GB ≈ parameters in billions × bits per weight ÷ 8, plus about 20% for the conversation. So an 8-billion-parameter model at 4 bits needs about 8 × 4 ÷ 8 = 4 GB, roughly 5 GB with headroom." },
          [
            "**8 GB RAM:** small models of about 1 to 4 billion parameters. Fine for simple chat, summaries and rewriting.",
            "**16 GB RAM:** 7 to 8 billion parameter models comfortably. A good everyday sweet spot.",
            "**32 GB or more, or a GPU with 16 to 24 GB:** around 14 to 32 billion parameters, noticeably smarter.",
            "**64 GB and up:** larger models, still slower than the cloud.",
          ],
          "Apple Silicon Macs work especially well, because the GPU shares the main memory. On Windows and Linux, an NVIDIA graphics card speeds things up a lot, but CPU-only works for small models.",
        ],
      },
      {
        heading: "How quantisation makes models fit",
        blocks: [
          "Models are trained with 16-bit numbers for each weight. [Quantisation](/glossary/quantisation) rounds them to fewer bits, typically 4 to 8, cutting size by up to four times with only a small loss in quality. Local model files are usually in the **GGUF** format, with names like `Q4_K_M` (about 4-bit) or `Q8_0` (8-bit).",
          "Lower bits means smaller and faster but a little less accurate. 4-bit is the usual starting point. More in the [efficient fine-tuning lesson](/learn/advanced/efficient-finetuning) and [inference and serving](/learn/advanced/inference-and-serving).",
        ],
      },
      {
        heading: "Step by step: your first local model",
        blocks: [
          "**Option A: LM Studio (no command line).**",
          {
            ol: [
              "Download LM Studio from lmstudio.ai and install it.",
              "Search for a small instruct model, such as a recent Llama, Qwen, Gemma or Mistral model of around 4 to 8 billion parameters. It suggests versions that fit your machine.",
              "Download it, load it and start chatting.",
            ],
          },
          "**Option B: Ollama (simple command line).**",
          {
            ol: [
              "Install Ollama from ollama.com.",
              "Open a terminal and run `ollama run` followed by a model name from its library, for example `ollama run llama3.2`. The first run downloads the model.",
              "Type your questions. Ollama also serves a local API on your machine, so other apps can use the model.",
            ],
          },
          "Both run on **llama.cpp**, an open-source engine you can also use directly. For bigger setups, servers like vLLM are built for speed.",
        ],
      },
      {
        heading: "What to expect",
        blocks: [
          "A good 8-billion-parameter model today is roughly as capable as the best cloud models were a few years ago: great for drafting, summarising, explaining and simple code, weaker at hard reasoning and niche facts. Small models [hallucinate](/glossary/hallucination) more, so check facts.",
          "You can make a local model much more useful by connecting it to your own files with [RAG](/blog/what-is-rag), or by trying a [reasoning model](/learn/advanced/reasoning-models) that thinks before answering. Many small models are themselves made by [knowledge distillation](/glossary/knowledge-distillation) from bigger ones.",
          { tip: "Check each model's licence before using it in a product. \"Open weights\" doesn't always mean you can use it for anything." },
        ],
      },
    ],
    faqs: [
      {
        q: "Can I run an LLM on my laptop?",
        a: "Yes. With 8 to 16 GB of memory, most modern laptops can run small open-weight models of about 1 to 8 billion parameters using free tools like Ollama or LM Studio.",
      },
      {
        q: "What is the easiest way to run AI locally?",
        a: "LM Studio is the easiest if you prefer a regular app; Ollama is the simplest if you're comfortable typing one command in a terminal. Both are free.",
      },
      {
        q: "How much RAM do I need to run a 7B model?",
        a: "At 4-bit quantisation, a 7 to 8 billion parameter model needs about 4 to 5 GB for its weights, so 8 GB of RAM works and 16 GB is comfortable.",
      },
      {
        q: "Is running an LLM locally private?",
        a: "Yes. The model runs entirely on your computer, so your prompts and files aren't sent to a server, as long as the app itself isn't set to send data online.",
      },
    ],
    lessons: ["intermediate/open-models", "advanced/inference-and-serving", "advanced/efficient-finetuning", "advanced/distillation-and-small-models"],
    sources: [
      { title: "Ollama", url: "https://ollama.com/", by: "Ollama", note: "Free, open source" },
      { title: "LM Studio", url: "https://lmstudio.ai/", by: "LM Studio", note: "Free app" },
      { title: "llama.cpp", url: "https://github.com/ggml-org/llama.cpp", by: "ggml-org", note: "Open source" },
      { title: "Models on the Hugging Face Hub", url: "https://huggingface.co/models", by: "Hugging Face" },
    ],
  },

  {
    slug: "how-to-become-an-ai-engineer",
    title: "How to become an AI engineer: a free roadmap",
    seoTitle: "How to Become an AI Engineer in 2026: Skills, Free Roadmap and Projects",
    description:
      "A step-by-step roadmap to becoming an AI engineer with free resources: Python, machine learning basics, LLMs, RAG, agents, evaluation and projects. What AI engineers do and how it differs from ML engineering.",
    topic: "Learning AI",
    published: "2026-11-25",
    answer:
      "To become an AI engineer, learn Python and basic software engineering, understand how machine learning and large language models work, then build real applications with LLM APIs: prompting, RAG, tool use and agents, plus evaluation and deployment. A focused learner can get job-ready skills in about 6 to 12 months using free courses, and a portfolio of working projects matters more than certificates.",
    takeaways: [
      "AI engineers build products on top of AI models; ML engineers mostly train and serve models.",
      "Core stack: Python, APIs, LLM basics, RAG, agents, evals, deployment.",
      "Everything you need to learn is available free.",
      "Three solid, shipped projects beat a stack of certificates.",
    ],
    sections: [
      {
        heading: "What does an AI engineer do?",
        blocks: [
          "An AI engineer builds software that uses AI models: a support chatbot over a company's docs, a coding assistant, a tool that reads invoices, an agent that books meetings. Day to day that means choosing models, writing prompts, building retrieval and tool integrations, measuring quality and shipping it reliably.",
          "It overlaps with, but isn't the same as:",
          [
            "**Machine learning engineer:** trains, tunes and deploys models, with more maths, data pipelines and [training](/glossary/training-data) work.",
            "**Data scientist:** analyses data and builds models to answer business questions.",
            "**Research scientist:** invents new methods, usually with a PhD.",
          ],
          "If you prefer the model-building side, follow our [ML engineer track](/tracks/ml-engineer). For the product side, the [builder track](/tracks/builder).",
        ],
      },
      {
        heading: "The roadmap, step by step",
        blocks: [
          {
            ol: [
              "**Python and the basics of software (1 to 2 months).** Variables, functions, files, packages, Git and calling a web API. Kaggle's free Python course is a quick start.",
              "**How AI works (1 month).** [Machine learning](/glossary/machine-learning), [neural networks](/blog/how-do-neural-networks-work), [overfitting](/glossary/overfitting), and how [LLMs](/glossary/llm) are trained. Our [beginner and intermediate levels](/level/intermediate) cover this in short nightly lessons.",
              "**Build with LLM APIs (1 to 2 months).** Call a model from code, write system prompts, get structured output, handle [tokens](/blog/what-are-tokens-in-ai) and costs. Try [open models locally](/blog/how-to-run-an-llm-locally) too.",
              "**RAG (1 month).** Embeddings, chunking, vector search and citations. Start with [what is RAG](/blog/what-is-rag).",
              "**Tools and agents (1 month).** Function calling, the Model Context Protocol and multi-step [agents](/blog/what-is-an-ai-agent), with guardrails against [prompt injection](/glossary/prompt-injection).",
              "**Evaluation (ongoing).** Build test sets, score outputs automatically and with people, and track quality over time. This is the skill that separates demos from products. See [eval](/glossary/eval).",
              "**Fine-tuning and deployment (1 to 2 months).** When to fine-tune with [LoRA](/glossary/lora), how to serve models, monitor them and control cost and latency.",
            ],
          },
          { tip: "You don't need to finish one step before starting the next. Build something small at step 3 and keep improving it as you learn." },
        ],
      },
      {
        heading: "Do you need a degree or advanced maths?",
        blocks: [
          "Many AI engineers don't have a computer science degree. Employers mostly want proof you can build and ship. Maths matters less here than in research: knowing what a vector, a probability and a gradient are is enough to start. Our guide [do you need math to learn AI](/blog/do-you-need-math-to-learn-ai) goes into detail.",
        ],
      },
      {
        heading: "Portfolio projects that get noticed",
        blocks: [
          [
            "A **RAG chatbot** over a real document set, with citations and an evaluation showing how often it's right.",
            "An **agent** that completes a useful multi-step task with tools, with logs and limits.",
            "A **fine-tuned small model** that matches a bigger one on a narrow task, with before and after numbers.",
            "A **contribution** to an open-source AI project, even docs or tests.",
          ],
          "Write a short post for each: the problem, what you tried, what failed and the numbers. That writing is often what gets you hired.",
        ],
      },
      {
        heading: "The best free resources",
        blocks: [
          "Start with the [AI in Bed builder track](/tracks/builder) or the [30-day plan](/learn-ai-in-30-days), then go deeper with the free courses below. For a broader list, see [how to learn AI for free](/blog/how-to-learn-ai-for-free) and our guide to [free LLM courses](/resources/free-llm-courses).",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does it take to become an AI engineer?",
        a: "With some programming background, about 6 to 12 months of steady study and building. From zero, plan on 12 to 18 months, starting with Python and software basics.",
      },
      {
        q: "What skills does an AI engineer need?",
        a: "Python, working with APIs, Git, how LLMs work, prompt design, RAG and vector search, tool use and agents, evaluation, and deploying and monitoring software.",
      },
      {
        q: "What is the difference between an AI engineer and an ML engineer?",
        a: "AI engineers mostly build applications on top of existing models, like chatbots, RAG systems and agents. ML engineers focus more on training, tuning and serving the models themselves, with more maths and data work.",
      },
      {
        q: "Can I become an AI engineer without a degree?",
        a: "Yes. Many employers care most about what you can build. A portfolio of working, well-documented AI projects and open-source contributions can stand in for a degree.",
      },
    ],
    lessons: ["beginner/meet-llms", "advanced/rag-and-agents", "advanced/agents-in-depth", "intermediate/testing-language-models", "advanced/inference-and-serving"],
    sources: [
      { title: "Learn Python", url: "https://www.kaggle.com/learn/python", by: "Kaggle", note: "Free course" },
      { title: "Practical Deep Learning for Coders", url: "https://course.fast.ai/", by: "fast.ai", note: "Free course" },
      { title: "Hugging Face LLM Course", url: "https://huggingface.co/learn/llm-course", by: "Hugging Face", note: "Free course" },
      { title: "Hugging Face AI Agents Course", url: "https://huggingface.co/learn/agents-course", by: "Hugging Face", note: "Free course" },
      { title: "Neural Networks: Zero to Hero", url: "https://karpathy.ai/zero-to-hero.html", by: "Andrej Karpathy" },
    ],
  },
];
