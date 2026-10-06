import type { ReactNode } from "react";
import type { GraphicId } from "@/content/types";

/*
 * Hand-drawn SVG infographics. Colours come from CSS classes (see
 * globals.css, ".fig") so every graphic follows the night/morning theme.
 *   f1–f4   solid accent fills     f1s–f4s  soft (translucent) fills
 *   s1–s4   accent strokes         sline    neutral stroke
 *   muted   secondary text         t-sm / t-lg / bold  text sizes
 */

function Svg({
  id,
  label,
  h,
  children,
}: {
  id: string;
  label: string;
  h: number;
  children: ReactNode;
}) {
  return (
    <svg
      className="fig"
      viewBox={`0 0 360 ${h}`}
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id={`ah-${id}`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" className="fmarker" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

const arrow = (id: string) => `url(#ah-${id})`;

/** Tiny deterministic PRNG so server and client render identical "noise". */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function AiNesting() {
  const rings = [
    { r: 125, label: "Artificial Intelligence", sub: "machines doing smart things", c: "f1s" },
    { r: 95, label: "Machine Learning", sub: "learning from examples", c: "f2s" },
    { r: 64, label: "Deep Learning", sub: "many-layered networks", c: "f3s" },
    { r: 34, label: "Gen AI", sub: "", c: "f4" },
  ];
  return (
    <Svg id="nest" label="Nested circles: AI contains machine learning, which contains deep learning, which contains generative AI" h={256}>
      {rings.map((ring) => {
        const cy = 252 - ring.r;
        const top = cy - ring.r;
        return (
          <g key={ring.label}>
            <circle cx={180} cy={cy} r={ring.r} className={`${ring.c} sline`} strokeWidth={1} />
            {ring.sub ? (
              <>
                <text x={180} y={top + 18} textAnchor="middle" className="bold">
                  {ring.label}
                </text>
                <text x={180} y={top + 31} textAnchor="middle" className="t-sm muted">
                  {ring.sub}
                </text>
              </>
            ) : (
              <text x={180} y={cy + 4} textAnchor="middle" className="bold on-solid">
                {ring.label}
              </text>
            )}
          </g>
        );
      })}
    </Svg>
  );
}

function LearningLoop() {
  const boxes = [
    { x: 125, y: 8, t: "🎯 Predict", s: "makes a guess" },
    { x: 240, y: 88, t: "📏 Measure", s: "loss = how wrong" },
    { x: 125, y: 168, t: "🔧 Adjust", s: "nudge weights" },
    { x: 10, y: 88, t: "📚 Next batch", s: "more examples" },
  ];
  const id = "loop";
  return (
    <Svg id={id} label="Training loop: predict, measure loss, adjust weights, take the next batch, repeat" h={220}>
      {boxes.map((b, i) => (
        <g key={b.t}>
          <rect x={b.x} y={b.y} width={110} height={44} rx={12} className={`f${i + 1}s s${i + 1}`} strokeWidth={1.5} />
          <text x={b.x + 55} y={b.y + 19} textAnchor="middle" className="bold">
            {b.t}
          </text>
          <text x={b.x + 55} y={b.y + 34} textAnchor="middle" className="t-sm muted">
            {b.s}
          </text>
        </g>
      ))}
      {[
        [238, 42, 270, 84],
        [270, 136, 238, 172],
        [122, 172, 90, 136],
        [90, 84, 122, 42],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="sink" strokeWidth={1.8} markerEnd={arrow(id)} />
      ))}
      <text x={180} y={106} textAnchor="middle" className="t-sm muted">
        repeat
      </text>
      <text x={180} y={120} textAnchor="middle" className="t-sm muted">
        millions of times
      </text>
    </Svg>
  );
}

function ThreeLearnings() {
  const id = "three";
  const panel = (x: number, title: string, cap: string, c: number, body: ReactNode) => (
    <g>
      <rect x={x} y={4} width={112} height={192} rx={14} className={`f${c}s s${c}`} strokeWidth={1.2} />
      <text x={x + 56} y={26} textAnchor="middle" className="bold">
        {title}
      </text>
      {body}
      <text x={x + 56} y={182} textAnchor="middle" className="t-sm muted">
        {cap}
      </text>
    </g>
  );
  const sup = [
    [20, 60, 1], [40, 80, 1], [28, 105, 1], [55, 62, 1], [48, 120, 1],
    [78, 95, 2], [95, 70, 2], [88, 130, 2], [100, 115, 2], [72, 140, 2],
  ];
  const clusters = [
    { cx: 158, cy: 70, pts: [[150, 62], [162, 74], [170, 64], [154, 80]] },
    { cx: 205, cy: 85, pts: [[198, 78], [210, 92], [214, 80], [200, 94]] },
    { cx: 172, cy: 135, pts: [[164, 128], [178, 140], [182, 130], [168, 144]] },
  ];
  return (
    <Svg id={id} label="Three panels: supervised learning with labelled points split by a line, unsupervised learning finding clusters, reinforcement learning with an agent receiving rewards" h={200}>
      {panel(4, "Supervised", "learns from labels", 1, (
        <g>
          <line x1={66} y1={44} x2={60} y2={158} className="sink" strokeDasharray="4 4" />
          {sup.map(([x, y, k], i) =>
            k === 1 ? (
              <circle key={i} cx={x} cy={y} r={6} className="f1" />
            ) : (
              <rect key={i} x={x - 5} y={y - 5} width={10} height={10} className="f2" />
            ),
          )}
          <text x={22} y={162} className="t-sm muted">🐱</text>
          <text x={88} y={162} className="t-sm muted">🐶</text>
        </g>
      ))}
      {panel(124, "Unsupervised", "finds hidden groups", 2, (
        <g>
          {clusters.map((c, i) => (
            <g key={i}>
              <circle cx={c.cx + 2} cy={c.cy + 6} r={20} className="sline" fill="none" strokeDasharray="3 3" />
              {c.pts.map(([x, y], j) => (
                <circle key={j} cx={x} cy={y} r={5} className="fmuted" />
              ))}
            </g>
          ))}
        </g>
      ))}
      {panel(244, "Reinforcement", "learns from rewards", 3, (
        <g>
          <circle cx={268} cy={70} r={14} className="f3" />
          <text x={268} y={75} textAnchor="middle" className="t-sm">🤖</text>
          <rect x={300} y={100} width={46} height={46} rx={8} className="fsurf sline" />
          <text x={323} y={128} textAnchor="middle">🌍</text>
          <path d="M282 72 Q 320 72 322 96" className="sink" fill="none" strokeWidth={1.5} markerEnd={arrow(id)} />
          <path d="M298 136 Q 262 136 266 88" className="s2" fill="none" strokeWidth={1.5} markerEnd={arrow(id)} />
          <text x={258} y={152} className="t-sm">⭐ +1</text>
          <text x={290} y={62} className="t-sm muted">act</text>
        </g>
      ))}
    </Svg>
  );
}

function Neuron() {
  const id = "neuron";
  const inputs = [
    { y: 45, x: "x₁", w: "w₁" },
    { y: 110, x: "x₂", w: "w₂" },
    { y: 175, x: "x₃", w: "w₃" },
  ];
  return (
    <Svg id={id} label="An artificial neuron: three inputs multiplied by weights, summed with a bias, passed through ReLU to give an output" h={220}>
      {inputs.map((inp) => (
        <g key={inp.x}>
          <line x1={46} y1={inp.y} x2={160} y2={110} className="s1" strokeWidth={2} />
          <circle cx={30} cy={inp.y} r={16} className="f1s s1" strokeWidth={1.5} />
          <text x={30} y={inp.y + 5} textAnchor="middle" className="bold">
            {inp.x}
          </text>
          <rect x={84} y={(inp.y + 110) / 2 + 2 - 11} width={36} height={18} rx={9} className="fsurf s1" strokeWidth={1} />
          <text x={102} y={(inp.y + 110) / 2 + 3} textAnchor="middle" className="t-sm bold accent1">
            × {inp.w}
          </text>
        </g>
      ))}
      <circle cx={190} cy={110} r={32} className="f2s s2" strokeWidth={2} />
      <text x={190} y={108} textAnchor="middle" className="t-lg bold">Σ</text>
      <text x={190} y={126} textAnchor="middle" className="t-sm">+ bias</text>
      <line x1={222} y1={110} x2={244} y2={110} className="sink" strokeWidth={1.8} markerEnd={arrow(id)} />
      <rect x={248} y={80} width={62} height={60} rx={10} className="f3s s3" strokeWidth={1.5} />
      <polyline points="256,126 279,126 302,94" className="s3" fill="none" strokeWidth={2.5} />
      <text x={279} y={156} textAnchor="middle" className="t-sm muted">ReLU</text>
      <line x1={310} y1={110} x2={326} y2={110} className="sink" strokeWidth={1.8} markerEnd={arrow(id)} />
      <circle cx={342} cy={110} r={14} className="f4" />
      <text x={342} y={115} textAnchor="middle" className="bold on-solid">y</text>
      <text x={30} y={210} textAnchor="middle" className="t-sm muted">inputs</text>
      <text x={190} y={210} textAnchor="middle" className="t-sm muted">weighted sum</text>
      <text x={330} y={210} textAnchor="middle" className="t-sm muted">output</text>
    </Svg>
  );
}

function DataSplit() {
  const parts = [
    { w: 238, label: "Train", pct: "70%", note: "learn from it", c: 1 },
    { w: 51, label: "Val", pct: "15%", note: "tune", c: 2 },
    { w: 51, label: "Test", pct: "15%", note: "final 🔒", c: 3 },
  ];
  let x = 10;
  return (
    <Svg id="split" label="Data split: 70 percent training, 15 percent validation, 15 percent test" h={120}>
      {parts.map((p) => {
        const x0 = x;
        x += p.w;
        return (
          <g key={p.label}>
            <rect x={x0} y={20} width={p.w - 3} height={56} rx={10} className={`f${p.c}`} />
            <text x={x0 + (p.w - 3) / 2} y={44} textAnchor="middle" className="bold on-solid">
              {p.label}
            </text>
            <text x={x0 + (p.w - 3) / 2} y={62} textAnchor="middle" className="t-sm on-solid">
              {p.pct}
            </text>
            <text x={x0 + (p.w - 3) / 2} y={98} textAnchor="middle" className="t-sm muted">
              {p.note}
            </text>
          </g>
        );
      })}
    </Svg>
  );
}

function NextToken() {
  const id = "next";
  const tokens = ["The", "cat", "sat", "on", "the"];
  const cands = [
    { t: "mat", p: 0.62 },
    { t: "floor", p: 0.18 },
    { t: "sofa", p: 0.11 },
    { t: "roof", p: 0.06 },
    { t: "moon", p: 0.03 },
  ];
  let x = 14;
  return (
    <Svg id={id} label="The model reads 'The cat sat on the' and assigns probabilities to next tokens: mat 62 percent, floor 18, sofa 11, roof 6, moon 3" h={240}>
      {tokens.map((t) => {
        const w = t.length * 9 + 18;
        const x0 = x;
        x += w + 6;
        return (
          <g key={x0}>
            <rect x={x0} y={10} width={w} height={28} rx={8} className="f1s s1" />
            <text x={x0 + w / 2} y={29} textAnchor="middle">
              {t}
            </text>
          </g>
        );
      })}
      <rect x={x} y={10} width={52} height={28} rx={8} className="f2 " />
      <text x={x + 26} y={29} textAnchor="middle" className="bold on-solid">
        ?
      </text>
      <line x1={180} y1={46} x2={180} y2={66} className="sink" strokeWidth={1.8} markerEnd={arrow(id)} />
      <text x={190} y={61} className="t-sm muted">model scores every token</text>
      {cands.map((c, i) => {
        const y = 80 + i * 30;
        return (
          <g key={c.t}>
            <text x={62} y={y + 15} textAnchor="end" className={i === 0 ? "bold" : ""}>
              {c.t}
            </text>
            <rect x={72} y={y} width={240} height={20} rx={6} className="fsurf" />
            <rect x={72} y={y} width={Math.max(6, c.p * 240)} height={20} rx={6} className="f2" opacity={i === 0 ? 1 : 0.45} />
            <text x={320} y={y + 15} className="t-sm">
              {Math.round(c.p * 100)}%
            </text>
          </g>
        );
      })}
    </Svg>
  );
}

function Regression() {
  const pts: [number, number][] = [
    [35, 150], [50, 149], [62, 126], [75, 128], [88, 104],
    [100, 108], [112, 85], [125, 86], [140, 60], [155, 58],
  ];
  const sig: string[] = [];
  for (let x = 205; x <= 350; x += 3) {
    const y = 160 - 110 / (1 + Math.exp(-(x - 278) / 11));
    sig.push(`${x},${y.toFixed(1)}`);
  }
  const zeros = [215, 230, 244, 258, 272];
  const ones = [282, 296, 312, 326, 340];
  return (
    <Svg id="reg" label="Left: points with a straight best-fit line for linear regression. Right: points at 0 and 1 with an S-shaped sigmoid curve for logistic regression" h={200}>
      <text x={95} y={18} textAnchor="middle" className="bold">Linear → a number</text>
      <line x1={25} y1={172} x2={168} y2={172} className="sline" />
      <line x1={25} y1={172} x2={25} y2={30} className="sline" />
      <line x1={28} y1={162} x2={162} y2={48} className="s1" strokeWidth={3} />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={5} className="f2" />
      ))}
      <text x={96} y={190} textAnchor="middle" className="t-sm muted">house size →</text>

      <text x={278} y={18} textAnchor="middle" className="bold">Logistic → a probability</text>
      <line x1={202} y1={172} x2={352} y2={172} className="sline" />
      <line x1={202} y1={172} x2={202} y2={30} className="sline" />
      <line x1={202} y1={105} x2={352} y2={105} className="sline" strokeDasharray="3 4" />
      <text x={206} y={101} className="t-sm muted">0.5</text>
      <text x={206} y={46} className="t-sm muted">1</text>
      <text x={206} y={156} className="t-sm muted">0</text>
      <polyline points={sig.join(" ")} className="s1" fill="none" strokeWidth={3} />
      {zeros.map((x) => (
        <circle key={x} cx={x} cy={160} r={5} className="f3" />
      ))}
      {ones.map((x) => (
        <circle key={x} cx={x} cy={50} r={5} className="f4" />
      ))}
      <text x={278} y={190} textAnchor="middle" className="t-sm muted">suspicious words →</text>
    </Svg>
  );
}

