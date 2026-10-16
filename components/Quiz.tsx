"use client";

import { useRef, useState } from "react";
import { useProgress } from "./progress";
import { RichText } from "./RichText";

/** A question in a lesson. The first answer schedules it for spaced review. */
export function Quiz({
  id,
  question,
  options,
  answer,
  explain,
  n,
}: {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explain: string;
  n: number;
}) {
  const { recordAnswer } = useProgress();
  const recorded = useRef(false);
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const correct = picked === answer;

  const pick = (i: number) => {
    setPicked(i);
    if (!recorded.current) {
      recorded.current = true;
      recordAnswer(id, i === answer, false);
    }
  };

  return (
    <section className={`quiz ${answered ? (correct ? "is-right" : "is-wrong") : ""}`} aria-label={`Quick check ${n}`}>
      <div className="quiz-tag">Quick check</div>
      <p className="quiz-q">
        <RichText text={question} />
      </p>
      <QuizOptions options={options} answer={answer} picked={picked} onPick={pick} />
      {answered && (
        <div className="quiz-feedback" role="status">
          <strong>{correct ? "Correct." : "Not quite."}</strong> <RichText text={explain} />
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

export function QuizOptions({
  options,
  answer,
  picked,
  onPick,
}: {
  options: string[];
  answer: number;
  picked: number | null;
  onPick: (i: number) => void;
}) {
  const answered = picked !== null;
  return (
    <ul className="quiz-options">
      {options.map((opt, i) => {
        let state = "";
        if (answered && i === answer) state = "right";
        else if (answered && i === picked) state = "wrong";
        return (
          <li key={i}>
            <button className={`quiz-opt ${state}`} disabled={answered} onClick={() => onPick(i)}>
              <span className="quiz-letter" aria-hidden>
                {String.fromCharCode(65 + i)}
              </span>
              <span>{opt}</span>
              {state && <span className="visually-hidden">{state === "right" ? " (correct answer)" : " (your answer)"}</span>}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
