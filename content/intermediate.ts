import { intermediateMore } from "./intermediate-more";
import { intermediateNew } from "./intermediate-new";
import type { Level } from "./types";

export const intermediate: Level = {
  id: "intermediate",
  name: "Intermediate",
  emoji: "🌗",
  tagline: "A little maths, a lot of intuition.",
  description:
    "Look under the bonnet. You'll see how models actually find good parameters, how to tell if a model is any good, and the classic architectures for images, sequences and meaning.",
  lessons: [
    {
      slug: "regression",
      title: "Lines and curves: regression",
      emoji: "📉",
      minutes: 6,
      summary:
        "The humble straight line is the ancestor of every neural network. Linear and logistic regression, explained.",
      blocks: [
        {
          kind: "p",
          text: "Before neural networks, there was the line. Understanding the two classic models, **linear regression** and **logistic regression**, gives you 80% of the intuition for everything that follows.",
        },
        {
          kind: "figure",
          graphic: "regression",
          caption:
            "Left: linear regression fits a line through points to predict a number. Right: logistic regression squashes a line into an S-curve to predict a probability.",
        },
        {
          kind: "code",
          title: "Fit a line with least squares",
          code: "# Hours studied -> exam score. Find the best line y = w*x + b.\nxs = [1, 2, 3, 4, 5, 6]\nys = [52, 55, 61, 64, 70, 73]\n\nn = len(xs)\nmean_x = sum(xs) / n\nmean_y = sum(ys) / n\nw = sum((x - mean_x) * (y - mean_y) for x, y in zip(xs, ys)) / sum((x - mean_x) ** 2 for x in xs)\nb = mean_y - w * mean_x\n\nmse = sum((w * x + b - y) ** 2 for x, y in zip(xs, ys)) / n\nprint(f\"score = {w:.2f} * hours + {b:.2f}\")\nprint(f\"mean squared error: {mse:.2f}\")\nprint(f\"prediction for 8 hours: {w * 8 + b:.1f}\")",
          note: "Change the data and run again. Try adding an outlier like (7, 20) and see how much one bad point moves the line.",
        },
        {
          kind: "card",
          title: "📏 Linear regression",
          body: [
            "Predict a number from inputs with `y = w·x + b`. With many inputs: `y = w₁x₁ + w₂x₂ + … + b`.",
            "Example: house price = 3,000 × size + 20,000 × bedrooms + 50,000.",
            "\"Training\" means finding the `w`s and `b` that make the line fit the data best.",
          ],
        },
        {
          kind: "card",
          title: "📐 Measuring fit: Mean Squared Error",
          body: [
            "For each point, take the gap between prediction and truth, square it (so negatives don't cancel and big misses hurt more), then average.",
            "`MSE = average of (prediction − truth)²`. Smaller is better.",
          ],
        },
        {
          kind: "quiz",
          question:
            "Why does MSE square the errors instead of just averaging them?",
          options: [
            "Squaring makes the maths impossible",
            "So positive and negative errors don't cancel out, and big errors are punished more",
            "To make the number smaller",
            "Squaring is required by law",
          ],
          answer: 1,
          explain:
            "An error of +5 and −5 would average to 0 without squaring. Squaring also makes one huge miss count more than several tiny ones.",
        },
        {
          kind: "card",
          title: "🔀 Logistic regression (it's for classification!)",
          body: [
            "Despite the name, it predicts **yes/no**. Take the linear score and pass it through the **sigmoid** function `σ(z) = 1 / (1 + e⁻ᶻ)`.",
            "Sigmoid squashes any number into 0–1, which we read as a probability: 0.92 → \"92% likely spam\".",
          ],
        },
        {
          kind: "card",
          title: "🔗 The link to neural networks",
          body: [
            "A single neuron with a sigmoid activation *is* logistic regression.",
            "A neural network is many of these stacked and connected. So you already understand the building block.",
          ],
        },
        {
          kind: "quiz",
          question: "Logistic regression outputs…",
          options: [
            "Any real number like house prices",
            "A probability between 0 and 1",
            "A list of words",
            "A straight line only",
          ],
          answer: 1,
          explain:
            "The sigmoid squashes the output into (0, 1), so it's used for classification probabilities.",
        },
      ],
      takeaways: [
        "Linear regression predicts numbers: y = w·x + b.",
        "MSE measures fit by averaging squared errors.",
        "Logistic regression = linear score + sigmoid → probability.",
        "One sigmoid neuron is logistic regression.",
      ],
      sources: [
        {
          title: "ML Crash Course: Linear & logistic regression",
          url: "https://developers.google.com/machine-learning/crash-course",
          by: "Google",
          note: "CC BY 4.0",
        },
        {
          title: "CS229 Lecture Notes",
          url: "https://cs229.stanford.edu/",
          by: "Stanford University (Andrew Ng et al.)",
        },
        {
          title: "Dive into Deep Learning, ch. 3–4",
          url: "https://d2l.ai/",
          by: "Zhang, Lipton, Li & Smola",
          note: "CC BY-SA 4.0, with runnable code",
        },
      ],
    },
    {
      slug: "gradient-descent",
      title: "Gradient descent: rolling downhill",
      emoji: "⛷️",
      minutes: 6,
      summary:
        "How models find good weights: feel the slope, take a small step down, repeat.",
      blocks: [
        {
          kind: "p",
          text: "Picture yourself on a foggy hillside at night. You can't see the valley, but you can feel which way the ground slopes under your feet. Step downhill. Feel again. Step again. That's **gradient descent**, the algorithm that trains almost every model in existence.",
        },
        {
          kind: "figure",
          graphic: "gradient-descent",
          caption:
            "The loss curve is the hill. Each step moves the weight a little in the downhill direction until we settle near the bottom.",
        },
        {
          kind: "interactive",
          id: "gradient-descent",
          caption: "Try different learning rates and starting points.",
        },
        {
          kind: "code",
          title: "Gradient descent in ten lines",
          code: "# Learn w in y = w * x from data, one small step at a time.\ndata = [(1, 3), (2, 6), (3, 9), (4, 12)]   # the true w is 3\nw = 0.0\nlearning_rate = 0.02\n\nfor step in range(30):\n    # slope of the mean squared error with respect to w\n    grad = sum(2 * (w * x - y) * x for x, y in data) / len(data)\n    w -= learning_rate * grad\n    if step % 5 == 0:\n        loss = sum((w * x - y) ** 2 for x, y in data) / len(data)\n        print(f\"step {step:2d}  w = {w:.3f}  loss = {loss:.3f}\")\n\nprint(\"final w:\", round(w, 3))",
          note: "Set learning_rate to 0.1 and run it. The steps overshoot and w blows up, exactly like the ball in the explainer above.",
        },
        {
          kind: "card",
          title: "📐 The gradient",
          body: [
            "The **gradient** is the slope of the loss with respect to each weight. It points *uphill*.",
            "So we move in the **opposite** direction: `w_new = w_old − learning_rate × gradient`.",
          ],
        },
        {
          kind: "card",
          title: "👟 The learning rate",
          body: [
            "The **learning rate** is the step size.",
            "Too small: you'll get there, eventually, in a few weeks. Too big: you leap over the valley and bounce around or fly off entirely.",
            "Picking it well is one of the most important practical skills in deep learning.",
          ],
        },
        {
          kind: "quiz",
          question:
            "Training loss is jumping up and down wildly and getting worse. What's the most likely fix?",
          options: [
            "Increase the learning rate",
            "Decrease the learning rate",
            "Remove the loss function",
            "Add more test data",
          ],
          answer: 1,
          explain:
            "Wild bouncing usually means steps are too big and keep overshooting the minimum. Smaller steps calm it down.",
        },
        {
          kind: "card",
          title: "🎒 Mini-batches (SGD)",
          body: [
            "Computing the gradient on the whole dataset each step is slow. Instead we use a small random **mini-batch** (say 32 or 256 examples).",
            "This is **stochastic gradient descent** (SGD). The noisy steps are faster, and the noise even helps escape bad spots.",
          ],
        },
        {
          kind: "card",
          title: "🚀 Fancier optimisers",
          body: [
            "**Momentum** keeps rolling in a consistent direction, like a ball gathering speed.",
            "**Adam** adapts the step size for every weight individually. It's the default choice for most deep learning today.",
          ],
        },
        {
          kind: "tip",
          text: "Pillow thought: real loss landscapes have millions of dimensions, not one. Nobody can picture that, but the foggy hillside rule still works: feel the slope, step down.",
        },
        {
          kind: "quiz",
          question: "Which way does gradient descent step?",
          options: [
            "In the direction of the gradient",
            "Opposite to the gradient",
            "In a random direction every time",
            "It doesn't move, it just measures",
          ],
          answer: 1,
          explain:
            "The gradient points uphill (towards higher loss), so we step the opposite way to reduce loss.",
        },
      ],
      takeaways: [
        "Gradient = slope of the loss; it points uphill.",
        "Update: w ← w − learning_rate × gradient.",
        "Learning rate too high → bouncing; too low → crawling.",
        "Mini-batches (SGD) and Adam make it fast in practice.",
      ],
      sources: [
        {
          title: "Gradient descent, how neural networks learn",
          url: "https://www.3blue1brown.com/lessons/gradient-descent",
          by: "3Blue1Brown",
        },
        {
          title: "Why Momentum Really Works",
          url: "https://distill.pub/2017/momentum/",
          by: "Gabriel Goh, Distill",
          note: "CC BY 4.0, interactive",
        },
        {
          title: "Dive into Deep Learning, ch. 12: Optimisation",
          url: "https://d2l.ai/chapter_optimization/index.html",
          by: "Zhang, Lipton, Li & Smola",
          note: "CC BY-SA 4.0",
        },
      ],
    },
    {
      slug: "overfitting",
      title: "Overfitting & the Goldilocks model",
      emoji: "🥣",
      minutes: 5,
      summary:
        "Too simple misses the pattern, too complex memorises the noise. How to land just right.",
      blocks: [
        {
          kind: "p",
          text: "A student who memorises every past exam word for word might ace those papers and then flunk the real exam. Models do the same thing. It's called **overfitting**, and fighting it is a huge part of machine learning.",
        },
        {
          kind: "figure",
          graphic: "fit-spectrum",
          caption:
            "Underfit (too simple), just right, and overfit (wiggles through every point, including the noise).",
        },
        {
          kind: "interactive",
          id: "overfitting",
          caption: "Slide from too simple to too complex and watch the test error.",
        },
        {
          kind: "card",
          title: "😴 Underfitting",
          body: [
            "The model is too simple to capture the pattern. It does badly on training data *and* new data.",
            "Fix: a bigger model, better features, or train longer.",
          ],
        },
        {
          kind: "card",
          title: "🤓 Overfitting",
          body: [
            "The model memorises the training data, noise and all. Training error is tiny but validation error is high.",
            "Signature: the training loss keeps falling while the validation loss starts *rising*.",
          ],
        },
        {
          kind: "quiz",
          question:
            "Training accuracy: 99%. Validation accuracy: 71%. What's going on?",
          options: [
            "Underfitting",
            "Overfitting",
            "A perfect model",
            "The validation set is broken for sure",
          ],
          answer: 1,
          explain:
            "A big gap between training and validation performance is the classic sign of overfitting.",
        },
        {
          kind: "card",
          title: "🛡️ Ways to fight overfitting",
          body: [
            "**More data**: the best cure when you can get it.",
            "**Data augmentation**: flip, crop, rotate images to make \"new\" examples.",
            "**Regularisation** (L1/L2): penalise large weights so the model stays simple.",
            "**Dropout**: randomly switch off neurons during training so none can be relied on too much.",
            "**Early stopping**: stop training when validation loss stops improving.",
          ],
        },
        {
          kind: "card",
          title: "⚖️ The bias–variance trade-off",
          body: [
            "**Bias**: error from wrong assumptions (too simple → underfit).",
            "**Variance**: error from being too sensitive to the specific training data (too complex → overfit).",
            "Good models balance the two.",
          ],
        },
        {
          kind: "tip",
          text: "Pillow thought: huge modern networks are so big they *could* memorise everything, yet they often generalise well anyway. Why exactly is still an active research question.",
        },
        {
          kind: "quiz",
          question: "Which of these is NOT a way to reduce overfitting?",
          options: [
            "Dropout",
            "Early stopping",
            "Training on the test set",
            "Data augmentation",
          ],
          answer: 2,
          explain:
            "Training on the test set doesn't fix overfitting; it just destroys your ability to measure it honestly.",
        },
      ],
      takeaways: [
        "Underfit = too simple; overfit = memorised the noise.",
        "Watch for the gap between training and validation scores.",
        "Fight overfitting with more data, augmentation, regularisation, dropout, early stopping.",
      ],
      sources: [
        {
          title: "ML Crash Course: Overfitting & regularisation",
          url: "https://developers.google.com/machine-learning/crash-course",
          by: "Google",
          note: "CC BY 4.0",
        },
        {
          title: "scikit-learn: Underfitting vs. Overfitting example",
          url: "https://scikit-learn.org/stable/auto_examples/model_selection/plot_underfitting_overfitting.html",
          by: "scikit-learn developers",
          note: "BSD-3",
        },
        {
          title: "Dropout paper (JMLR 2014)",
          url: "https://jmlr.org/papers/v15/srivastava14a.html",
          by: "Srivastava, Hinton et al.",
        },
      ],
    },
    {
      slug: "evaluating-models",
      title: "Is my model any good?",
      emoji: "🎯",
      minutes: 6,
      summary:
        "Accuracy can lie. Meet the confusion matrix, precision, recall and F1.",
      blocks: [
        {
          kind: "p",
          text: "A model that predicts \"no fraud\" for every transaction is 99.9% accurate if only 0.1% of transactions are fraud, and completely useless. To judge classifiers properly, you need better tools than accuracy.",
        },
        {
          kind: "figure",
          graphic: "confusion-matrix",
          caption:
            "The confusion matrix: every prediction lands in one of four boxes.",
        },
        {
          kind: "code",
          title: "Precision and recall by hand",
          code: "# 1 = spam, 0 = not spam\ntruth     = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0]\npredicted = [1, 1, 1, 0, 1, 0, 0, 0, 0, 0]\n\ntp = sum(t == 1 and p == 1 for t, p in zip(truth, predicted))\nfp = sum(t == 0 and p == 1 for t, p in zip(truth, predicted))\nfn = sum(t == 1 and p == 0 for t, p in zip(truth, predicted))\n\nprecision = tp / (tp + fp)\nrecall = tp / (tp + fn)\naccuracy = sum(t == p for t, p in zip(truth, predicted)) / len(truth)\nprint(f\"accuracy  {accuracy:.0%}\")\nprint(f\"precision {precision:.0%}  (of emails flagged, how many were spam)\")\nprint(f\"recall    {recall:.0%}  (of real spam, how much we caught)\")",
        },
        {
          kind: "card",
          title: "🔲 The four boxes",
          body: [
            "**True Positive (TP)**: said yes, was yes. 🎉",
            "**True Negative (TN)**: said no, was no. 👍",
            "**False Positive (FP)**: said yes, was actually no (false alarm).",
            "**False Negative (FN)**: said no, was actually yes (missed it).",
          ],
        },
        {
          kind: "card",
          title: "🎯 Precision",
          body: [
            "`Precision = TP / (TP + FP)`. Of everything I flagged, how much was right?",
            "Matters when false alarms are costly, e.g. a spam filter binning your job offer.",
          ],
        },
        {
          kind: "card",
          title: "🕸️ Recall",
          body: [
            "`Recall = TP / (TP + FN)`. Of all the real positives, how many did I catch?",
            "Matters when misses are costly, e.g. screening for cancer.",
          ],
        },
        {
          kind: "quiz",
          question:
            "For an airport weapon scanner, which metric matters most?",
          options: ["Precision", "Recall", "Neither", "Training speed"],
          answer: 1,
          explain:
            "Missing a real weapon (false negative) is far worse than an extra bag check (false positive), so you want very high recall.",
        },
        {
          kind: "card",
          title: "⚖️ F1 score & the trade-off",
          body: [
            "Raising your threshold usually boosts precision but lowers recall, and vice versa.",
            "**F1** is the harmonic mean of the two, a single number that's only high when both are.",
          ],
        },
        {
          kind: "card",
          title: "📈 For regression",
          body: [
            "**MAE**: average absolute error, easy to read (\"off by £12k on average\").",
            "**RMSE**: like MAE but punishes big misses more.",
            "**R²**: how much of the variation your model explains (1.0 is perfect).",
          ],
        },
        {
          kind: "quiz",
          question:
            "Your model flagged 100 emails as spam; 90 really were spam. What's the precision?",
          options: ["10%", "90%", "100%", "Can't tell without TN"],
          answer: 1,
          explain:
            "Precision = TP / (TP + FP) = 90 / 100 = 90%. (We'd need the missed spam count to compute recall.)",
        },
      ],
      takeaways: [
        "Accuracy misleads on imbalanced data.",
        "Precision: how many flagged were right. Recall: how many real ones were caught.",
        "F1 balances both; pick metrics based on the cost of each mistake.",
      ],
      sources: [
        {
          title: "ML Crash Course: Classification metrics",
          url: "https://developers.google.com/machine-learning/crash-course/classification",
          by: "Google",
          note: "CC BY 4.0",
        },
        {
          title: "scikit-learn: Model evaluation guide",
          url: "https://scikit-learn.org/stable/modules/model_evaluation.html",
          by: "scikit-learn developers",
          note: "BSD-3",
        },
      ],
    },
    {
      slug: "backpropagation",
      title: "Backpropagation: blame, passed backwards",
      emoji: "↩️",
      minutes: 6,
      summary:
        "How a network with millions of weights figures out which ones to adjust.",
      blocks: [
        {
          kind: "p",
          text: "Gradient descent needs the slope for *every* weight. With millions of weights, how do we get them all efficiently? **Backpropagation**: one pass forward to make a prediction, one pass backward to share out the blame.",
        },
        {
          kind: "figure",
          graphic: "backprop",
          caption:
            "Forward pass computes the prediction and loss. Backward pass sends error signals back through each layer to get every weight's gradient.",
        },
        {
          kind: "card",
          title: "➡️ Forward pass",
          body: [
            "Input flows through the layers, each doing its weighted sums and activations, until we get a prediction.",
            "Compare to the truth → loss.",
          ],
        },
        {
          kind: "card",
          title: "⬅️ Backward pass",
          body: [
            "Starting from the loss, ask each layer: \"how much did you contribute to this error?\"",
            "The **chain rule** from calculus lets us compute this layer by layer, reusing work from the layer above. That reuse is why it's fast.",
          ],
        },
        {
          kind: "tip",
          text: "Pillow thought: it's like a restaurant complaint. The customer tells the waiter, the waiter tells the chef, the chef checks which ingredient was off. Each person passes back a share of the blame.",
        },
        {
          kind: "quiz",
          question: "What mathematical rule makes backpropagation work?",
          options: [
            "Pythagoras' theorem",
            "The chain rule",
            "Bayes' theorem",
            "The law of large numbers",
          ],
          answer: 1,
          explain:
            "The chain rule lets us multiply local derivatives layer by layer to get each weight's effect on the final loss.",
        },
        {
          kind: "card",
          title: "🫥 Vanishing & exploding gradients",
          body: [
            "Multiplying many small numbers through deep networks can shrink gradients to almost zero (**vanishing**), so early layers stop learning. Multiplying big ones can blow up (**exploding**).",
            "Fixes: ReLU activations, careful initialisation, normalisation layers, and **residual connections** (shortcuts that let gradients skip layers).",
          ],
        },
        {
          kind: "card",
          title: "🤖 You rarely write it by hand",
          body: [
            "Frameworks like **PyTorch** and **JAX** do automatic differentiation: you write the forward pass and they compute all the gradients for you.",
            "Still, building it once yourself (see Karpathy's *micrograd* below) makes everything click.",
          ],
        },
        {
          kind: "quiz",
          question:
            "Residual (skip) connections mainly help with…",
          options: [
            "Making images prettier",
            "Letting gradients flow through very deep networks",
            "Reducing the dataset size",
            "Encrypting the weights",
          ],
          answer: 1,
          explain:
            "Skip connections give gradients a shortcut path, so very deep networks (100+ layers) can still train.",
        },
      ],
      takeaways: [
        "Forward pass → prediction & loss; backward pass → gradients.",
        "The chain rule spreads blame layer by layer efficiently.",
        "Residual connections and normalisation tame vanishing gradients.",
      ],
      sources: [
        {
          title: "Neural Networks: Zero to Hero (micrograd lecture)",
          url: "https://karpathy.ai/zero-to-hero.html",
          by: "Andrej Karpathy",
          note: "Build backprop from scratch, MIT-licensed code",
        },
        {
          title: "What is backpropagation really doing?",
          url: "https://www.3blue1brown.com/lessons/backpropagation",
          by: "3Blue1Brown",
        },
        {
          title: "CS231n: Backpropagation notes",
          url: "https://cs231n.github.io/optimization-2/",
          by: "Stanford University",
        },
      ],
    },
    {
      slug: "cnns-and-rnns",
      title: "Seeing and remembering: CNNs & RNNs",
      emoji: "👁️",
      minutes: 7,
      summary:
        "Special network shapes for images and sequences, and why they mattered.",
      blocks: [
        {
          kind: "p",
          text: "A plain network treats every input pixel as unrelated. But pixels next to each other belong together, and words in a sentence come in order. Two architectures were built to respect that structure.",
        },
        {
          kind: "figure",
          graphic: "convolution",
          caption:
            "A 3×3 filter slides across the image, producing a feature map that lights up wherever its pattern (here, a vertical edge) appears.",
        },
        {
          kind: "card",
          title: "🖼️ Convolutional Neural Networks (CNNs)",
          body: [
            "A small **filter** (say 3×3) slides across the image, checking each patch for a pattern like an edge.",
            "The *same* filter is reused everywhere, so a cat ear is recognised wherever it appears and the model needs far fewer weights.",
          ],
        },
        {
          kind: "card",
          title: "🏗️ Feature hierarchy",
          body: [
            "Stack conv layers with **pooling** (downsizing) in between.",
            "Early layers find edges → then textures → parts (eyes, wheels) → whole objects.",
            "AlexNet's win in the 2012 ImageNet competition kick-started the deep learning boom.",
          ],
        },
        {
          kind: "quiz",
          question:
            "Why do CNNs reuse the same filter across the whole image?",
          options: [
            "To save memory and detect a pattern wherever it appears",
            "Because GPUs can only store one filter",
            "To blur the image",
            "It's a bug that turned out fine",
          ],
          answer: 0,
          explain:
            "Weight sharing means far fewer parameters and translation-friendly detection: an edge is an edge anywhere.",
        },
        {
          kind: "card",
          title: "🔁 Recurrent Neural Networks (RNNs)",
          body: [
            "Read a sequence one step at a time, carrying a **hidden state**, a running memory of what came before.",
            "Used for text, speech, and time series before 2017.",
          ],
        },
        {
          kind: "card",
          title: "🧠 LSTMs: better memory",
          body: [
            "Plain RNNs forget long-ago inputs (vanishing gradients again).",
            "**LSTMs** add gates that learn what to remember, forget and output, so they hold on to context much longer.",
          ],
        },
        {
          kind: "card",
          title: "⏩ Why transformers took over",
          body: [
            "RNNs read word by word, so they can't easily be parallelised and still struggle with long text.",
            "Transformers (Advanced level!) look at every word at once with **attention**. Today they dominate language and are increasingly used for images too (Vision Transformers).",
          ],
        },
        {
          kind: "quiz",
          question: "What does an RNN's hidden state do?",
          options: [
            "Stores the final answer only",
            "Carries a summary of earlier steps in the sequence",
            "Hides the model from users",
            "Holds the test data",
          ],
          answer: 1,
          explain:
            "The hidden state is the network's running memory, updated at each step of the sequence.",
        },
      ],
      takeaways: [
        "CNNs slide shared filters over images to detect local patterns.",
        "Layers build from edges to objects.",
        "RNNs/LSTMs process sequences with a running memory.",
        "Transformers replaced RNNs for most language tasks.",
      ],
      sources: [
        {
          title: "CNN Explainer (interactive)",
          url: "https://poloclub.github.io/cnn-explainer/",
          by: "Wang et al., Georgia Tech Polo Club",
          note: "MIT licensed",
        },
        {
          title: "CS231n: Convolutional Neural Networks for Visual Recognition",
          url: "https://cs231n.github.io/",
          by: "Stanford University",
        },
        {
          title: "Understanding LSTM Networks",
          url: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/",
          by: "Christopher Olah",
        },
      ],
    },
    {
      slug: "embeddings",
      title: "Embeddings: meaning as maps",
      emoji: "🗺️",
      minutes: 5,
      summary:
        "How AI turns words, images and songs into points in space where closeness means similarity.",
      blocks: [
        {
          kind: "p",
          text: "Computers only understand numbers. So how does a model know that \"puppy\" is close to \"dog\" but far from \"spreadsheet\"? It gives every word a list of numbers, an **embedding**, so that similar meanings land near each other.",
        },
        {
          kind: "figure",
          graphic: "embeddings",
          caption:
            "A 2-D sketch of embedding space (real ones have hundreds of dimensions). Related words cluster, and directions can carry meaning.",
        },
        {
          kind: "interactive",
          id: "embeddings",
          caption: "Explore a small map of word meanings.",
        },
        {
          kind: "card",
          title: "📍 Words as coordinates",
          body: [
            "Each token becomes a vector, e.g. 768 numbers long.",
            "These numbers are learned during training. Nobody hand-picks them; they emerge from which words appear in similar contexts.",
          ],
        },
        {
          kind: "card",
          title: "🧮 Maths on meaning",
          body: [
            "Famous result from word2vec: `king − man + woman ≈ queen`.",
            "Directions in the space can capture concepts like gender, tense, or country → capital.",
          ],
        },
        {
          kind: "quiz",
          question:
            "In a good embedding space, \"cat\" and \"kitten\" should be…",
          options: [
            "Very far apart",
            "Close together",
            "Exactly the same point",
            "Unrelated, embeddings are random",
          ],
          answer: 1,
          explain:
            "Similar meanings end up near each other. That's the whole point of embeddings.",
        },
        {
          kind: "card",
          title: "📏 Measuring closeness",
          body: [
            "**Cosine similarity** compares the angle between two vectors: 1 = same direction, 0 = unrelated.",
            "It's how semantic search finds documents that *mean* the same thing even with different words.",
          ],
        },
        {
          kind: "card",
          title: "🌍 Embeddings everywhere",
          body: [
            "Not just words: sentences, images (CLIP puts images and captions in the same space), products, songs, users.",
            "Recommendation systems, search engines and RAG (Advanced level) all run on embeddings.",
          ],
        },
        {
          kind: "tip",
          text: "Pillow thought: \"You shall know a word by the company it keeps.\" Linguist J.R. Firth said this in 1957, decades before it became the core idea of word embeddings.",
        },
        {
          kind: "quiz",
          question: "Where do embedding values come from?",
          options: [
            "A dictionary written by linguists",
            "They're learned from data during training",
            "Random numbers that never change",
            "The alphabetical order of words",
          ],
          answer: 1,
          explain:
            "Embeddings are parameters too. Training shapes them so that useful relationships emerge.",
        },
      ],
      takeaways: [
        "Embeddings turn things into vectors where closeness = similarity.",
        "They're learned, not hand-written.",
        "Cosine similarity measures how close two embeddings are.",
        "They power search, recommendations and RAG.",
      ],
      sources: [
        {
          title: "The Illustrated Word2vec",
          url: "https://jalammar.github.io/illustrated-word2vec/",
          by: "Jay Alammar",
        },
        {
          title: "Hugging Face LLM Course: Semantic search with embeddings",
          url: "https://huggingface.co/learn/llm-course",
          by: "Hugging Face",
          note: "Apache 2.0",
        },
        {
          title: "Embedding Projector (interactive)",
          url: "https://projector.tensorflow.org/",
          by: "TensorFlow / Google",
        },
      ],
    },
    ...intermediateMore,
    ...intermediateNew,
  ],
};