function GradientDescent() {
  const id = "gd";
  const f = (x: number) => 185 - 0.0055 * (x - 190) ** 2;
  const curve: string[] = [];
  for (let x = 30; x <= 340; x += 4) curve.push(`${x},${f(x).toFixed(1)}`);
  const steps = [44, 98, 136, 160, 174, 183];
  return (
    <Svg id={id} label="A U-shaped loss curve with a ball taking smaller and smaller steps downhill towards the minimum" h={225}>
      <line x1={22} y1={214} x2={350} y2={214} className="sline" />
      <line x1={22} y1={214} x2={22} y2={20} className="sline" />
      <text x={30} y={22} className="t-sm muted">loss ↑</text>
      <text x={344} y={208} textAnchor="end" className="t-sm muted">weight →</text>
      <polyline points={curve.join(" ")} className="s1" fill="none" strokeWidth={3} />
      {steps.slice(0, -1).map((x, i) => (
        <path
          key={x}
          d={`M${x + 4},${f(x) - 12} Q ${(x + steps[i + 1]) / 2},${Math.min(f(x), f(steps[i + 1])) - 26} ${steps[i + 1] - 3},${f(steps[i + 1]) - 13}`}
          className="s2"
          fill="none"
          strokeWidth={1.6}
          markerEnd={arrow(id)}
        />
      ))}
      {steps.map((x, i) => (
        <circle key={x} cx={x} cy={f(x) - 7} r={7} className="f2" opacity={0.45 + (0.55 * i) / (steps.length - 1)} />
      ))}
      <text x={44} y={f(44) - 22} textAnchor="middle" className="t-sm bold">start</text>
      <text x={204} y={203} className="t-sm bold">← minimum ✓</text>
      <text x={190} y={30} textAnchor="middle" className="t-sm muted">steep slope → big steps</text>
      <text x={190} y={45} textAnchor="middle" className="t-sm muted">gentle slope → tiny steps</text>
    </Svg>
  );
}

