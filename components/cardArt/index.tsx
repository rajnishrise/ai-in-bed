import { baseMotifs } from "./base";
import type { Motif } from "./kit";
import { motifsA } from "./motifs-a";
import { motifsB } from "./motifs-b";
import { motifsC } from "./motifs-c";
import { motifsD } from "./motifs-d";

const MOTIFS: Record<string, Motif> = { ...baseMotifs, ...motifsA, ...motifsB, ...motifsC, ...motifsD };

export const motifIds = () => Object.keys(MOTIFS);

/** Small deterministic hash so a card always gets the same stars and accent. */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function rng(seed: number) {
  let s = seed % 2147483647 || 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const TONES = ["c1", "c3", "c4", "c2"] as const;

/**
 * The illustrated header on a learning card: a motif on a soft glow, with a
 * scatter of stars and a horizon line, tinted with one of the theme accents.
 */
export function CardArt({ motif, seedKey, variant = "card" }: { motif: string; seedKey: string; variant?: "card" | "slide" }) {
  const Draw = MOTIFS[motif] ?? MOTIFS.moon;
  const h = hash(seedKey);
  const r = rng(h);
  const tone = TONES[h % TONES.length];
  const id = `ca${h.toString(36)}`;
  const stars: { x: number; y: number; s: number; k: number }[] = [];
  while (stars.length < 16) {
    const x = 6 + r() * 628;
    const y = 8 + r() * 92;
    if (Math.abs(x - 320) < 62) continue; // keep the middle clear for the motif
    stars.push({ x, y, s: 0.6 + r() * 1.4, k: Math.floor(r() * 4) });
  }
  return (
    <div className={variant === "slide" ? "card-art slide-art" : "card-art"} style={{ ["--art" as string]: `var(--${tone})` }} aria-hidden>
      <svg className="ca-sky" viewBox="0 0 640 120" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <radialGradient id={`${id}g`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="var(--art)" stopOpacity="0.34" />
            <stop offset="1" stopColor="var(--art)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}h`} x1="0" x2="1">
            <stop offset="0.2" stopColor="var(--gold)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--gold)" stopOpacity="0.55" />
            <stop offset="0.8" stopColor="var(--gold)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse cx="320" cy="60" rx="130" ry="64" fill={`url(#${id}g)`} />
        <path d="M0 118 Q320 90 640 118" fill="none" stroke={`url(#${id}h)`} strokeWidth="1" />
        {stars.map((st, i) =>
          st.k === 0 ? (
            <path
              key={i}
              className="ca-spark"
              d={`M${st.x} ${st.y - st.s * 3}Q${st.x} ${st.y} ${st.x + st.s * 3} ${st.y}Q${st.x} ${st.y} ${st.x} ${st.y + st.s * 3}Q${st.x} ${st.y} ${st.x - st.s * 3} ${st.y}Q${st.x} ${st.y} ${st.x} ${st.y - st.s * 3}Z`}
            />
          ) : (
            <circle key={i} className={st.k === 1 ? "ca-star accent" : "ca-star"} cx={st.x} cy={st.y} r={st.s} />
          ),
        )}
      </svg>
      <svg className="ca-motif" viewBox="0 0 100 100" focusable="false">
        <Draw />
      </svg>
    </div>
  );
}

function Sky({ id, seedKey, w, h, clear }: { id: string; seedKey: string; w: number; h: number; clear: number[] }) {
  const r = rng(hash(seedKey));
  const stars: { x: number; y: number; s: number; k: number }[] = [];
  let guard = 0;
  while (stars.length < Math.round(w / 34) && guard++ < 400) {
    const x = 6 + r() * (w - 12);
    const y = 8 + r() * (h - 28);
    if (clear.some((c) => Math.abs(x - c * w) < h * 0.46)) continue; // keep the motifs clear
    stars.push({ x, y, s: 0.6 + r() * 1.4, k: Math.floor(r() * 4) });
  }
  return (
    <svg className="ca-sky" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden>
      <defs>
        <radialGradient id={`${id}g`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--art)" stopOpacity="0.34" />
          <stop offset="1" stopColor="var(--art)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}h`} x1="0" x2="1">
          <stop offset="0.15" stopColor="var(--gold)" stopOpacity="0" />
          <stop offset="0.5" stopColor="var(--gold)" stopOpacity="0.55" />
          <stop offset="0.85" stopColor="var(--gold)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx={w / 2} cy={h / 2} rx={h * 1.1} ry={h * 0.55} fill={`url(#${id}g)`} />
      <path d={`M0 ${h - 2} Q${w / 2} ${h - 30} ${w} ${h - 2}`} fill="none" stroke={`url(#${id}h)`} strokeWidth="1" />
      {stars.map((st, i) =>
        st.k === 0 ? (
          <path
            key={i}
            className="ca-spark"
            d={`M${st.x} ${st.y - st.s * 3}Q${st.x} ${st.y} ${st.x + st.s * 3} ${st.y}Q${st.x} ${st.y} ${st.x} ${st.y + st.s * 3}Q${st.x} ${st.y} ${st.x - st.s * 3} ${st.y}Q${st.x} ${st.y} ${st.x} ${st.y - st.s * 3}Z`}
          />
        ) : (
          <circle key={i} className={st.k === 1 ? "ca-star accent" : "ca-star"} cx={st.x} cy={st.y} r={st.s} />
        ),
      )}
    </svg>
  );
}

const toneFor = (seedKey: string) => TONES[hash(seedKey) % TONES.length];

/**
 * A wide illustrated banner for the top of a post, guide or glossary page:
 * the main motif in the middle with two quieter companions either side.
 * It is a picture with a description (alt), not decoration, so screen
 * readers and search engines get a sentence about it.
 */
export function HeroArt({ motifs, seedKey, alt, size = "wide" }: { motifs: string[]; seedKey: string; alt: string; size?: "wide" | "compact" }) {
  const [main, left, right] = motifs;
  const Main = MOTIFS[main] ?? MOTIFS.moon;
  const L = left ? MOTIFS[left] : undefined;
  const R = right ? MOTIFS[right] : undefined;
  const id = `ha${hash(seedKey).toString(36)}`;
  return (
    <div
      className={`page-art page-art-${size}`}
      style={{ ["--art" as string]: `var(--${toneFor(seedKey)})` }}
      role="img"
      aria-label={alt}
    >
      <Sky id={id} seedKey={seedKey} w={720} h={200} clear={L || R ? [0.22, 0.5, 0.78] : [0.5]} />
      {L && (
        <svg className="ca-motif ha-side ha-left" viewBox="0 0 100 100" focusable="false" aria-hidden>
          <L />
        </svg>
      )}
      <svg className="ca-motif ha-main" viewBox="0 0 100 100" focusable="false" aria-hidden>
        <Main />
      </svg>
      {R && (
        <svg className="ca-motif ha-side ha-right" viewBox="0 0 100 100" focusable="false" aria-hidden>
          <R />
        </svg>
      )}
    </div>
  );
}

/** A small square tile with one motif, for lists of posts and guides. */
export function ArtThumb({ motif, seedKey }: { motif: string; seedKey: string }) {
  const Draw = MOTIFS[motif] ?? MOTIFS.moon;
  return (
    <span className="art-thumb" style={{ ["--art" as string]: `var(--${toneFor(seedKey)})` }} aria-hidden>
      <svg className="ca-motif" viewBox="0 0 100 100" focusable="false">
        <Draw />
      </svg>
    </span>
  );
}
