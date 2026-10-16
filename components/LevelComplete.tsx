"use client";

import { useEffect, useRef, useState } from "react";
import type { QuizItem } from "@/content";
import { Icon } from "./Icon";
import { useProgress } from "./progress";
import { QuizOptions } from "./Quiz";
import { RichText } from "./RichText";

const FINAL = 5;
const PASS = 4;

function pickQuestions(qs: QuizItem[]) {
  const a = [...qs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, FINAL);
}

/** Draws the shareable completion card on a canvas. */
async function drawCard(canvas: HTMLCanvasElement, name: string, level: string, lessons: number, score: number) {
  const W = 1080, H = 1350;
  canvas.width = W;
  canvas.height = H;
  const c = canvas.getContext("2d")!;
  await document.fonts.ready;
  const css = getComputedStyle(document.documentElement);
  const serif = css.getPropertyValue("--font-display").trim() || "Georgia";
  const sans = css.getPropertyValue("--font-body").trim() || "system-ui";
  const bg = c.createRadialGradient(W * 0.85, 0, 0, W * 0.85, 0, W * 1.1);
  bg.addColorStop(0, "#2a2440");
  bg.addColorStop(0.6, "#0a0a0f");
  c.fillStyle = bg;
  c.fillRect(0, 0, W, H);
  // stars
  const stars = [[120, 180], [930, 420], [820, 160], [200, 980], [960, 1080], [520, 120], [70, 420]];
  c.fillStyle = "rgba(242,240,235,0.55)";
  stars.forEach(([x, y], i) => {
    c.beginPath();
    c.arc(x, y, i % 2 ? 2.2 : 3.2, 0, Math.PI * 2);
    c.fill();
  });
  // crescent
  c.save();
  c.translate(W - 420, 130);
  c.scale(10, 10);
  c.fillStyle = "rgba(227,195,143,0.9)";
  c.fill(new Path2D("M14.04 4.16A12 12 0 1 0 27.84 17.96A10 10 0 0 1 14.04 4.16Z"));
  c.fillStyle = "#f2f0eb";
  [[20.6, 8.4, 1.45], [26.4, 6.2, 1.15], [24.6, 12.8, 1.25]].forEach(([x, y, r]) => {
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    c.fill();
  });
  c.strokeStyle = "rgba(242,240,235,0.6)";
  c.lineWidth = 0.9;
  c.stroke(new Path2D("M20.6 8.4 26.4 6.2M20.6 8.4 24.6 12.8M26.4 6.2 24.6 12.8"));
  c.restore();

  c.fillStyle = "#e3c38f";
  c.font = `600 30px ${sans}`;
  c.letterSpacing = "6px";
  c.fillText("LEVEL COMPLETE", 90, 620);
  c.letterSpacing = "0px";
  c.fillStyle = "#f2f0eb";
  c.font = `400 150px ${serif}`;
  c.fillText(level, 84, 770);
  c.font = `italic 400 64px ${serif}`;
  c.fillStyle = "#e3c38f";
  c.fillText("in AI, one night at a time", 90, 860);
  c.fillStyle = "#a9a7b6";
  c.font = `400 36px ${sans}`;
  c.fillText(`${lessons} lessons · final check ${score}/${FINAL}`, 90, 940);
  if (name.trim()) {
    c.fillStyle = "#f2f0eb";
    c.font = `400 72px ${serif}`;
    c.fillText(name.trim().slice(0, 28), 90, 1110);
    c.fillStyle = "rgba(242,240,235,0.25)";
    c.fillRect(90, 1135, 900, 2);
  }
  c.fillStyle = "#f2f0eb";
  c.font = `400 52px ${serif}`;
  c.fillText("AI ", 90, 1255);
  const w1 = c.measureText("AI ").width;
  c.font = `italic 400 52px ${serif}`;
  c.fillStyle = "#e3c38f";
  c.fillText("in", 90 + w1, 1255);
  const w2 = c.measureText("in").width;
  c.font = `400 52px ${serif}`;
  c.fillStyle = "#f2f0eb";
  c.fillText(" Bed", 90 + w1 + w2, 1255);
  c.fillStyle = "#a9a7b6";
  c.font = `400 30px ${sans}`;
  c.textAlign = "right";
  c.fillText(location.host, W - 90, 1252);
  c.textAlign = "left";
}