function FitSpectrum() {
  const xs = [0.05, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95];
  const noise = [0.06, -0.07, 0.08, -0.05, 0.04, -0.08, 0.07, -0.04, 0.06, -0.07];
  const truth = (x: number) => 0.2 + 2.4 * (x - 0.5) ** 2;
  const ys = xs.map((x, i) => truth(x) + noise[i]);
  const mean = ys.reduce((a, b) => a + b, 0) / ys.length;
  const panels = [
    { label: "Underfit 😴", c: 4 },
    { label: "Just right 😊", c: 3 },
    { label: "Overfit 🤓", c: 2 },
  ];
  return (
    <Svg id="fit" label="Three plots of the same points: a flat line that underfits, a smooth curve that fits well, and a zig-zag line that overfits every point" h={190}>
      {panels.map((p, k) => {
        const ox = 4 + k * 120;
        const X = (x: number) => ox + 10 + x * 92;
        const Y = (y: number) => 150 - y * 150;
        let path = "";
        if (k === 0) path = `M${X(0)},${Y(mean)} L${X(1)},${Y(mean)}`;
        if (k === 1) {
          const pts = [];
          for (let x = 0; x <= 1.0001; x += 0.05) pts.push(`${X(x).toFixed(1)},${Y(truth(x)).toFixed(1)}`);
          path = `M${pts.join(" L")}`;
        }
        if (k === 2) path = `M${xs.map((x, i) => `${X(x).toFixed(1)},${Y(ys[i]).toFixed(1)}`).join(" L")}`;
        return (
          <g key={p.label}>
            <rect x={ox} y={4} width={112} height={182} rx={14} className={`f${p.c}s`} />
            <path d={path} className={`s${p.c}`} fill="none" strokeWidth={2.6} strokeLinejoin="round" />
            {xs.map((x, i) => (
              <circle key={i} cx={X(x)} cy={Y(ys[i])} r={4} className="fink" />
            ))}
            <text x={ox + 56} y={174} textAnchor="middle" className="t-sm bold">
              {p.label}
            </text>
          </g>
        );
      })}
    </Svg>
  );
}

