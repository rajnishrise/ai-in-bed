"use client";

import { useState } from "react";
import { Icon } from "./Icon";

/** A prompt to copy, with a one-tap copy button. */
export function CopyPrompt({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard blocked: the text is still there to select by hand. */
    }
  }
  return (
    <figure className="prompt-card">
      <figcaption>
        <span className="term-label">{label}</span>
        <button type="button" className="prompt-copy" onClick={copy} aria-live="polite">
          {copied ? <Icon name="check" size={15} /> : null}
          {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>
      <blockquote>{text}</blockquote>
    </figure>
  );
}
