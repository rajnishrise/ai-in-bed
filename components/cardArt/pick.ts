/** Picks a motif for a run of lesson text by looking for telling words. */
const RULES: [string, RegExp][] = [
  ["attention", /\battention|attend/i],
  ["tokens", /\btoken/i],
  ["constellation", /embedding|vector|meaning/i],
  ["hill", /gradient|downhill|loss|minim/i],
  ["neuron", /neuron|perceptron|activation/i],
  ["network", /neural net|network|layer of/i],
  ["tree", /decision tree|forest|split/i],
  ["clusters", /cluster|k-means|group/i],
  ["scatter", /regression|fit|line through/i],
  ["chart", /score|accuracy|benchmark|scal|grow|percent/i],
  ["picture", /image|picture|photo|pixel|draw/i],
  ["wave", /audio|voice|speech|sound/i],
  ["eye", /vision|see|camera/i],
  ["robot", /robot|agent/i],
  ["chat", /chatbot|chat|conversation|prompt/i],
  ["database", /retriev|database|memory|search engine/i],
  ["code", /\bcode|python|program/i],
  ["shield", /safe|harm|protect/i],
  ["lock", /privacy|private|password|secur/i],
  ["balance", /bias|fair|trade-off/i],
  ["mask", /fake|deepfake|scam|deceiv/i],
  ["briefcase", /\bjob|work|career|employ/i],
  ["hourglass", /history|year|decade|19\d\d|20\d\d/i],
  ["dice", /random|sample|probab|temperature/i],
  ["coin", /cost|money|cheap|expensive|price/i],
  ["server", /serv|gpu|comput/i],
  ["stack", /data|dataset|example/i],
  ["loop", /loop|repeat|iterat|feedback/i],
  ["brain", /learn|think|reason|intellig/i],
];

export function pickMotif(text: string): string {
  let best = "moon";
  let bestScore = 0;
  for (const [motif, re] of RULES) {
    const n = (text.match(new RegExp(re.source, "gi")) ?? []).length;
    if (n > bestScore) {
      best = motif;
      bestScore = n;
    }
  }
  return best;
}