function ConfusionMatrix() {
  const cells = [
    { r: 0, c: 0, t: "TP", s: "caught it ✓", cls: "f3" },
    { r: 0, c: 1, t: "FN", s: "missed it ✗", cls: "f2" },
    { r: 1, c: 0, t: "FP", s: "false alarm ✗", cls: "f2" },
    { r: 1, c: 1, t: "TN", s: "correctly ignored ✓", cls: "f3" },
  ];
  return (
    <Svg id="cm" label="Confusion matrix: rows are actual yes or no, columns are predicted yes or no. Cells are true positive, false negative, false positive and true negative" h={240}>
      <text x={220} y={16} textAnchor="middle" className="t-sm muted">MODEL PREDICTED</text>
      <text x={155} y={40} textAnchor="middle" className="bold">Yes</text>
      <text x={285} y={40} textAnchor="middle" className="bold">No</text>
      <text x={14} y={145} className="t-sm muted" transform="rotate(-90 14 145)" textAnchor="middle">ACTUALLY</text>
      <text x={55} y={100} textAnchor="middle" className="bold">Yes</text>
      <text x={55} y={190} textAnchor="middle" className="bold">No</text>
      {cells.map((cell) => {
        const x = 92 + cell.c * 130;
        const y = 52 + cell.r * 90;
        return (
          <g key={cell.t}>
            <rect x={x} y={y} width={124} height={84} rx={12} className={cell.cls} opacity={0.9} />
            <text x={x + 62} y={y + 40} textAnchor="middle" className="t-lg bold on-solid">
              {cell.t}
            </text>
            <text x={x + 62} y={y + 60} textAnchor="middle" className="t-sm on-solid">
              {cell.s}
            </text>
          </g>
        );
      })}
    </Svg>
  );
}

