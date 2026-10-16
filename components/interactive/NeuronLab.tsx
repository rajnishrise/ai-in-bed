"use client";

import { useState } from "react";
import { Lab, Slider } from "./Lab";

const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));

/** One artificial neuron: weigh the inputs, add them up, squash. */
export default function NeuronLab() {
  const [x1, setX1] = useState(0.8);
  const [x2, setX2] = useState(0.3);
  const [w1, setW1] = useState(1.5);
  const [w2, setW2] = useState(-1);
  const [b, setB] = useState(-0.2);
  const [relu, setRelu] = useState(false);
  const z = w1 * x1 + w2 * x2 + b;
  const out = relu ? Math.max(0, z) : sigmoid(z);
  const outShown = Math.min(out, 1);
  const edge = (w: number) => ({
    className: w >= 0 ? "s3" : "s4",
    strokeWidth: 1 + Math.abs(w) * 2.4,
  });
  return (
    <Lab
      title="A single neuron"
      hint="Drag the weights. A big positive weight makes that input matter a lot; a negative weight makes it argue against firing."
    >
      <svg className="fig" viewBox="0 0 360 170" role="img" aria-label={`Neuron output ${out.toFixed(2)}`}>
        <line x1="62" y1="48" x2="170" y2="85" {...edge(w1)} />
        <line x1="62" y1="122" x2="170" y2="85" {...edge(w2)} />
        <line x1="210" y1="85" x2="290" y2="85" className="sink" strokeWidth="1.5" />
        <circle cx="46" cy="48" r="18" className="fsurf sline" strokeWidth="1.5" />
        <circle cx="46" cy="48" r={16 * x1} className="f2s" />
        <text x="46" y="52" textAnchor="middle" className="t-sm">{x1.toFixed(1)}</text>
        <circle cx="46" cy="122" r="18" className="fsurf sline" strokeWidth="1.5" />
        <circle cx="46" cy="122" r={16 * x2} className="f2s" />
        <text x="46" y="126" textAnchor="middle" className="t-sm">{x2.toFixed(1)}</text>
        <text x="112" y="52" textAnchor="middle" className="t-xs muted">w₁ {w1.toFixed(1)}</text>
        <text x="112" y="128" textAnchor="middle" className="t-xs muted">w₂ {w2.toFixed(1)}</text>
        <circle cx="190" cy="85" r="24" className="f1s s1" strokeWidth="1.5" />
        <text x="190" y="82" textAnchor="middle" className="t-xs muted">Σ + b</text>
        <text x="190" y="96" textAnchor="middle" className="t-sm bold">{z.toFixed(2)}</text>
        <rect x="292" y="35" width="24" height="100" rx="6" className="fsurf sline" strokeWidth="1.2" />
        <rect x="292" y={35 + 100 * (1 - outShown)} width="24" height={100 * outShown} rx="6" className="f2" />
        <text x="304" y="152" textAnchor="middle" className="t-sm bold">{out.toFixed(2)}</text>
        <text x="304" y="25" textAnchor="middle" className="t-xs muted">output</text>
        <text x="250" y="76" textAnchor="middle" className="t-xs muted">{relu ? "ReLU" : "sigmoid"}</text>
      </svg>
      <div className="lab-grid">
        <Slider label="Input x₁" value={x1} min={0} max={1} step={0.05} onChange={setX1} format={(v) => v.toFixed(2)} />
        <Slider label="Input x₂" value={x2} min={0} max={1} step={0.05} onChange={setX2} format={(v) => v.toFixed(2)} />
        <Slider label="Weight w₁" value={w1} min={-3} max={3} step={0.1} onChange={setW1} />
        <Slider label="Weight w₂" value={w2} min={-3} max={3} step={0.1} onChange={setW2} />
        <Slider label="Bias b" value={b} min={-3} max={3} step={0.1} onChange={setB} />
        <div className="lab-toggle" role="group" aria-label="Activation">
          <button className={`chip-btn ${!relu ? "on" : ""}`} aria-pressed={!relu} onClick={() => setRelu(false)}>Sigmoid</button>
          <button className={`chip-btn ${relu ? "on" : ""}`} aria-pressed={relu} onClick={() => setRelu(true)}>ReLU</button>
        </div>
      </div>
      <p className="lab-readout">
        <code>
          {w1.toFixed(1)}×{x1.toFixed(2)} + {w2.toFixed(1)}×{x2.toFixed(2)} + {b.toFixed(1)} = {z.toFixed(2)}
        </code>{" "}
        → {relu ? "ReLU" : "sigmoid"} → <strong>{out.toFixed(2)}</strong>
      </p>
    </Lab>
  );
}
