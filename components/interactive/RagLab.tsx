"use client";

import { useState } from "react";
import { Lab } from "./Lab";

const DOCS = [
  { id: "Returns", text: "Pillows can be returned within 60 nights of delivery for a full refund." },
  { id: "Washing", text: "Covers are machine washable at 40°C. Never wash the foam core." },
  { id: "Shipping", text: "Orders ship in 2 working days. Delivery to the UK is free." },
  { id: "Warranty", text: "Every Moonlight pillow has a 5-year warranty against flattening." },
  { id: "Materials", text: "The core is memory foam made without ozone-depleting chemicals." },
  { id: "Company", text: "Moonlight Pillows was founded in 2019 in Leeds." },
];

const QUESTIONS = [
  {
    q: "Can I wash my Moonlight pillow?",
    with: "Yes, but only the cover: it is machine washable at 40°C. Don't wash the foam core. [Washing]",
    without: "Yes! Most pillows can go in the washing machine on a gentle cycle and tumble dry on low.",
  },
  {
    q: "How long do I have to return a pillow?",
    with: "You have 60 nights from delivery to return it for a full refund. [Returns]",
    without: "Most retailers offer a 30-day return window, so you probably have about a month.",
  },
  {
    q: "What is the warranty on the pillow?",
    with: "Every Moonlight pillow has a 5-year warranty against flattening. [Warranty]",
    without: "Pillows usually come with a 1-year limited warranty covering manufacturing defects.",
  },
];

const STOP = new Set(["can", "i", "my", "the", "a", "to", "do", "have", "how", "long", "what", "is", "on", "of", "for", "moonlight", "pillow", "pillows"]);
const words = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w));

/** Keyword-overlap scores stand in for vector similarity. */
function score(q: string, d: string) {
  const dw = new Set(words(d).map((w) => w.replace(/(es|s|ing|ed)$/, "")));
  return words(q).filter((w) => dw.has(w.replace(/(es|s|ing|ed)$/, ""))).length;
}

/** Retrieve, then answer: see how grounding changes the answer. */
export default function RagLab() {
  const [qi, setQi] = useState(0);
  const [useRag, setUseRag] = useState(true);
  const Q = QUESTIONS[qi];
  const ranked = DOCS.map((d) => ({ ...d, s: score(Q.q, `${d.id} ${d.text}`) })).sort((a, b) => b.s - a.s);
  const top = ranked.slice(0, 2).filter((d) => d.s > 0);
  return (
    <Lab title="Retrieval-augmented generation" hint="Without retrieval the model answers from general patterns and sounds just as confident. With retrieval it quotes the shop's own policy and cites it.">
      <div className="chips" role="group" aria-label="Question">
        {QUESTIONS.map((x, i) => (
          <button key={x.q} className={`chip-btn ${qi === i ? "on" : ""}`} aria-pressed={qi === i} onClick={() => setQi(i)}>
            {x.q}
          </button>
        ))}
      </div>
      <ol className="rag-steps">
        <li className={useRag ? "" : "off"}>
          <span className="rag-step">1 · Search the shop&apos;s documents</span>
          <ul className="rag-docs">
            {ranked.map((d) => (
              <li key={d.id} className={useRag && top.includes(d) ? "hit" : ""}>
                <strong>{d.id}</strong> <span className="muted">score {d.s}</span>
                <span>{d.text}</span>
              </li>
            ))}
          </ul>
        </li>
        <li className={useRag ? "" : "off"}>
          <span className="rag-step">2 · Paste the best matches into the prompt</span>
          <code className="rag-prompt">
            {useRag ? `Use only these notes: ${top.map((d) => `[${d.id}] ${d.text}`).join(" ")} Question: ${Q.q}` : `Question: ${Q.q}`}
          </code>
        </li>
        <li>
          <span className="rag-step">3 · The model answers</span>
          <p className={`rag-answer ${useRag ? "good" : "bad"}`}>{useRag ? Q.with : Q.without}</p>
        </li>
      </ol>
      <div className="lab-btns">
        <button className={`chip-btn ${useRag ? "on" : ""}`} aria-pressed={useRag} onClick={() => setUseRag(true)}>With retrieval</button>
        <button className={`chip-btn ${!useRag ? "on" : ""}`} aria-pressed={!useRag} onClick={() => setUseRag(false)}>Without retrieval</button>
      </div>
    </Lab>
  );
}