function Backprop() {
  const id = "bp";
  const layers = [
    { x: 40, n: 3 },
    { x: 130, n: 4 },
    { x: 220, n: 2 },
  ];
  const ny = (n: number, i: number) => 115 + (i - (n - 1) / 2) * 34;
  return (
    <Svg id={id} label="A small network with forward arrows from input to loss on top, and backward gradient arrows from loss to input underneath" h={230}>
      <line x1={30} y1={22} x2={330} y2={22} className="s1" strokeWidth={2.5} markerEnd={arrow(id)} />
      <text x={180} y={16} textAnchor="middle" className="t-sm bold accent1">forward: make a prediction</text>
      {layers.slice(0, -1).map((L, li) =>
        Array.from({ length: L.n }).flatMap((_, i) =>
          Array.from({ length: layers[li + 1].n }).map((__, j) => (
            <line
              key={`${li}-${i}-${j}`}
              x1={L.x}
              y1={ny(L.n, i)}
              x2={layers[li + 1].x}
              y2={ny(layers[li + 1].n, j)}
              className="sline"
              strokeWidth={1}
            />
          )),
        ),
      )}
      {layers[2] &&
        Array.from({ length: 2 }).map((_, i) => (
          <line key={i} x1={220} y1={ny(2, i)} x2={276} y2={115} className="sline" />
        ))}
      {layers.map((L, li) =>
        Array.from({ length: L.n }).map((_, i) => (
          <circle key={`${li}-${i}`} cx={L.x} cy={ny(L.n, i)} r={11} className={`f${li + 1}s s${li + 1}`} strokeWidth={1.5} />
        )),
      )}
      <rect x={276} y={92} width={70} height={46} rx={10} className="f4s s4" strokeWidth={1.5} />
      <text x={311} y={113} textAnchor="middle" className="bold">Loss</text>
      <text x={311} y={128} textAnchor="middle" className="t-sm muted">how wrong?</text>
      <line x1={330} y1={208} x2={30} y2={208} className="s4" strokeWidth={2.5} markerEnd={arrow(id)} />
      <text x={180} y={224} textAnchor="middle" className="t-sm bold accent4">backward: share out the blame (gradients)</text>
      <text x={40} y={190} textAnchor="middle" className="t-sm muted">input</text>
      <text x={130} y={190} textAnchor="middle" className="t-sm muted">hidden</text>
      <text x={220} y={190} textAnchor="middle" className="t-sm muted">output</text>
    </Svg>
  );
}

function Convolution() {
  const id = "conv";
  const C = 22;
  const kernel = [-1, 0, 1];
  return (
    <Svg id={id} label="A 6 by 6 image with a vertical edge, a 3 by 3 edge-detecting filter, and the resulting 4 by 4 feature map that lights up along the edge" h={205}>
      <text x={76} y={26} textAnchor="middle" className="t-sm bold">image</text>
      {Array.from({ length: 36 }).map((_, k) => {
        const r = Math.floor(k / 6);
        const c = k % 6;
        return (
          <rect key={k} x={10 + c * C} y={36 + r * C} width={C - 2} height={C - 2} rx={3} className={c < 3 ? "fmuted" : "fsurf sline"} />
        );
      })}
      <rect x={10 + C - 2} y={36 + C - 2} width={3 * C + 2} height={3 * C + 2} rx={5} className="s2" fill="none" strokeWidth={3} />

      <text x={194} y={58} textAnchor="middle" className="t-sm bold">filter</text>
      {Array.from({ length: 9 }).map((_, k) => {
        const r = Math.floor(k / 3);
        const c = k % 3;
        return (
          <g key={k}>
            <rect x={164 + c * 20} y={68 + r * 20} width={19} height={19} rx={3} className="f2s s2" />
            <text x={164 + c * 20 + 9.5} y={68 + r * 20 + 14} textAnchor="middle" className="t-xs">
              {kernel[c]}
            </text>
          </g>
        );
      })}
      <text x={194} y={146} textAnchor="middle" className="t-sm muted">slides over</text>
      <text x={194} y={160} textAnchor="middle" className="t-sm muted">every patch</text>
      <line x1={232} y1={98} x2={256} y2={98} className="sink" strokeWidth={1.8} markerEnd={arrow(id)} />

      <text x={306} y={48} textAnchor="middle" className="t-sm bold">feature map</text>
      {Array.from({ length: 16 }).map((_, k) => {
        const r = Math.floor(k / 4);
        const c = k % 4;
        const hot = c === 1 || c === 2;
        return (
          <rect key={k} x={262 + c * C} y={58 + r * C} width={C - 2} height={C - 2} rx={3} className={hot ? "f3" : "fsurf sline"} />
        );
      })}
      <rect x={262 + C - 1} y={58 + C - 1} width={C} height={C} rx={4} className="s2" fill="none" strokeWidth={2.5} />
      <text x={306} y={166} textAnchor="middle" className="t-sm muted">bright = edge found</text>
    </Svg>
  );
}

