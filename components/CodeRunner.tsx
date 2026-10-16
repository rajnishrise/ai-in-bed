"use client";

import { useRef, useState } from "react";
import { Icon } from "./Icon";

const PYODIDE = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/";

type Pyodide = {
  runPythonAsync: (code: string) => Promise<unknown>;
  loadPackage: (pkgs: string[]) => Promise<void>;
  setStdout: (o: { batched: (s: string) => void }) => void;
  setStderr: (o: { batched: (s: string) => void }) => void;
};

declare global {
  interface Window {
    loadPyodide?: (o: { indexURL: string }) => Promise<Pyodide>;
  }
}

let pyodidePromise: Promise<Pyodide> | null = null;

/** Loads Python (about 10 MB, cached by the browser) the first time someone presses Run. */
function getPyodide(): Promise<Pyodide> {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = new Promise<void>((resolve, reject) => {
    if (window.loadPyodide) return resolve();
    const s = document.createElement("script");
    s.src = `${PYODIDE}pyodide.js`;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Could not download Python."));
    document.head.appendChild(s);
  }).then(() => window.loadPyodide!({ indexURL: PYODIDE }));
  pyodidePromise.catch(() => (pyodidePromise = null));
  return pyodidePromise;
}

/** An editable Python snippet that runs in the browser. */
export function CodeRunner({ title, code, note, packages = [] }: { title: string; code: string; note?: string; packages?: string[] }) {
  const [src, setSrc] = useState(code);
  const [out, setOut] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "running">("idle");
  const lines = useRef<string[]>([]);

  const run = async () => {
    lines.current = [];
    setOut(null);
    try {
      setStatus("loading");
      const py = await getPyodide();
      if (packages.length) await py.loadPackage(packages);
      setStatus("running");
      py.setStdout({ batched: (s) => lines.current.push(s) });
      py.setStderr({ batched: (s) => lines.current.push(s) });
      const result = await py.runPythonAsync(src);
      if (result !== undefined && result !== null) lines.current.push(String(result));
      setOut(lines.current.join("\n") || "(no output)");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      // Keep only the last lines of a Python traceback; they say what went wrong.
      setOut([...lines.current, msg.split("\n").filter(Boolean).slice(-3).join("\n")].join("\n"));
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div className="code-box">
      <div className="lab-head">
        <span className="lab-kicker">Run it</span>
        <span className="lab-title">{title}</span>
      </div>
      <textarea
        className="code-src"
        value={src}
        onChange={(e) => setSrc(e.target.value)}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        rows={Math.min(18, src.split("\n").length + 1)}
        aria-label={`Python code: ${title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            run();
          } else if (e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            const t = e.currentTarget;
            const { selectionStart: a, selectionEnd: b } = t;
            setSrc(src.slice(0, a) + "    " + src.slice(b));
            requestAnimationFrame(() => t.setSelectionRange(a + 4, a + 4));
          }
        }}
      />
      <div className="lab-btns">
        <button className="btn btn-primary btn-sm" onClick={run} disabled={status !== "idle"}>
          {status === "loading" ? "Loading Python…" : status === "running" ? "Running…" : "Run"}
          {status === "idle" && <Icon name="arrow" size={15} />}
        </button>
        {src !== code && (
          <button className="btn btn-ghost btn-sm" onClick={() => setSrc(code)}>
            Reset code
          </button>
        )}
        <span className="muted small">Edit anything, then run. Python runs in your browser.</span>
      </div>
      {out !== null && (
        <pre className="code-out" role="status" aria-live="polite">
          {out}
        </pre>
      )}
      {note && <p className="lab-hint">{note}</p>}
    </div>
  );
}
