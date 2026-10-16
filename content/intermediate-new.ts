import type { Lesson } from "./types";

/** Round-three intermediate lessons: trees, clustering, tokens, recommendations. */
export const intermediateNew: Lesson[] = [
  {
    slug: "decision-trees",
    title: "Decision trees and random forests",
    emoji: "🌳",
    minutes: 7,
    summary: "A game of twenty questions that learns from data, and why a whole forest of them still beats neural networks on spreadsheets.",
    blocks: [
      {
        kind: "p",
        text: "Not all machine learning is neural networks. A **decision tree** makes predictions by asking a chain of yes or no questions about the data: \"Is the customer under 30?\" Then \"Have they bought before?\" Each answer sends you down a branch, until you reach a **leaf** that gives the prediction.",
      },
      {
        kind: "card",
        title: "How a tree picks its questions",
        body: [
          "Training a tree means choosing good questions. At each step, the algorithm tries many possible splits and keeps the one that best separates the answers.",
          "A good split leaves each side as \"pure\" as possible: mostly yeses on one side, mostly noes on the other. Then it repeats the process on each side.",
        ],
      },
      {
        kind: "card",
        title: "Gini impurity, gently",
        body: [
          "**Gini impurity** measures how mixed a group is. Pick two items at random from the group: Gini is the chance they have different labels.",
          "A group of all yeses has a Gini of 0, perfectly pure. A 50/50 mix of two labels has a Gini of 0.5, as messy as it gets. The tree picks the split that lowers impurity the most.",
        ],
      },
      {
        kind: "code",
        title: "Finding the best first question",
        code: "# Should we play tennis? (outlook, windy) -> yes/no\ndata = [(\"sunny\", False, \"yes\"), (\"sunny\", True, \"no\"), (\"cloudy\", False, \"yes\"),\n        (\"cloudy\", True, \"yes\"), (\"rainy\", False, \"yes\"), (\"rainy\", True, \"no\"),\n        (\"sunny\", False, \"yes\"), (\"rainy\", True, \"no\")]\n\ndef gini(rows):\n    if not rows:\n        return 0.0\n    p = sum(r[2] == \"yes\" for r in rows) / len(rows)\n    return 1 - p**2 - (1 - p)**2\n\nprint(f\"Gini before any split: {gini(data):.3f}\")\nquestions = {\"outlook is sunny?\": lambda r: r[0] == \"sunny\",\n             \"outlook is cloudy?\": lambda r: r[0] == \"cloudy\",\n             \"is it windy?\": lambda r: r[1]}\nfor name, ask in questions.items():\n    left = [r for r in data if ask(r)]\n    right = [r for r in data if not ask(r)]\n    score = (len(left) * gini(left) + len(right) * gini(right)) / len(data)\n    print(f\"{name:20} -> weighted Gini {score:.3f}\")",
        note: "The windy question splits the days most cleanly, so a tree would ask it first. Try changing a label and see which question wins.",
      },
      {
        kind: "quiz",
        question: "A group at a leaf contains 10 \"yes\" examples and 0 \"no\" examples. What is its Gini impurity?",
        options: ["0", "0.5", "1", "10"],
        answer: 0,
        explain: "Every item has the same label, so two random picks can never disagree. The group is perfectly pure: Gini is 0.",
      },
      {
        kind: "card",
        title: "Deep trees overfit",
        body: [
          "Let a tree keep asking questions and it can carve out a leaf for every single training example. It scores perfectly on data it has seen, then stumbles on new data.",
          "The usual fixes are limiting the **depth** (how many questions in a row) or requiring a minimum number of examples per leaf.",
        ],
      },
      {
        kind: "card",
        title: "Many trees beat one",
        body: [
          "A **random forest** trains hundreds of trees, each on a random resample of the data and each looking at a random subset of features at every split. Training on resamples like this is called **bagging**. To predict, the trees vote.",
          "Each tree is a bit wrong in its own way. Averaged together, the mistakes cancel out. Combining models like this is called an **ensemble**.",
          "**Gradient-boosted trees** take another route: they add small trees one after another, each trained to fix the errors of the trees so far. Libraries like XGBoost and LightGBM do this.",
        ],
      },
      {
        kind: "tip",
        text: "A random forest is like asking a crowd to guess the number of sweets in a jar. Individuals are off, but the average guess is often remarkably close.",
      },
      {
        kind: "list",
        items: [
          "**Tabular data** means rows and columns, like a spreadsheet of customers or loans.",
          "On this kind of data, forests and boosted trees often match or beat neural networks, and train in minutes on a laptop.",
          "They cope with mixed columns (numbers and categories) and need little tuning.",
          "You can also see which features mattered most, which helps explain the model.",
        ],
      },
      {
        kind: "quiz",
        question: "Why does a random forest usually generalise better than a single deep tree?",
        options: [
          "It uses a neural network inside each tree",
          "Its trees see different samples and features, so their errors average out when they vote",
          "It always uses fewer features",
          "It memorises the training data more completely",
        ],
        answer: 1,
        explain: "Each tree overfits in a slightly different way. Voting across many varied trees smooths out those individual quirks.",
      },
    ],
    takeaways: [
      "A decision tree predicts by asking a chain of questions, choosing splits that make groups purer.",
      "Single deep trees overfit; random forests and boosted trees combine many trees to fix this.",
      "On spreadsheet-style data, tree ensembles are still often the best tool.",
    ],
    sources: [
      { title: "Decision Trees", url: "https://scikit-learn.org/stable/modules/tree.html", by: "scikit-learn" },
      { title: "Ensembles: gradient boosting, random forests, bagging", url: "https://scikit-learn.org/stable/modules/ensemble.html", by: "scikit-learn" },
      { title: "Decision Forests course", url: "https://developers.google.com/machine-learning/decision-forests", by: "Google", note: "Free" },
      { title: "Why do tree-based models still outperform deep learning on tabular data?", url: "https://arxiv.org/abs/2207.08815", by: "Grinsztajn, Oyallon and Varoquaux (2022)" },
    ],
  },
  {
    slug: "clustering",
    title: "Finding groups: clustering",
    emoji: "🧺",
    minutes: 6,
    summary: "How a computer can sort things into groups when nobody has told it what the groups are, with k-means step by step.",
    blocks: [
      {
        kind: "p",
        text: "Most models learn from labelled examples: this email is spam, that one isn't. **Unsupervised learning** has no labels at all. The model looks for structure on its own. The most common job is **clustering**: putting similar things into groups.",
      },
      {
        kind: "card",
        title: "k-means in four steps",
        body: [
          "1. Choose how many groups you want. That number is **k**.",
          "2. Drop k starting points, called **centroids**, somewhere among the data.",
          "3. Assign every data point to its nearest centroid.",
          "4. Move each centroid to the average position of its points. Repeat steps 3 and 4 until nothing changes.",
        ],
      },
      {
        kind: "tip",
        text: "Picture three friends standing in a busy room. Everyone walks to whichever friend is closest. Each friend then steps into the middle of their little crowd. A few rounds later, the room has settled into three tidy groups.",
      },
      {
        kind: "code",
        title: "k-means on a line of numbers",
        code: "import random\nrandom.seed(1)\n# Minutes customers spend in an app each day (1D, easy to see)\npoints = [2, 3, 4, 5, 20, 22, 25, 24, 50, 55, 52, 58]\nk = 3\ncentres = random.sample(points, k)\nfor step in range(5):\n    groups = {i: [] for i in range(k)}\n    for x in points:  # assign each point to its nearest centre\n        nearest = min(range(k), key=lambda i: abs(x - centres[i]))\n        groups[nearest].append(x)\n    # move each centre to the mean of its group\n    centres = [sum(g) / len(g) if g else centres[i] for i, g in groups.items()]\n    print(f\"step {step + 1}: centres = {[round(c, 1) for c in centres]}\")\nfor i in range(k):\n    print(f\"cluster {i}: {groups[i]}\")",
        note: "The centres settle after a couple of steps. Try k = 2 or a different seed: the groups can change, because k-means depends on where it starts.",
      },
      {
        kind: "quiz",
        question: "In k-means, what happens to each centroid after the points have been assigned?",
        options: [
          "It is deleted and a new one is chosen at random",
          "It moves to the average position of the points assigned to it",
          "It moves to the point furthest away",
          "It stays exactly where it started",
        ],
        answer: 1,
        explain: "Each centroid moves to the mean of its group. That is where the \"means\" in k-means comes from.",
      },
      {
        kind: "card",
        title: "Choosing k: the elbow idea",
        body: [
          "Run k-means for k = 1, 2, 3 and so on. For each, measure how far points sit from their centroid on average.",
          "More clusters always shrinks that distance, but at some point the gains flatten out. Plot it and look for the bend, the **elbow**. That is often a sensible k. It is a rule of thumb, not a law, and sometimes there is no clear bend.",
        ],
      },
      {
        kind: "list",
        items: [
          "**Customer segments**: grouping shoppers by what and how often they buy.",
          "**Grouping documents**: turn each article into an embedding, then cluster to find topics.",
          "**Spotting oddities**: a point far from every centroid may be worth a closer look.",
          "**Compressing images**: replace thousands of colours with the k most typical ones.",
        ],
      },
      {
        kind: "card",
        title: "Where k-means struggles",
        body: [
          "It assumes groups are roughly round blobs of similar size. Long, curved or nested shapes confuse it.",
          "Results depend on the starting centroids, so libraries run it several times and keep the best. A smarter start called k-means++ helps.",
          "Features on big scales dominate distance. Income in pounds will drown out age in years unless you rescale them first.",
          "Clusters have no names. A human still has to look and decide what each group means.",
        ],
      },
      {
        kind: "quiz",
        question: "You cluster customers by income (in pounds) and age (in years) without rescaling. What is the likely problem?",
        options: [
          "k-means cannot handle two features",
          "Income's much larger numbers will dominate the distances, so age barely matters",
          "Age will dominate because it changes every year",
          "The algorithm will refuse to run",
        ],
        answer: 1,
        explain: "Distances are dominated by whichever feature has the biggest spread. Rescaling features to similar ranges lets each one count.",
      },
    ],
    takeaways: [
      "Clustering finds groups in data with no labels, a kind of unsupervised learning.",
      "k-means repeats two steps: assign points to the nearest centroid, then move centroids to the mean.",
      "You must choose k, scale your features, and interpret the groups yourself.",
    ],
    sources: [
      { title: "Clustering", url: "https://scikit-learn.org/stable/modules/clustering.html", by: "scikit-learn" },
      { title: "Clustering course", url: "https://developers.google.com/machine-learning/clustering", by: "Google", note: "Free" },
    ],
  },
  {
    slug: "tokenisation",
    title: "How text becomes tokens",
    emoji: "✂️",
    minutes: 7,
    summary: "Language models don't read letters or words: they read tokens. How text gets chopped up, and why it explains some odd model mistakes.",
    blocks: [
      {
        kind: "p",
        text: "A language model only works with numbers. Before it sees your message, a **tokeniser** chops the text into pieces called tokens and swaps each one for an ID number from a fixed list, the **vocabulary**. How you chop matters more than you might think.",
      },
      {
        kind: "card",
        title: "Three ways to chop",
        body: [
          "**Characters**: a tiny vocabulary, but sequences get very long, and single letters carry little meaning.",
          "**Whole words**: short sequences, but the vocabulary explodes, and any new word, typo or name is unknown.",
          "**Subwords**: the middle path used by modern models. Common words stay whole; rare words split into familiar pieces, like \"un\" + \"believ\" + \"able\".",
        ],
      },
      {
        kind: "card",
        title: "Byte-pair encoding",
        body: [
          "**Byte-pair encoding** (BPE) builds a subword vocabulary from data. Start with single characters. Find the pair that appears side by side most often and glue it into a new token. Repeat thousands of times.",
          "Frequent chunks like \"ing\", \"the\" and \"tion\" become single tokens. Many modern tokenisers start from raw bytes instead of characters, so any text, even emoji, can be encoded.",
        ],
      },
      {
        kind: "code",
        title: "A mini BPE merge loop",
        code: "from collections import Counter\n# Each word starts as a list of single characters\nwords = [\"low\", \"low\", \"lower\", \"lowest\", \"newest\", \"newest\", \"widest\"]\ncorpus = [list(w) for w in words]\n\nfor merge in range(5):\n    pairs = Counter()\n    for w in corpus:\n        for a, b in zip(w, w[1:]):\n            pairs[(a, b)] += 1\n    (a, b), count = pairs.most_common(1)[0]\n    print(f\"merge {merge + 1}: '{a}' + '{b}' -> '{a + b}'  (seen {count} times)\")\n    new_corpus = []\n    for w in corpus:  # glue every occurrence of the pair together\n        out, i = [], 0\n        while i < len(w):\n            if i < len(w) - 1 and (w[i], w[i + 1]) == (a, b):\n                out.append(a + b); i += 2\n            else:\n                out.append(w[i]); i += 1\n        new_corpus.append(out)\n    corpus = new_corpus\nprint(\"tokens now:\", sorted({\" \".join(w) for w in corpus}))",
        note: "Watch \"low\" and \"est\" become tokens because they appear often. Add more words and see which merges win.",
      },
      {
        kind: "quiz",
        question: "In byte-pair encoding, which pair gets merged next?",
        options: [
          "The pair that appears side by side most often",
          "The rarest pair, to save space",
          "A random pair",
          "Whichever pair comes first in the alphabet",
        ],
        answer: 0,
        explain: "BPE always glues the most frequent neighbouring pair into a new token, so common chunks of text become single tokens.",
      },
      {
        kind: "card",
        title: "Why models fumble letter counting",
        body: [
          "Ask a model how many r's are in \"strawberry\" and it may get it wrong. It never saw the letters: it saw perhaps two or three tokens, each just an ID number.",
          "Spelling, reversing words and counting characters are hard for the same reason. Models that reason step by step, or write the word out letter by letter first, do much better.",
        ],
      },
      {
        kind: "tip",
        text: "It is a bit like being handed a word as a few Scrabble tiles with whole syllables printed on them, then being asked how many times one letter appears. You'd have to stop and spell it out.",
      },
      {
        kind: "list",
        items: [
          "In English, one token is roughly four characters, or about three quarters of a word.",
          "AI services charge per token, and the context window is measured in tokens.",
          "Tokenisers trained mostly on English split other languages into more pieces. The same sentence in Hindi, Burmese or Amharic can take several times as many tokens.",
          "That means non-English users can pay more, wait longer and fit less into the context window.",
        ],
      },
      {
        kind: "quiz",
        question: "Why might the same message cost more to process in Thai than in English?",
        options: [
          "Thai text is always longer to read",
          "The tokeniser, trained mostly on English, splits Thai into more tokens",
          "Providers charge extra for non-English languages by policy",
          "Models translate everything into English first",
        ],
        answer: 1,
        explain: "Costs follow token counts. A tokeniser that learned mostly from English has fewer ready-made chunks for other scripts, so it needs more tokens for the same meaning.",
      },
    ],
    takeaways: [
      "Models read tokens, usually subword pieces, not letters or whole words.",
      "Byte-pair encoding builds the vocabulary by repeatedly merging the most common pair.",
      "Tokens explain letter-counting slips, pricing, and why some languages cost more.",
    ],
    sources: [
      { title: "Neural Machine Translation of Rare Words with Subword Units", url: "https://arxiv.org/abs/1508.07909", by: "Sennrich, Haddow and Birch (2016)", note: "The paper that brought BPE to language models" },
      { title: "Byte-Pair Encoding tokenization", url: "https://huggingface.co/learn/nlp-course/chapter6/5", by: "Hugging Face course", note: "Free" },
      { title: "Language Model Tokenizers Introduce Unfairness Between Languages", url: "https://arxiv.org/abs/2305.15425", by: "Petrov et al. (2023)" },
    ],
  },
  {
    slug: "recommender-systems",
    title: "How recommendations work",
    emoji: "🍿",
    minutes: 7,
    summary: "\"Because you watched...\": how apps guess what you'll like next, from similar users to embeddings, and the loops that can narrow what you see.",
    blocks: [
      {
        kind: "p",
        text: "Every time a streaming app suggests a film or a shop shows \"you might also like\", a **recommender system** is at work. Its job is to guess how much you'd like things you haven't seen yet. There are two classic approaches, and most real systems blend them.",
      },
      {
        kind: "card",
        title: "Collaborative filtering",
        body: [
          "**Collaborative filtering** uses only behaviour: who watched, rated or bought what. If you and another person loved the same five films, you'll probably like their sixth favourite too.",
          "It needs no knowledge of what the items actually are. The crowd's patterns do the work.",
        ],
      },
      {
        kind: "card",
        title: "Content-based filtering",
        body: [
          "**Content-based** recommenders look at the items themselves: genre, actors, ingredients, the words in an article. If you read lots of gardening pieces, it suggests more gardening.",
          "It works even for brand-new items, but tends to serve more of the same.",
        ],
      },
      {
        kind: "code",
        title: "Find your taste twin",
        code: "from math import sqrt\n# Star ratings (0 = not watched yet)\nfilms = [\"Space Saga\", \"Robot Love\", \"Baking Show\", \"Garden Diaries\", \"Alien Dawn\"]\nratings = {\n    \"Ana\":  [5, 4, 0, 1, 0],\n    \"Ben\":  [4, 5, 1, 0, 5],\n    \"Cleo\": [1, 0, 5, 4, 1],\n    \"Dev\":  [0, 1, 4, 5, 2],\n}\n\ndef cosine(u, v):\n    dot = sum(a * b for a, b in zip(u, v))\n    return dot / (sqrt(sum(a * a for a in u)) * sqrt(sum(b * b for b in v)))\n\nme = \"Ana\"\nsims = {other: cosine(ratings[me], r) for other, r in ratings.items() if other != me}\nfor other, s in sorted(sims.items(), key=lambda x: -x[1]):\n    print(f\"{me} vs {other}: similarity {s:.2f}\")\ntwin = max(sims, key=sims.get)\nfor i, film in enumerate(films):\n    if ratings[me][i] == 0 and ratings[twin][i] >= 4:\n        print(f\"Because {twin} liked it, try: {film}\")",
        note: "Cosine similarity compares the pattern of ratings, not the totals. Change Ana's ratings and see who her new twin becomes.",
      },
      {
        kind: "quiz",
        question: "A collaborative filtering system recommends you a film. What is it mainly based on?",
        options: [
          "The film's genre and cast",
          "What people with similar viewing habits enjoyed",
          "The film's age rating",
          "Which film is newest",
        ],
        answer: 1,
        explain: "Collaborative filtering relies on patterns of behaviour across users, not on details about the film itself.",
      },
      {
        kind: "card",
        title: "Users and items as embeddings",
        body: [
          "Modern systems learn an **embedding**, a list of numbers, for every user and every item. The numbers are tuned so that a user's vector sits close to items they like.",
          "Nobody labels the dimensions, but they often end up capturing things like \"cosy\", \"action-heavy\" or \"for kids\". Recommending becomes finding the nearest items to you.",
        ],
      },
      {
        kind: "card",
        title: "The cold start problem",
        body: [
          "A new user has no history; a new item has no ratings. Collaborative filtering has nothing to go on. This is the **cold start** problem.",
          "Common fixes: ask a few questions at sign-up, fall back on popular items, or use content features until behaviour builds up.",
        ],
      },
      {
        kind: "tip",
        text: "A good bookseller does both kinds of recommending. \"People who loved that also adored this\" is collaborative. \"You like slow, quiet novels set by the sea\" is content-based.",
      },
      {
        kind: "list",
        items: [
          "**Feedback loops**: the system shows you things, you click some, and it learns from those clicks. Items it never showed can never earn clicks.",
          "Over time this can narrow what you see, sometimes called a **filter bubble**.",
          "Popular items get shown more, so they get more popular, while niche items struggle to be found.",
          "Many systems deliberately mix in some variety and new items to keep exploring.",
        ],
      },
      {
        kind: "quiz",
        question: "Why can a recommender's own suggestions narrow what users end up seeing?",
        options: [
          "Because it deletes items users haven't rated",
          "Because it learns from clicks on what it chose to show, reinforcing its earlier choices",
          "Because embeddings can only store a few items",
          "Because users are forbidden from searching",
        ],
        answer: 1,
        explain: "The system mostly sees reactions to things it already picked. That feedback loop can reinforce past choices unless it deliberately explores.",
      },
    ],
    takeaways: [
      "Collaborative filtering uses similar people's behaviour; content-based uses the items' features.",
      "Modern recommenders place users and items as embeddings in the same space.",
      "Cold starts and feedback loops are the big challenges, and variety helps with both.",
    ],
    sources: [
      { title: "Recommendation Systems course", url: "https://developers.google.com/machine-learning/recommendation", by: "Google", note: "Free" },
      { title: "Degenerate Feedback Loops in Recommender Systems", url: "https://arxiv.org/abs/1902.10730", by: "Jiang et al. (2019)" },
    ],
  },
];