function Embeddings() {
  const id = "emb";
  const words: [string, number, number, number][] = [
    ["dog", 60, 62, 1], ["puppy", 98, 44, 1], ["cat", 50, 104, 1], ["kitten", 98, 96, 1],
    ["pizza", 62, 192, 2], ["pasta", 118, 206, 2], ["bread", 92, 168, 2],
    ["king", 214, 72, 3], ["queen", 306, 72, 3], ["man", 214, 168, 3], ["woman", 306, 168, 3],
  ];
  return (
    <Svg id={id} label="A 2D map of word embeddings: animal words cluster together, food words cluster together, and the direction from man to woman matches the direction from king to queen" h={232}>
      <rect x={4} y={4} width={352} height={224} rx={14} className="fsurf" />
      <ellipse cx={76} cy={76} rx={58} ry={48} className="f1s" />
      <ellipse cx={92} cy={190} rx={58} ry={34} className="f2s" />
      <line x1={226} y1={168} x2={290} y2={168} className="s4" strokeWidth={2} markerEnd={arrow(id)} />
      <line x1={226} y1={72} x2={290} y2={72} className="s4" strokeWidth={2} markerEnd={arrow(id)} />
      <line x1={214} y1={156} x2={214} y2={84} className="sline" strokeDasharray="3 4" />
      <line x1={306} y1={156} x2={306} y2={84} className="sline" strokeDasharray="3 4" />
      <text x={258} y={122} textAnchor="middle" className="t-sm accent4 bold">same direction:</text>
      <text x={258} y={136} textAnchor="middle" className="t-sm accent4">“+ female”</text>
      {words.map(([w, x, y, k]) => (
        <g key={w}>
          <circle cx={x} cy={y} r={5} className={k === 3 ? "f4" : `f${k}`} />
          <text x={x} y={y - 9} textAnchor="middle" className="t-sm bold">
            {w}
          </text>
        </g>
      ))}
    </Svg>
  );
}

function Attention() {
  const toks: [string, number][] = [
    ["The", 0.02], ["animal", 0.46], ["didn't", 0.03], ["cross", 0.04], ["the", 0.01],
    ["street", 0.14], ["because", 0.05], ["it", 0.12], ["was", 0.04], ["too", 0.02], ["tired", 0.07],
  ];
  return (
    <Svg id="attn" label="Attention weights from the word 'it' over the sentence. 'animal' gets 46 percent, 'street' 14 percent, 'it' 12 percent, 'tired' 7 percent, and the rest are small" h={222}>
      <text x={180} y={16} textAnchor="middle" className="bold">Where does “it” look?</text>
      {toks.map(([t, w], i) => {
        const y = 28 + i * 17.5;
        const strong = w >= 0.1;
        return (
          <g key={i}>
            <text x={82} y={y + 12} textAnchor="end" className={`t-sm ${strong ? "bold" : ""} ${t === "it" ? "accent2" : ""}`}>
              {t}
            </text>
            <rect x={90} y={y} width={220} height={14} rx={4} className="fsurf" />
            <rect x={90} y={y} width={Math.max(3, (w / 0.46) * 220)} height={14} rx={4} className="f1" opacity={0.25 + 0.75 * (w / 0.46)} />
            <text x={318} y={y + 12} className="t-sm muted">
              {Math.round(w * 100)}%
            </text>
          </g>
        );
      })}
    </Svg>
  );
}

function LlmPipeline() {
  const id = "pipe";
  const stages = [
    { t: "1 · Pre-training", s: "next-token prediction, web scale", d: "trillions of tokens", w: 100, c: 1 },
    { t: "2 · Supervised fine-tuning", s: "learn from ideal example answers", d: "~100k examples", w: 34, c: 2 },
    { t: "3 · Preference tuning", s: "RLHF / DPO / AI feedback", d: "comparisons", w: 22, c: 3 },
  ];
  return (
    <Svg id={id} label="Three-stage LLM training pipeline: pre-training on trillions of tokens, supervised fine-tuning on curated examples, preference tuning, ending in an assistant" h={262}>
      <text x={298} y={14} textAnchor="middle" className="t-sm muted">data size</text>
      {stages.map((st, i) => {
        const y = 22 + i * 64;
        return (
          <g key={st.t}>
            <rect x={8} y={y} width={228} height={48} rx={12} className={`f${st.c}s s${st.c}`} strokeWidth={1.5} />
            <text x={20} y={y + 20} className="bold">
              {st.t}
            </text>
            <text x={20} y={y + 37} className="t-sm muted">
              {st.s}
            </text>
            <rect x={248} y={y + 10} width={st.w} height={16} rx={4} className={`f${st.c}`} />
            <text x={248} y={y + 42} className="t-xs muted">
              {st.d}
            </text>
            <line x1={122} y1={y + 49} x2={122} y2={y + 62} className="sink" strokeWidth={1.8} markerEnd={arrow(id)} />
          </g>
        );
      })}
      <rect x={58} y={214} width={128} height={40} rx={20} className="f4" />
      <text x={122} y={239} textAnchor="middle" className="bold on-solid">🤖 Assistant</text>
      <text x={250} y={226} className="t-sm muted">base model is made</text>
      <text x={250} y={240} className="t-sm muted">in stage 1; stages</text>
      <text x={250} y={254} className="t-sm muted">2–3 shape behaviour</text>
    </Svg>
  );
}

