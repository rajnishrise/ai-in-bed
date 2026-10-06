"use client";

import { useState } from "react";
import { RichText } from "./RichText";

export function Quiz({
  question,
  options,
  answer,
  explain,
  n,
}: {
  question: string;
  options: string[];
  answer: number;
  explain: string;
  n: number;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const correct = picked === answer;

  return (
    <section className={`quiz ${answered ? (correct ? "is-right" : "is-wrong") : ""}`} aria-label={`Quick quiz ${n}`}>
      <div className="quiz-tag">🧩 Quick quiz</div>
      <p className="quiz-q">
        <RichText text={question} />
      </p>
      <div className="quiz-options" role="list">
        {options.map((opt, i) => {
          let state = "";
          if (answered && i === answer) state = "right";
          else if (answered && i === picked) state = "wrong";
          return (
            <button
              key={i}
              role="listitem"
              className={`quiz-opt ${state}`}
              disabled={answered}
              onClick={() => setPicked(i)}
            >
              <span className="quiz-letter">{String.fromCharCode(65 + i)}</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="quiz-feedback" role="status">
          <strong>{correct ? "🎉 Nice one!" : "💤 Not quite."}</strong> <RichText text={explain} />
          {!correct && (
            <button className="link-btn" onClick={() => setPicked(null)}>
              Try again
            </button>
          )}
        </div>
      )}
    </section>
  );
}
