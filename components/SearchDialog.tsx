"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchItems, type SearchItem } from "@/lib/search";
import { Icon } from "./Icon";

let indexPromise: Promise<SearchItem[]> | null = null;
const loadIndex = () =>
  (indexPromise ??= fetch("/search-index.json")
    .then((r) => r.json() as Promise<SearchItem[]>)
    .catch(() => {
      indexPromise = null;
      return [];
    }));

const SUGGESTIONS = ["transformer", "overfitting", "RAG", "gradient descent", "embedding"];

/** Search lessons, glossary and library. Opens with ⌘K, Ctrl+K or "/". */
export function SearchDialog() {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<SearchItem[]>([]);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);

  const results = useMemo(() => searchItems(items, q), [items, q]);

  const open = () => {
    loadIndex().then(setItems);
    dialog.current?.showModal();
    requestAnimationFrame(() => input.current?.select());
  };
  const close = () => dialog.current?.close();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (it: SearchItem) => {
    close();
    if (it.external) window.open(it.href, "_blank", "noopener,noreferrer");
    else router.push(it.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[sel]) {
      e.preventDefault();
      go(results[sel]);
    }
  };

  return (
    <>
      <button className="search-trigger" onClick={open} aria-label="Search lessons, glossary and library">
        <Icon name="search" size={17} />
        <span className="search-trigger-label">Search</span>
        <kbd>⌘K</kbd>
      </button>
      <dialog
        ref={dialog}
        className="search"
        aria-label="Search"
        onClick={(e) => e.target === dialog.current && close()}
      >
        <div className="search-box">
          <Icon name="search" size={19} />
          <input
            ref={input}
            type="search"
            placeholder="Search lessons, terms and courses"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            onKeyDown={onKeyDown}
            aria-controls="search-results"
            aria-activedescendant={results[sel] ? `sr-${sel}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <button className="icon-btn plain" onClick={close} aria-label="Close search">
            <Icon name="close" size={18} />
          </button>
        </div>
        {q.trim() ? (
          results.length ? (
            <ul id="search-results" className="search-results" role="listbox" aria-label="Results">
              {results.map((it, i) => (
                <li
                  key={it.kind + it.href}
                  id={`sr-${i}`}
                  role="option"
                  aria-selected={i === sel}
                  className={i === sel ? "sel" : ""}
                  onMouseEnter={() => setSel(i)}
                  onClick={() => go(it)}
                >
                  <span className="sr-kind">{it.kind}</span>
                  <span className="sr-title">
                    {it.title}
                    {it.external && <Icon name="external" size={13} />}
                  </span>
                  <span className="sr-meta">{it.meta}</span>
                  <span className="sr-text">{it.text}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="search-empty">{items.length ? `Nothing found for "${q}".` : "Loading…"}</p>
          )
        ) : (
          <div className="search-hints">
            <p>Try</p>
            <div className="chips">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="chip-btn" onClick={() => setQ(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