function Rag() {
  const id = "rag";
  const row1 = [
    { t: "❓ Question", s: "from the user" },
    { t: "🔢 Embed", s: "turn into a vector" },
    { t: "🗄️ Search", s: "vector database" },
  ];
  const row2 = [
    { t: "💬 Answer", s: "with citations" },
    { t: "🤖 LLM", s: "writes the reply" },
    { t: "📝 Prompt", s: "question + top chunks" },
  ];
  const xs = [6, 128, 250];
  const box = (b: { t: string; s: string }, x: number, y: number, c: number) => (
    <g key={b.t}>
      <rect x={x} y={y} width={104} height={46} rx={12} className={`f${c}s s${c}`} strokeWidth={1.4} />
      <text x={x + 52} y={y + 20} textAnchor="middle" className="bold t-md">
        {b.t}
      </text>
      <text x={x + 52} y={y + 36} textAnchor="middle" className="t-xs muted">
        {b.s}
      </text>
    </g>
  );
  return (
    <Svg id={id} label="RAG pipeline: user question is embedded, similar chunks are found in a vector database, they are added to the prompt, and the LLM writes an answer with citations" h={196}>
      <text x={302} y={16} textAnchor="middle" className="t-xs muted">your docs, chunked &amp;</text>
      <text x={302} y={28} textAnchor="middle" className="t-xs muted">embedded in advance 📚</text>
      {row1.map((b, i) => box(b, xs[i], 36, i === 2 ? 3 : 1))}
      {row2.map((b, i) => box(b, xs[i], 136, i === 0 ? 4 : 2))}
      <line x1={112} y1={59} x2={126} y2={59} className="sink" strokeWidth={1.8} markerEnd={arrow(id)} />
      <line x1={234} y1={59} x2={248} y2={59} className="sink" strokeWidth={1.8} markerEnd={arrow(id)} />
      <line x1={302} y1={84} x2={302} y2={134} className="sink" strokeWidth={1.8} markerEnd={arrow(id)} />
      <text x={296} y={113} textAnchor="end" className="t-xs muted">top-k chunks</text>
      <line x1={248} y1={159} x2={234} y2={159} className="sink" strokeWidth={1.8} markerEnd={arrow(id)} />
      <line x1={126} y1={159} x2={112} y2={159} className="sink" strokeWidth={1.8} markerEnd={arrow(id)} />
    </Svg>
  );
}

function Lora() {
  return (
    <Svg id="lora" label="LoRA: a large frozen weight matrix W plus the product of a tall thin trainable matrix B and a short wide trainable matrix A" h={210}>
      <rect x={10} y={30} width={124} height={124} rx={8} className="fmuted" />
      <text x={72} y={90} textAnchor="middle" className="t-lg bold on-solid">W</text>
      <text x={72} y={110} textAnchor="middle" className="t-sm on-solid">🧊 frozen</text>
      <text x={72} y={174} textAnchor="middle" className="t-sm bold">d × d</text>
      <text x={72} y={190} textAnchor="middle" className="t-xs muted">~16.8M numbers</text>
      <text x={152} y={98} textAnchor="middle" className="t-lg bold">+</text>
      <rect x={170} y={30} width={22} height={124} rx={5} className="f2" />
      <text x={181} y={96} textAnchor="middle" className="bold on-solid">B</text>
      <text x={208} y={98} textAnchor="middle" className="t-lg bold">×</text>
      <rect x={224} y={81} width={124} height={22} rx={5} className="f3" />
      <text x={286} y={97} textAnchor="middle" className="bold on-solid">A</text>
      <text x={259} y={174} textAnchor="middle" className="t-sm bold">rank r = 8 · 🔥 trainable</text>
      <text x={259} y={190} textAnchor="middle" className="t-xs muted">~65k numbers (0.4%)</text>
      <text x={180} y={18} textAnchor="middle" className="t-sm muted">for one 4096 × 4096 layer</text>
    </Svg>
  );
}

function Diffusion() {
  const id = "diff";
  const rand = rng(42);
  const frames = [0, 1, 2, 3, 4];
  const noise = frames.map((k) =>
    Array.from({ length: k * 70 }).map(() => ({
      x: rand() * 54,
      y: rand() * 54,
      o: 0.35 + rand() * 0.65,
      c: rand() > 0.5 ? "fink" : "fmuted",
    })),
  );
  return (
    <Svg id={id} label="Five frames from a clear picture of a sun over a mountain to pure noise. The forward process adds noise; the model learns the reverse, removing noise step by step" h={200}>
      <line x1={22} y1={36} x2={338} y2={36} className="s2" strokeWidth={2} markerEnd={arrow(id)} />
      <text x={180} y={26} textAnchor="middle" className="t-sm bold accent2">forward: add noise (no learning needed)</text>
      {frames.map((k) => {
        const x = 16 + k * 68;
        const y = 56;
        const clip = `clip-${id}-${k}`;
        return (
          <g key={k}>
            <clipPath id={clip}>
              <rect x={x} y={y} width={56} height={56} rx={8} />
            </clipPath>
            <g clipPath={`url(#${clip})`}>
              <rect x={x} y={y} width={56} height={56} className="fsurf" />
              <g opacity={1 - k / 4}>
                <rect x={x} y={y} width={56} height={56} className="f1s" />
                <circle cx={x + 40} cy={y + 16} r={8} className="f2" />
                <path d={`M${x} ${y + 56} L${x + 20} ${y + 24} L${x + 34} ${y + 42} L${x + 42} ${y + 32} L${x + 56} ${y + 56} Z`} className="f3" />
              </g>
              {noise[k].map((n, i) => (
                <rect key={i} x={x + n.x} y={y + n.y} width={2.5} height={2.5} className={n.c} opacity={n.o} />
              ))}
            </g>
            <rect x={x} y={y} width={56} height={56} rx={8} className="sline" fill="none" />
            <text x={x + 28} y={130} textAnchor="middle" className="t-xs muted">
              {k === 0 ? "image" : k === 4 ? "pure noise" : `step ${k}`}
            </text>
          </g>
        );
      })}
      <line x1={338} y1={150} x2={22} y2={150} className="s3" strokeWidth={2} markerEnd={arrow(id)} />
      <text x={180} y={170} textAnchor="middle" className="t-sm bold accent3">reverse: the model predicts &amp; removes noise</text>
      <text x={180} y={186} textAnchor="middle" className="t-xs muted">start from random noise → get a brand-new image</text>
    </Svg>
  );
}

