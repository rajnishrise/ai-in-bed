"use client";

import { useEffect, useRef, useState } from "react";
import { Lab, Slider } from "./Lab";

const f = (x: number) => 0.08 * x * x + 0.6 * Math.sin(1.3 * x) + 1.5;
const df = (x: number) => 0.16 * x + 0.78 * Math.cos(1.3 * x);
const X0 = -6, X1 = 6, W = 340, H = 170;
const sx = (x: number) => 10 + ((x - X0) / (X1 - X0)) * W;
const sy = (y: number) => H - 14 - (y / 5) * (H - 30);

/** Roll a ball downhill on a bumpy loss curve. */
export default function GradientLab() {
  const [start, setStart] = useState(4.6);
  const [lr, setLr] = useState(0.5);
  const [path, setPath] = useState<number[]>([4.6]);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const x = path[path.length - 1];
  const diverged = Math.abs(x) > 6;

  const step = () =>
    setPath((p) => {
      const cur = p[p.length - 1];
      if (Math.abs(cur) > 6) return p;
      return [...p, cur - lr * df(cur)];
    });

  useEffect(() => {
    if (!running) return;
    let n = 0;
    timer.current = setInterval(() => {
      step();
      if (++n >= 25) setRunning(false);
    }, 140);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, lr]);

  const reset = (s = start) => {
    setRunning(false);
    setPath([s]);
  };

  const curve = Array.from({ length: 121 }, (_, i) => {
    const xx = X0 + ((X1 - X0) * i) / 120;
    return `${i ? "L" : "M"}${sx(xx).toFixed(1)} ${sy(f(xx)).toFixed(1)}`;
  }).join("");
  const shown = path.filter((p) => Math.abs(p) <= 6);
  const bx = Math.max(X0, Math.min(X1, x));

  return (
    <Lab
      title="Gradient descent on a bumpy hill"
      hint="Small steps are slow but steady. Too big and the ball overshoots and bounces around. Different starting points can land in different valleys."
    >
      <svg className="fig" viewBox={`0 0 360 ${H}`} role="img" aria-label={`Ball at x ${x.toFixed(2)}, loss ${f(bx).toFixed(2)}`}>
        <path d={curve} fill="none" className="s1" strokeWidth="2" />
        {shown.slice(0, -1).map((p, i) => (
          <line key={i} x1={sx(p)} y1={sy(f(p))} x2={sx(shown[i + 1])} y2={sy(f(shown[i + 1]))} className="s2" strokeWidth="1" strokeDasharray="3 3" />
        ))}
        {shown.map((p, i) => (
          <circle key={i} cx={sx(p)} cy={sy(f(p))} r="2.2" className="f2s" />
        ))}
        <circle cx={sx(bx)} cy={sy(f(bx)) - 7} r="7" className="f2" />
        <text x="12" y="16" className="t-xs muted">loss</text>
        <text x="348" y={H - 2} textAnchor="end" className="t-xs muted">parameter value</text>
      </svg>
      <div className="lab-grid">
        <Slider label="Learning rate" value={lr} min={0.05} max={3} step={0.05} onChange={setLr} />
        <Slider
          label="Starting point"
          value={start}
          min={-5.5}
          max={5.5}
          step={0.1}
          onChange={(v) => {
            setStart(v);
            reset(v);
          }}
          format={(v) => v.toFixed(1)}
        />
      </div>
      <div className="lab-btns">
        <button className="btn btn-ghost btn-sm" onClick={step} disabled={diverged}>One step</button>
        <button className="btn btn-primary btn-sm" onClick={() => setRunning(true)} disabled={running || diverged}>Run 25 steps</button>
        <button className="btn btn-ghost btn-sm" onClick={() => reset()}>Reset</button>
      </div>
      <p className="lab-readout">
        Step {path.length - 1} · position <strong>{x.toFixed(2)}</strong> · loss <strong>{diverged ? "off the chart" : f(x).toFixed(3)}</strong> · slope {diverged ? "–" : df(x).toFixed(2)}
        {diverged && " · the step was so big the ball flew off. Lower the learning rate and reset."}
      </p>
    </Lab>
  );
}