/** Final quiz and shareable card for a finished level. */
export function LevelComplete({ levelId, levelName, lessonKeys, quizzes }: { levelId: string; levelName: string; lessonKeys: string[]; quizzes: QuizItem[] }) {
  const { isDone } = useProgress();
  const [ready, setReady] = useState(false);
  const [qs, setQs] = useState<QuizItem[] | null>(null);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState<number | null>(null);
  const [name, setName] = useState("");
  const canvas = useRef<HTMLCanvasElement>(null);
  const storeKey = `aib-level-card-${levelId}`;

  useEffect(() => {
    setReady(true);
    try {
      const saved = JSON.parse(localStorage.getItem(storeKey) ?? "null");
      if (saved) {
        setPassed(saved.score);
        setName(saved.name ?? "");
      }
    } catch {
      /* ignore */
    }
  }, [storeKey]);

  useEffect(() => {
    if (passed !== null && canvas.current) drawCard(canvas.current, name, levelName, lessonKeys.length, passed);
  }, [passed, name, levelName, lessonKeys.length]);

  if (!ready) return null;
  const done = lessonKeys.filter(isDone).length;

  if (done < lessonKeys.length) {
    return (
      <section className="complete locked" aria-label="Level completion card">
        <Icon name="sparkle" size={22} />
        <div>
          <strong>Finish all {lessonKeys.length} lessons to unlock your {levelName} card.</strong>
          <p className="muted small">
            {lessonKeys.length - done} to go. Then pass a {FINAL}-question final check and get a card to share.
          </p>
        </div>
      </section>
    );
  }

  if (passed !== null) {
    const save = () => localStorage.setItem(storeKey, JSON.stringify({ score: passed, name }));
    const blob = () => new Promise<Blob | null>((res) => canvas.current?.toBlob(res, "image/png"));
    const download = async () => {
      save();
      const b = await blob();
      if (!b) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = `ai-in-bed-${levelId}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    };
    const share = async () => {
      save();
      const b = await blob();
      if (!b) return;
      const file = new File([b], `ai-in-bed-${levelId}.png`, { type: "image/png" });
      const data = { files: [file], title: "AI in Bed", text: `I finished the ${levelName} level on AI in Bed.`, url: location.origin };
      if (navigator.canShare?.(data)) await navigator.share(data).catch(() => {});
      else download();
    };
    return (
      <section className="complete" aria-label="Your completion card">
        <p className="kicker">Level complete</p>
        <h2>You finished {levelName}.</h2>
        <label className="filter-search">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name for the card (optional)" maxLength={28} aria-label="Name on the card" />
        </label>
        <canvas ref={canvas} className="card-canvas" aria-label={`${levelName} completion card`} />
        <div className="row-btns">
          <button className="btn btn-primary" onClick={share}>
            <Icon name="share" size={18} /> Share
          </button>
          <button className="btn btn-ghost" onClick={download}>
            <Icon name="download" size={18} /> Download
          </button>
        </div>
      </section>
    );
  }

  if (!qs) {
    return (
      <section className="complete" aria-label="Final check">
        <p className="kicker">All lessons finished</p>
        <h2>Ready for the {levelName} final check?</h2>
        <p className="muted">
          {FINAL} questions from across the level. Get {PASS} right to earn your completion card.
        </p>
        <button className="btn btn-primary" onClick={() => setQs(pickQuestions(quizzes))}>
          Start the final check <Icon name="arrow" size={18} />
        </button>
      </section>
    );
  }

  if (i >= qs.length) {
    const ok = score >= PASS;
    return (
      <section className="complete" aria-label="Final check result">
        <h2>
          {score} of {qs.length} right
        </h2>
        <p className="muted">{ok ? "You passed. Here comes your card." : `You need ${PASS} to pass. Reread a lesson or two and try again.`}</p>
        <div className="row-btns">
          {ok ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                setPassed(score);
                localStorage.setItem(storeKey, JSON.stringify({ score, name }));
              }}
            >
              Get my card <Icon name="sparkle" size={18} />
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                setQs(pickQuestions(quizzes));
                setI(0);
                setScore(0);
                setPicked(null);
              }}
            >
              Try again
            </button>
          )}
        </div>
      </section>
    );
  }

  const q = qs[i];
  return (
    <section className="complete" aria-label={`Final check question ${i + 1} of ${qs.length}`}>
      <p className="kicker">
        Final check · {i + 1} of {qs.length}
      </p>
      <div className={`quiz ${picked !== null ? (picked === q.answer ? "is-right" : "is-wrong") : ""}`}>
        <div className="quiz-tag">{q.lessonTitle}</div>
        <p className="quiz-q">
          <RichText text={q.question} />
        </p>
        <QuizOptions
          options={q.options}
          answer={q.answer}
          picked={picked}
          onPick={(k) => {
            setPicked(k);
            if (k === q.answer) setScore((s) => s + 1);
          }}
        />
        {picked !== null && (
          <div className="quiz-feedback" role="status">
            <strong>{picked === q.answer ? "Correct." : "Not quite."}</strong> <RichText text={q.explain} />
          </div>
        )}
      </div>
      {picked !== null && (
        <button
          className="btn btn-primary btn-block"
          onClick={() => {
            setPicked(null);
            setI(i + 1);
          }}
        >
          {i + 1 < qs.length ? "Next question" : "See my result"} <Icon name="arrow" size={18} />
        </button>
      )}
    </section>
  );
}