function RlLoop() {
  const id = "rl";
  return (
    <Svg id={id} label="Reinforcement learning loop: the agent sends an action to the environment, the environment returns a new state and reward to the agent" h={208}>
      <rect x={14} y={66} width={116} height={70} rx={14} className="f1s s1" strokeWidth={1.6} />
      <text x={72} y={96} textAnchor="middle" className="bold">🤖 Agent</text>
      <text x={72} y={116} textAnchor="middle" className="t-sm muted">policy π(a|s)</text>
      <rect x={230} y={66} width={116} height={70} rx={14} className="f3s s3" strokeWidth={1.6} />
      <text x={288} y={96} textAnchor="middle" className="bold">🌍 Environment</text>
      <text x={288} y={116} textAnchor="middle" className="t-sm muted">game, robot, world</text>
      <path d="M72 64 Q 72 20 180 20 Q 288 20 288 62" className="s1" fill="none" strokeWidth={2.2} markerEnd={arrow(id)} />
      <text x={180} y={14} textAnchor="middle" className="t-sm bold accent1">action aₜ</text>
      <path d="M288 138 Q 288 182 180 182 Q 72 182 72 140" className="s3" fill="none" strokeWidth={2.2} markerEnd={arrow(id)} />
      <text x={180} y={202} textAnchor="middle" className="t-sm bold accent3">new state sₜ₊₁ + reward rₜ₊₁ ⭐</text>
      <text x={180} y={104} textAnchor="middle" className="t-xs muted">goal: maximise</text>
      <text x={180} y={118} textAnchor="middle" className="t-xs muted">total future reward</text>
    </Svg>
  );
}

function Scaling() {
  const X = (e: number) => 52 + ((e - 18) / 7) * 290;
  const Y = (l: number) => 180 - ((l - 1.6) / 2.2) * 160;
  const loss = (e: number) => 3.6 - 0.27 * (e - 18);
  const noise = [0.05, -0.04, 0.03, -0.05, 0.02, 0.04, -0.03];
  const pts = [18.5, 19.3, 20.1, 21, 21.8, 22.6, 23.3].map((e, i) => [X(e), Y(loss(e) + noise[i])]);
  return (
    <Svg id="scale" label="Log-log plot: as training compute grows from 10 to the 18 to 10 to the 25 FLOPs, loss falls along a straight line, with a dashed extrapolation" h={222}>
      <line x1={46} y1={184} x2={350} y2={184} className="sline" />
      <line x1={46} y1={184} x2={46} y2={14} className="sline" />
      {[18, 20, 22, 24].map((e) => (
        <text key={e} x={X(e)} y={200} textAnchor="middle" className="t-xs muted">
          10^{e}
        </text>
      ))}
      <text x={198} y={216} textAnchor="middle" className="t-sm muted">training compute (FLOPs, log scale) →</text>
      <text x={14} y={100} textAnchor="middle" className="t-sm muted" transform="rotate(-90 14 100)">loss (log) ↓ better</text>
      <line x1={X(18)} y1={Y(loss(18))} x2={X(23.5)} y2={Y(loss(23.5))} className="s1" strokeWidth={2.5} />
      <line x1={X(23.5)} y1={Y(loss(23.5))} x2={X(25)} y2={Y(loss(25))} className="s1" strokeWidth={2.5} strokeDasharray="5 5" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={6} className="f2" />
      ))}
      <text x={X(24.6)} y={Y(loss(24.6)) - 16} textAnchor="middle" className="t-xs muted">predicted</text>
      <text x={X(19.8)} y={44} className="t-sm bold">each dot = one model size</text>
    </Svg>
  );
}

const registry: Record<GraphicId, () => ReactNode> = {
  "ai-nesting": AiNesting,
  "learning-loop": LearningLoop,
  "three-learnings": ThreeLearnings,
  neuron: Neuron,
  "data-split": DataSplit,
  "next-token": NextToken,
  regression: Regression,
  "gradient-descent": GradientDescent,
  "fit-spectrum": FitSpectrum,
  "confusion-matrix": ConfusionMatrix,
  backprop: Backprop,
  convolution: Convolution,
  embeddings: Embeddings,
  attention: Attention,
  "llm-pipeline": LlmPipeline,
  rag: Rag,
  lora: Lora,
  diffusion: Diffusion,
  "rl-loop": RlLoop,
  scaling: Scaling,
};

export function Graphic({ id }: { id: GraphicId }) {
  const G = registry[id];
  return <G />;
}
