"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";

const SAVED_KEY = "aib-offline-saved";

/** Registers the service worker that lets visited and saved lessons open offline. */
export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);
  return null;
}

type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

/** An "Install app" button, shown only when the browser offers installation. */
export function InstallButton() {
  const [evt, setEvt] = useState<InstallEvent | null>(null);
  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvt(e as InstallEvent);
    };
    const onInstalled = () => setEvt(null);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);
  if (!evt) return null;
  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm"
      onClick={async () => {
        await evt.prompt();
        await evt.userChoice;
        setEvt(null);
      }}
    >
      <Icon name="install" size={16} /> Install the app
    </button>
  );
}

function readSaved(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) || "{}");
  } catch {
    return {};
  }
}

type Status = { state: "idle" | "saving" | "saved" | "unsupported"; done?: number; total?: number; when?: string };

/** Saves a set of pages (a level or a track) so they open with no connection. */
export function SaveOffline({ id, label, urls }: { id: string; label: string; urls: string[] }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("caches" in window)) {
      setStatus({ state: "unsupported" });
      return;
    }
    const when = readSaved()[id];
    if (when) setStatus({ state: "saved", when });
    const onMsg = (e: MessageEvent) => {
      const d = e.data || {};
      if (d.type === "aib-save-progress") setStatus({ state: "saving", done: d.done, total: d.total });
      if (d.type === "aib-save-done") {
        const today = new Date().toLocaleDateString(undefined, { day: "numeric", month: "short" });
        try {
          localStorage.setItem(SAVED_KEY, JSON.stringify({ ...readSaved(), [id]: today }));
        } catch {
          /* storage blocked */
        }
        setStatus({ state: "saved", when: today });
      }
    };
    navigator.serviceWorker.addEventListener("message", onMsg);
    return () => navigator.serviceWorker.removeEventListener("message", onMsg);
  }, [id]);

  if (status.state === "unsupported") return null;

  const save = async () => {
    setStatus({ state: "saving", done: 0, total: urls.length });
    const reg = await navigator.serviceWorker.ready;
    reg.active?.postMessage({ type: "aib-save", urls });
  };

  return (
    <div className="offline-save">
      <Icon name="cloud" size={20} />
      <div>
        <strong>Read it offline</strong>
        <p className="muted">
          {status.state === "saving"
            ? `Saving ${status.done ?? 0} of ${status.total} pages…`
            : status.state === "saved"
              ? `Saved on this device (${status.when}). Lessons open with no signal.`
              : `Save all of ${label} on this device for flights, trains and bad Wi-Fi.`}
        </p>
      </div>
      <button type="button" className="btn btn-ghost btn-sm" onClick={save} disabled={status.state === "saving"}>
        {status.state === "saved" ? "Update" : status.state === "saving" ? "Saving" : "Save"}
      </button>
    </div>
  );
}

/** Lists the lesson pages already stored on this device. */
export function SavedPages() {
  const [pages, setPages] = useState<{ url: string; title: string }[] | null>(null);
  useEffect(() => {
    if (!("caches" in window)) return;
    (async () => {
      const names = (await caches.keys()).filter((k) => k.startsWith("aib-pages-"));
      const found: { url: string; title: string }[] = [];
      for (const name of names) {
        const cache = await caches.open(name);
        for (const req of await cache.keys()) {
          const path = new URL(req.url).pathname;
          if (!path.startsWith("/learn/")) continue;
          const html = await (await cache.match(req))?.text();
          const title = html?.match(/<title>([^<·]+)/)?.[1]?.trim() ?? path;
          found.push({ url: path, title });
        }
      }
      setPages(found);
    })();
  }, []);
  if (!pages?.length) return null;
  return (
    <div className="saved-pages">
      <h2>Saved on this device</h2>
      <ul>
        {pages.map((p) => (
          <li key={p.url}>
            <Link href={p.url} prefetch={false}>
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
