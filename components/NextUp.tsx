"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Icon } from "./Icon";
import { useProgress } from "./progress";

type Props = {
  lessonKey: string;
  href: string;
  kicker: string;
  title: string;
  meta: string;
};

/** The big "up next" card at the end of a lesson. Following it also marks this lesson finished. */
export function NextUp({ lessonKey, href, kicker, title, meta }: Props) {
  const { isDone, markDone } = useProgress();
  const done = isDone(lessonKey);
  return (
    <Link href={href} className="next-up" onClick={() => markDone(lessonKey)}>
      <span className="next-up-glow" aria-hidden />
      <span className="next-up-text">
        <span className="next-up-kicker">{done ? kicker : `Finish & continue · ${kicker}`}</span>
        <span className="next-up-title">{title}</span>
        <span className="next-up-meta">{meta}</span>
      </span>
      <span className="next-up-go" aria-hidden>
        <Icon name="arrow" size={24} />
      </span>
    </Link>
  );
}

/**
 * Lessons on phones scroll inside their own card stack, so moving to the next
 * lesson must reset that scroller as well as the window.
 */
export function ScrollToTop() {
  const path = usePathname();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.querySelector(".lesson")?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [path]);
  return null;
}
